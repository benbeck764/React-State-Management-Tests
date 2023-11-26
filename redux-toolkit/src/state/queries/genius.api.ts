import * as htmlparser2 from "htmlparser2";
import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { endpoints } from "./common/endpoints";
import { axiosBaseQuery } from "./common/axios-api-helpers";
import {
  GeniusApiResponse,
  GeniusSearchResponse,
  GeniusSong,
  GeniusSongRequest,
} from "./models/genius.models";
import axios, { AxiosError } from "axios";

const retryAxiosBaseQuery = retry(
  axiosBaseQuery({ instanceType: "genius", baseUrl: endpoints.genius.base }),
  {
    maxRetries: 1,
  }
);

export const geniusApi = createApi({
  reducerPath: "geniusApi",
  baseQuery: retryAxiosBaseQuery,
  endpoints: (builder) => ({
    geniusSearch: builder.query<
      GeniusApiResponse<GeniusSearchResponse>,
      string
    >({
      query: (query: string) => ({
        url: endpoints.genius.search,
        method: "GET",
        params: { q: query },
      }),
    }),
    getGeniusSong: builder.query<
      GeniusApiResponse<GeniusSong>,
      GeniusSongRequest
    >({
      query: (req: GeniusSongRequest) => ({
        url: endpoints.genius.songs.byId(req.id),
        method: "GET",
        data: req,
      }),
    }),
    getGeniusLyrics: builder.query<string[], string>({
      queryFn: async (geniusUrl: string) => {
        try {
          // Proxy request to /lyrics to avoid CORS issue with Genius
          const res = await axios.get(
            geniusUrl.replace("https://genius.com", "/lyrics")
          );
          if (res.status >= 200 && res.status <= 299) {
            const lyrics: string[] = [];

            let insideLyricsContainer = false;
            let firstSection = true;

            const parser = new htmlparser2.Parser(
              {
                ontext: (text) => {
                  if (insideLyricsContainer) {
                    if (firstSection) {
                      firstSection = false;
                    } else {
                      // Add some space after each song "section", except the first
                      if (text.endsWith("]"))
                        lyrics.push(...["", "", "", "", ""]);
                    }

                    lyrics.push(text);
                  }
                },
                onopentag: (name, attribs) => {
                  if (
                    name === "div" &&
                    attribs["data-lyrics-container"] === "true"
                  )
                    insideLyricsContainer = true;
                },
                onclosetag: (tagname) => {
                  if (tagname === "div" && insideLyricsContainer)
                    insideLyricsContainer = false;
                },
              },
              {
                decodeEntities: true,
              }
            );

            // Decode HTML & Unicode entities
            let text = res.data as string;
            // Remove <i> tags to avoid breaking lines on these tags.
            // The text should remain as a whole line.
            text = text.replace(/<i>/g, "");
            text = text.replace(/<\/i>/g, "");

            // Catch any unicode values that `decodeEntities` above does not catch.
            text = text.replace(
              /&amp;|&quot;|&apos;|&#(?:x([\da-fA-F]+)|(\d+));/g,
              (match, hex, dec) => {
                if (hex) {
                  return String.fromCharCode(parseInt(hex, 16));
                } else if (dec) {
                  return String.fromCharCode(parseInt(dec, 10));
                } else {
                  switch (match) {
                    case "&amp;":
                      return "&";
                    case "&quot;":
                      return `"`;
                    case "&apos;":
                      return "'";
                    default:
                      return match;
                  }
                }
              }
            );

            parser.write(text);
            parser.end();

            return { data: lyrics };
          } else {
            return { error: "An error occurred fetching Genius lyrics." };
          }
        } catch (e: unknown) {
          const error = e as AxiosError;
          return { error: error.message };
        }
      },
    }),
  }),
});

export const {
  useGeniusSearchQuery,
  useGetGeniusSongQuery,
  useGetGeniusLyricsQuery,
} = geniusApi;
