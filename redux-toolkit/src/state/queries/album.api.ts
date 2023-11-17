import { endpoints } from "./common/endpoints";
import {
  GetAlbumRequest,
  GetAlbumTracksResponse,
  SpotifyAlbum,
} from "./models/spotify.models";
import { spotifyApi } from "./spotify.api";

const albumApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlbum: builder.query<SpotifyAlbum, GetAlbumRequest>({
      queryFn: async (arg: GetAlbumRequest, _api, _extraOptions, baseQuery) => {
        // Get the album
        const albumRes = await baseQuery({
          url: endpoints.spotify.albums.byId(arg.id),
          method: "GET",
          params: arg,
        });

        if (albumRes.error) return { error: albumRes.error };
        const album = albumRes.data as SpotifyAlbum;

        // If there are more than 50 (max) tracks, query additional tracks
        if (album.tracks.next !== null) {
          const tracksRes = await baseQuery({
            url: endpoints.spotify.albums.tracks(album.id),
            method: "GET",
            params: {
              offset: album.tracks.limit,
              limit: Math.min(
                album.tracks.total - album.tracks.items.length,
                50
              ),
            },
          });
          const tracks = tracksRes.data as GetAlbumTracksResponse;
          album.tracks.items = [...album.tracks.items, ...tracks.items];
        }

        return { data: album };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetAlbumQuery } = albumApi;
