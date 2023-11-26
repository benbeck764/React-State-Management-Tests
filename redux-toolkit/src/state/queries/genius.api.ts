import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { endpoints } from "./common/endpoints";
import { axiosBaseQuery } from "./common/axios-api-helpers";
import {
  GeniusApiResponse,
  GeniusSearchResponse,
  GeniusSongRequest,
} from "./models/genius.models";

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
    getGeniusSong: builder.query<GeniusApiResponse<unknown>, GeniusSongRequest>(
      {
        query: (req: GeniusSongRequest) => ({
          url: endpoints.genius.songs.byId(req.id),
          method: "GET",
          data: req,
        }),
      }
    ),
  }),
});

export const { useGeniusSearchQuery, useGetGeniusSongQuery } = geniusApi;
