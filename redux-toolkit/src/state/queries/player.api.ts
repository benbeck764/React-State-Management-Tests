import { endpoints } from "./common/endpoints";
import { SpotifyPlaybackState } from "./models/spotify.models";
import { spotifyApi } from "./spotify.api";

const playerApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlaybackState: builder.query<SpotifyPlaybackState, void>({
      query: () => ({
        url: endpoints.spotify.me.player,
        method: "GET",
      }),
    }),
    getCurrentPlayingState: builder.query<SpotifyPlaybackState, void>({
      query: () => ({
        url: endpoints.spotify.me.currentlyPlaying,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPlaybackStateQuery, useGetCurrentPlayingStateQuery } =
  playerApi;
