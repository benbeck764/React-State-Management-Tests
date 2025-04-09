import { endpoints } from "./common/endpoints";
import { SpotifyUser } from "./models/spotify.models";
import { spotifyApi } from "./spotify.api";

const userApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<SpotifyUser, unknown>({
      query: () => ({
        url: endpoints.spotify.me.profile,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserProfileQuery } = userApi;
