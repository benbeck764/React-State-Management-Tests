import { endpoints } from "./common/endpoints";
import {
  GetAlbumsRequest,
  GetAlbumsResponse,
  GetArtistAlbumsRequest,
  GetArtistAlbumsResponse,
  GetArtistTopTracksRequest,
  GetArtistTopTracksResponse,
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
    getArtistDiscography: builder.query<GetAlbumsResponse, GetAlbumsRequest>({
      query: (request: GetAlbumsRequest) => ({
        url: endpoints.spotify.albums.all,
        method: "GET",
        params: request,
      }),
    }),
    getArtistTopTracks: builder.query<
      GetArtistTopTracksResponse,
      GetArtistTopTracksRequest
    >({
      query: (request: GetArtistTopTracksRequest) => ({
        url: endpoints.spotify.artists.topTracks(request.id),
        method: "GET",
        params: request,
      }),
    }),
  }),
});

export const {
  useGetArtistAlbumsQuery,
  useGetArtistDiscographyQuery,
  useGetArtistTopTracksQuery,
} = artistApi;
