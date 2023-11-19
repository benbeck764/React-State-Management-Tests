import { playing, seek, selectPlaybackState } from "../slices/player.slice";
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
        // const currentPlaybackQuery = dispatch(
        //   playerApi.util.getRunningQueryThunk("getPlaybackState", void 0)
        // );
        // if (currentPlaybackQuery) currentPlaybackQuery.abort();

        dispatch(seek(arg.position));

        const playbackState = selectPlaybackState(getState() as AppRootState);
        try {
          await queryFulfilled;
          //dispatch(seek(arg.position));
          //dispatch(playerApi.endpoints.getPlaybackState.initiate());
          //if (currentPlaybackQuery) await currentPlaybackQuery.refetch();
        } catch {
          if (playbackState?.progress_ms) {
            dispatch(seek(playbackState.progress_ms));
          }
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
          dispatch(playing(true));
          try {
            await queryFulfilled;
          } catch {
            if (playbackState?.is_playing) {
              dispatch(playing(playbackState.is_playing));
            }
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
        dispatch(playing(false));
        try {
          await queryFulfilled;
        } catch {
          if (playbackState?.is_playing) {
            dispatch(playing(playbackState.is_playing));
          }
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
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetPlaybackStateQuery,
  useGetCurrentPlayingStateQuery,
  useGetRecentlyPlayedQuery,
  useSeekMutation,
  useStartOrResumePlaybackMutation,
  usePausePlaybackMutation,
  useToggleShuffleMutation,
  useSetRepeatModeMutation,
  useSetPlaybackVolumeMutation,
} = playerApi;
