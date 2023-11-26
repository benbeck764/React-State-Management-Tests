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
          const res = await axios.get(
            geniusUrl.replace("https://genius.com", "/lyrics")
          );
          if (res.status >= 200 && res.status <= 299) {
            const lyrics: string[] = [];
            let insideLyricsContainer = false;
            let firstBreak = true;

            const parser = new htmlparser2.Parser({
              ontext: (text) => {
                if (insideLyricsContainer) {
                  if (firstBreak) {
                    firstBreak = false;
                  } else {
                    // Add some space
                    if (text.endsWith("]")) {
                      lyrics.push(...["", "", "", "", ""]);
                    }
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
            });

            // Decode HTML & Unicode entities
            let text = res.data as string;
            text = text.replace("<i>", "");
            text = text.replace("</i>", "");
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

            console.log(lyrics);

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
