import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  playbackState?: Spotify.PlaybackState;
  deviceId?: string;
  ready: boolean;
}

const initialState: PlayerState = {
  playbackState: undefined,
  deviceId: undefined,
  ready: false,
};

export const playerSlice = createSlice({
  name: "spotify-player",
  initialState,
  reducers: {
    playbackStateChanged: (
      state: PlayerState,
      action: PayloadAction<Spotify.PlaybackState>
    ) => {
      state.playbackState = action.payload;
    },
    playerReady: (state: PlayerState, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
      state.ready = true;
    },
    playerNotReady: (state: PlayerState) => {
      state.deviceId = initialState.deviceId;
      state.ready = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playbackStateChanged, playerReady, playerNotReady } =
  playerSlice.actions;

export default playerSlice.reducer;
