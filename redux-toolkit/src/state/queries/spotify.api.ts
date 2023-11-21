import { createApi, retry } from "@reduxjs/toolkit/query/react";
import { endpoints } from "./common/endpoints";
import {
  GetUserTopArtistsResponse,
  GetUserTopItemsRequest,
  SearchItemRequest,
  SearchItemResponse,
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
    searchForItem: builder.query<SearchItemResponse, SearchItemRequest>({
      query: (request: SearchItemRequest) => ({
        url: endpoints.spotify.search,
        method: "GET",
        params: request,
      }),
    }),
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
        url: endpoints.spotify.me.tracks,
        method: "PUT",
        params: { ids: request.ids.join(",") },
        data: { ids: request.ids },
      }),
    }),
    deleteSavedTracks: builder.mutation<void, { ids: string[] }>({
      query: (request: { ids: string[] }) => ({
        url: endpoints.spotify.me.tracks,
        method: "DELETE",
        params: { ids: request.ids.join(",") },
        data: { ids: request.ids },
      }),
    }),
    checkedSavedAlbums: builder.query<boolean[], { ids: string }>({
      query: (request: { ids: string }) => ({
        url: endpoints.spotify.me.checkSavedAlbums,
        method: "GET",
        params: request,
      }),
    }),
    saveAlbums: builder.mutation<void, { ids: string[] }>({
      query: (request: { ids: string[] }) => ({
        url: endpoints.spotify.me.albums,
        method: "PUT",
        params: { ids: request.ids.join(",") },
        data: { ids: request.ids },
      }),
    }),
    deleteSavedAlbums: builder.mutation<void, { ids: string[] }>({
      query: (request: { ids: string[] }) => ({
        url: endpoints.spotify.me.albums,
        method: "DELETE",
        params: { ids: request.ids.join(",") },
        data: { ids: request.ids },
      }),
    }),
  }),
});

export const {
  useSearchForItemQuery,
  useGetTopArtistsQuery,
  useGetTopTracksQuery,
  useCheckedSavedTracksQuery,
  useSaveTracksMutation,
  useDeleteSavedTracksMutation,
  useCheckedSavedAlbumsQuery,
  useSaveAlbumsMutation,
  useDeleteSavedAlbumsMutation,
} = spotifyApi;
