import { endpoints } from "./common/endpoints";
import {
  GetRecentlyPlayedTracksRequest,
  GetRecentlyPlayedTracksResponse,
  SpotifyPlaybackState,
  StartOrResumePlaybackRequest,
} from "./models/spotify.models";
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
    getRecentlyPlayed: builder.query<
      GetRecentlyPlayedTracksResponse,
      GetRecentlyPlayedTracksRequest
    >({
      query: () => ({
        url: endpoints.spotify.me.recentlyPlayed,
        method: "GET",
      }),
    }),
    startOrResumePlayback: builder.mutation<void, StartOrResumePlaybackRequest>(
      {
        query: (request: StartOrResumePlaybackRequest) => ({
          url: endpoints.spotify.me.play,
          method: "PUT",
          params: { device_id: request.device_id },
          data: request,
        }),
      }
    ),
    pausePlayback: builder.mutation<void, string | undefined>({
      query: (deviceId?: string) => ({
        url: endpoints.spotify.me.pause,
        method: "PUT",
        params: { device_id: deviceId },
      }),
    }),
    toggleShuffle: builder.mutation<void, { state: boolean; deviceId: string }>(
      {
        query: (request: { state: boolean; deviceId: string }) => ({
          url: endpoints.spotify.me.shuffle,
          method: "PUT",
          params: { device_id: request.deviceId, state: request.state },
        }),
      }
    ),
    setRepeatMode: builder.mutation<
      void,
      { state: "track" | "context" | "off"; deviceId: string }
    >({
      query: (request: {
        state: "track" | "context" | "off";
        deviceId: string;
      }) => ({
        url: endpoints.spotify.me.repeat,
        method: "PUT",
        params: { device_id: request.deviceId, state: request.state },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPlaybackStateQuery,
  useGetCurrentPlayingStateQuery,
  useGetRecentlyPlayedQuery,
  useStartOrResumePlaybackMutation,
  usePausePlaybackMutation,
  useToggleShuffleMutation,
  useSetRepeatModeMutation,
} = playerApi;
