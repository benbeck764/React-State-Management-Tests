import { endpoints } from "./common/endpoints";
import {
  GetArtistAlbumsRequest,
  GetArtistAlbumsResponse,
} from "./models/spotify.models";
import { spotifyApi } from "./spotify.api";

const artistApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getArtistAlbums: builder.query<
      GetArtistAlbumsResponse,
      GetArtistAlbumsRequest
    >({
      query: (request: GetArtistAlbumsRequest) => ({
        url: endpoints.spotify.artists.albums(request.id),
        method: "GET",
        params: request,
      }),
    }),
  }),
});

export const { useGetArtistAlbumsQuery } = artistApi;
