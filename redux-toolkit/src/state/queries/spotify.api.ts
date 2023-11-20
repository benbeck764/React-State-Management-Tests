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
    checkedSavedTracks: builder.query<boolean[], { ids: string }>({
      query: (request: { ids: string }) => ({
        url: endpoints.spotify.me.checkSavedTracks,
        method: "GET",
        params: request,
      }),
    }),
    saveTracks: builder.mutation<void, { ids: string[] }>({
      query: (request: { ids: string[] }) => ({
        url: endpoints.spotify.me.saveTrack,
        method: "PUT",
        params: { ids: request.ids.join(",") },
        data: { ids: request.ids },
      }),
    }),
    deleteSavedTracks: builder.mutation<void, { ids: string[] }>({
      query: (request: { ids: string[] }) => ({
        url: endpoints.spotify.me.saveTrack,
        method: "DELETE",
        params: { ids: request.ids.join(",") },
        data: { ids: request.ids },
      }),
    }),
  }),
});

export const {
  useGetTopArtistsQuery,
  useGetTopTracksQuery,
  useCheckedSavedTracksQuery,
  useSaveTracksMutation,
  useDeleteSavedTracksMutation,
} = spotifyApi;
