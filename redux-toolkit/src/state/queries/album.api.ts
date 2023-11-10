import { endpoints } from "./common/endpoints";
import { GetAlbumRequest, SpotifyAlbum } from "./models/spotify.models";
import { spotifyApi } from "./spotify.api";

const albumApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlbum: builder.query<SpotifyAlbum, GetAlbumRequest>({
      query: (request: GetAlbumRequest) => ({
        url: endpoints.spotify.albums.byId(request.id),
        method: "GET",
        params: request,
      }),
    }),
  }),
});

export const { useGetAlbumQuery } = albumApi;
