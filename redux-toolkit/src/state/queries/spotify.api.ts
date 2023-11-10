import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { endpoints } from "./common/endpoints";
import {
  GetUserTopArtistsResponse,
  GetUserTopItemsRequest,
} from "./models/spotify.models";
import { axiosBaseQuery } from "./common/axios-api-helpers";
import { Optional } from "../../utilities/types";

// Built-in Retry Logic
const retryAxiosBaseQuery = retry(
  axiosBaseQuery({ baseUrl: endpoints.spotify.base }),
  {
    maxRetries: 1,
  }
);

// Define a service using a base URL and expected endpoints
export const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  // Default fetch support:
  //baseQuery: fetchBaseQuery({ baseUrl: endpoints.spotify.base }),
  // Testing with Axios, utilizing for Axios interceptors:
  baseQuery: retryAxiosBaseQuery,
  endpoints: (builder) => ({
    getTopArtists: builder.query<
      GetUserTopArtistsResponse,
      Optional<GetUserTopItemsRequest>
    >({
      query: (request?: Optional<GetUserTopItemsRequest>) => ({
        url: endpoints.spotify.me.topArtists,
        method: "GET",
        params: request,
      }),
    }),
    getTopTracks: builder.query<
      GetUserTopArtistsResponse,
      Optional<GetUserTopItemsRequest>
    >({
      query: (request?: Optional<GetUserTopItemsRequest>) => ({
        url: endpoints.spotify.me.topTracks,
        method: "GET",
        params: request,
      }),
    }),
  }),
});

// Export auto-generated named hooks for usage in functional components
export const { useGetTopArtistsQuery, useGetTopTracksQuery } = spotifyApi;
