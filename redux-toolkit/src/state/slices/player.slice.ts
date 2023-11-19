import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SpotifyPlaybackState } from "../queries/models/spotify.models";
import { AppRootState } from "../store";

export interface PlayerState {
  playbackState: SpotifyPlaybackState | null;
  deviceId: string | null;
  ready: boolean;
}

const initialState: PlayerState = {
  playbackState: null,
  deviceId: null,
  ready: false,
};

export const playerSlice = createSlice({
  name: "spotify-player",
  initialState,
  reducers: {
    playbackStateChanged: (
      state: PlayerState,
      action: PayloadAction<SpotifyPlaybackState>
    ) => {
      state.playbackState = action.payload;
      state.deviceId = action.payload.device.id;
    },
    playerReady: (state: PlayerState, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
      state.ready = true;
    },
    playerNotReady: (state: PlayerState) => {
      state.deviceId = initialState.deviceId;
      state.ready = false;
    },
    playing: (state: PlayerState, action: PayloadAction<boolean>) => {
      if (state.playbackState != null)
        state.playbackState.is_playing = action.payload;
    },
    seek: (state: PlayerState, action: PayloadAction<number>) => {
      if (state.playbackState != null)
        state.playbackState.progress_ms = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  playbackStateChanged,
  playerReady,
  playerNotReady,
  playing,
  seek,
} = playerSlice.actions;

export const selectPlaybackState = (state: AppRootState) =>
  state.player.playbackState;

export default playerSlice.reducer;
