import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { spotifyApi } from "./queries/spotify.api";
import { geniusApi } from "./queries/genius.api";
import playerReducer from "./slices/player.slice";
import searchReducer from "./slices/search.slice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [spotifyApi.reducerPath]: spotifyApi.reducer,
    [geniusApi.reducerPath]: geniusApi.reducer,
    player: playerReducer,
    search: searchReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(spotifyApi.middleware)
      .concat(geniusApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppRootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
