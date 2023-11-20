import {
  playing,
  repeat,
  seek,
  selectPlaybackState,
  shuffle,
  updating,
  volume,
} from "../slices/player.slice";
import { AppRootState } from "../store";
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
    previous: builder.mutation<void, { deviceId?: string }>({
      query: (request: { deviceId?: string }) => ({
        url: endpoints.spotify.me.previous,
        method: "POST",
        params: { device_id: request.deviceId },
        data: request,
      }),
    }),
    next: builder.mutation<void, { deviceId?: string }>({
      query: (request: { deviceId?: string }) => ({
        url: endpoints.spotify.me.next,
        method: "POST",
        params: { device_id: request.deviceId },
        data: request,
      }),
    }),
    seek: builder.mutation<void, { position: number; deviceId?: string }>({
      query: (request: { position: number; deviceId?: string }) => ({
        url: endpoints.spotify.me.seek,
        method: "PUT",
        params: { position_ms: request.position, device_id: request.deviceId },
        data: request,
      }),
      async onQueryStarted(
        arg: { position: number; deviceId?: string },
        { dispatch, queryFulfilled, getState }
      ) {
        const playbackState = selectPlaybackState(getState() as AppRootState);
        const progressMs = playbackState?.progress_ms;
        dispatch(seek(arg.position));

        try {
          await queryFulfilled;
        } catch {
          if (typeof progressMs !== "undefined") {
            dispatch(seek(progressMs));
          }
        } finally {
          dispatch(updating(false));
        }
      },
    }),
    startOrResumePlayback: builder.mutation<void, StartOrResumePlaybackRequest>(
      {
        query: (request: StartOrResumePlaybackRequest) => ({
          url: endpoints.spotify.me.play,
          method: "PUT",
          params: { device_id: request.device_id },
          data: request,
        }),
        async onQueryStarted(
          _arg: StartOrResumePlaybackRequest,
          { dispatch, queryFulfilled, getState }
        ) {
          const playbackState = selectPlaybackState(getState() as AppRootState);
          const isPlaying = playbackState?.is_playing;
          dispatch(playing(true));

          try {
            await queryFulfilled;
          } catch {
            if (typeof isPlaying !== "undefined") {
              dispatch(playing(isPlaying));
            }
          } finally {
            dispatch(updating(false));
          }
        },
      }
    ),
    pausePlayback: builder.mutation<void, string | undefined>({
      query: (deviceId?: string) => ({
        url: endpoints.spotify.me.pause,
        method: "PUT",
        params: { device_id: deviceId },
      }),
      async onQueryStarted(
        _arg: string | undefined,
        { dispatch, queryFulfilled, getState }
      ) {
        const playbackState = selectPlaybackState(getState() as AppRootState);
        const isPlaying = playbackState?.is_playing;
        dispatch(playing(false));

        try {
          await queryFulfilled;
        } catch {
          if (typeof isPlaying !== "undefined") {
            dispatch(playing(isPlaying));
          }
        } finally {
          dispatch(updating(false));
        }
      },
    }),
    toggleShuffle: builder.mutation<void, { state: boolean; deviceId: string }>(
      {
        query: (request: { state: boolean; deviceId: string }) => ({
          url: endpoints.spotify.me.shuffle,
          method: "PUT",
          params: { device_id: request.deviceId, state: request.state },
        }),
        async onQueryStarted(
          arg: { state: boolean; deviceId: string },
          { dispatch, queryFulfilled, getState }
        ) {
          const playbackState = selectPlaybackState(getState() as AppRootState);
          const shuffleState = playbackState?.shuffle_state;
          dispatch(shuffle(arg.state));

          try {
            await queryFulfilled;
          } catch {
            if (typeof shuffleState !== "undefined") {
              dispatch(shuffle(shuffleState));
            }
          } finally {
            dispatch(updating(false));
          }
        },
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
      async onQueryStarted(
        arg: { state: "track" | "context" | "off"; deviceId: string },
        { dispatch, queryFulfilled, getState }
      ) {
        const playbackState = selectPlaybackState(getState() as AppRootState);
        const repeatState = playbackState?.repeat_state;
        dispatch(repeat(arg.state));

        try {
          await queryFulfilled;
        } catch {
          if (typeof repeatState !== "undefined") {
            dispatch(repeat(repeatState));
          }
        } finally {
          dispatch(updating(false));
        }
      },
    }),
    setPlaybackVolume: builder.mutation<
      void,
      { volumePercent: number; deviceId: string }
    >({
      query: (request: { volumePercent: number; deviceId: string }) => ({
        url: endpoints.spotify.me.volume,
        method: "PUT",
        params: {
          device_id: request.deviceId,
          volume_percent: request.volumePercent,
        },
      }),
      async onQueryStarted(
        arg: { volumePercent: number; deviceId: string },
        { dispatch, queryFulfilled, getState }
      ) {
        const playbackState = selectPlaybackState(getState() as AppRootState);
        const volumeState = playbackState?.device?.volume_percent;
        dispatch(volume(arg.volumePercent));

        try {
          await queryFulfilled;
        } catch {
          if (typeof volumeState !== "undefined") {
            dispatch(volume(volumeState));
          }
        } finally {
          dispatch(updating(false));
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPlaybackStateQuery,
  useGetCurrentPlayingStateQuery,
  useGetRecentlyPlayedQuery,
  useNextMutation,
  usePreviousMutation,
  useSeekMutation,
  useStartOrResumePlaybackMutation,
  usePausePlaybackMutation,
  useToggleShuffleMutation,
  useSetRepeatModeMutation,
  useSetPlaybackVolumeMutation,
} = playerApi;
