import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SpotifyPlaybackState } from "../queries/models/spotify.models";
import { AppRootState } from "../store";

export interface PlayerState {
  playbackState: SpotifyPlaybackState | null;
  deviceId: string | null;
  currentDeviceId: string | null;
  ready: boolean;
  updating: boolean;
}

const initialState: PlayerState = {
  playbackState: null,
  deviceId: null,
  currentDeviceId: null,
  ready: false,
  updating: false,
};

export const playerSlice = createSlice({
  name: "spotify-player",
  initialState,
  reducers: {
    playbackStateChanged: (
      state: PlayerState,
      action: PayloadAction<SpotifyPlaybackState>
    ) => {
      if (!state.updating) {
        state.playbackState = action.payload;
        state.deviceId = action.payload.device.id;
      }
    },
    playerReady: (state: PlayerState, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
      state.currentDeviceId = action.payload;
      state.ready = true;
    },
    playerNotReady: (state: PlayerState) => {
      state.deviceId = initialState.deviceId;
      state.ready = false;
    },
    playing: (state: PlayerState, action: PayloadAction<boolean>) => {
      if (state.playbackState !== null) {
        state.playbackState.is_playing = action.payload;
        state.updating = true;
      }
    },
    repeat: (
      state: PlayerState,
      action: PayloadAction<"off" | "track" | "context">
    ) => {
      if (state.playbackState !== null) {
        state.playbackState.repeat_state = action.payload;
        state.updating = true;
      }
    },
    seek: (state: PlayerState, action: PayloadAction<number>) => {
      if (state.playbackState !== null) {
        state.playbackState.progress_ms = action.payload;
        state.updating = true;
      }
    },
    shuffle: (state: PlayerState, action: PayloadAction<boolean>) => {
      if (state.playbackState !== null) {
        state.playbackState.shuffle_state = action.payload;
        state.updating = true;
      }
    },
    updating: (state: PlayerState, action: PayloadAction<boolean>) => {
      state.updating = action.payload;
    },
    volume: (state: PlayerState, action: PayloadAction<number>) => {
      if (state.playbackState?.device) {
        state.playbackState.device.volume_percent = action.payload;
        state.updating = true;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  playbackStateChanged,
  playerReady,
  playerNotReady,
  playing,
  repeat,
  seek,
  shuffle,
  updating,
  volume,
} = playerSlice.actions;

export const selectPlaybackState = (state: AppRootState) =>
  state.player.playbackState;

export default playerSlice.reducer;
