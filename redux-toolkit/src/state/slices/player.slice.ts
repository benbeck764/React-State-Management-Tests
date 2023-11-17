import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PlayerState {
  playbackState?: Spotify.PlaybackState;
}

const initialState: PlayerState = {
  playbackState: undefined,
};

export const playerSlice = createSlice({
  name: "spotify-player",
  initialState,
  reducers: {
    playbackState: (state, action: PayloadAction<Spotify.PlaybackState>) => {
      state.playbackState = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playbackState } = playerSlice.actions;

export default playerSlice.reducer;
