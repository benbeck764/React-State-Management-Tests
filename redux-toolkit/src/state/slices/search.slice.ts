import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: "",
};

export const searchSlice = createSlice({
  name: "spotify-search",
  initialState,
  reducers: {
    search: (state: SearchState, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { search } = searchSlice.actions;

export default searchSlice.reducer;
