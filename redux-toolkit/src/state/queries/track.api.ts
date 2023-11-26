import { endpoints } from "./common/endpoints";
import {
  GetRecommendationsRequest,
  GetRecommendationsResponse,
  GetTrackRequest,
  SpotifyTrack,
} from "./models/spotify.models";
import { spotifyApi } from "./spotify.api";

const trackApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrack: builder.query<SpotifyTrack, GetTrackRequest>({
      query: (req: GetTrackRequest) => ({
        url: endpoints.spotify.tracks.byId(req.id),
        method: "GET",
        params: req,
      }),
    }),
    getRecommendations: builder.query<
      GetRecommendationsResponse,
      GetRecommendationsRequest
    >({
      query: (req: GetRecommendationsRequest) => ({
        url: endpoints.spotify.tracks.recommendations,
        method: "GET",
        params: req,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetTrackQuery, useGetRecommendationsQuery } = trackApi;
