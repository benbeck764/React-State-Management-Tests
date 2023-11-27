import { AxiosError } from "axios";
import { endpoints } from "./common/endpoints";
import {
  GetAlbumRequest,
  GetAlbumTracksResponse,
  GetAlbumsResponse,
  SpotifyAlbum,
} from "./models/spotify.models";
import { spotifyApi } from "./spotify.api";

const albumApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAlbum: builder.query<SpotifyAlbum, GetAlbumRequest>({
      queryFn: async (arg: GetAlbumRequest, _api, _extraOptions, baseQuery) => {
        try {
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
        } catch (e: unknown) {
          const error = e as AxiosError;
          return { error: error.message };
        }
      },
    }),
    getMultipleAlbums: builder.query<SpotifyAlbum[], { ids: string[] }>({
      queryFn: async (
        arg: { ids: string[] },
        _api,
        _extraOptions,
        baseQuery
      ) => {
        try {
          const albums: SpotifyAlbum[] = [];
          let albumsError = false;
          const albumsIds = arg.ids;
          const chunkSize = 20; // Max API size, hence chunking

          for (let i = 0; i < albumsIds.length; i += chunkSize) {
            const chunk = [];
            for (let j = 0; j < chunkSize && i + j < albumsIds.length; j++) {
              chunk.push(albumsIds[i + j]);
            }

            const albumsRes = await baseQuery({
              url: endpoints.spotify.albums.all,
              method: "GET",
              params: { ids: chunk.join(",") },
            });

            if (albumsRes.error) {
              albumsError = true;
              break;
            } else {
              albums.push(...(albumsRes.data as GetAlbumsResponse).albums);
            }
          }

          if (albumsError) return { error: "Error fetching albums" };

          return { data: albums };
        } catch (e: unknown) {
          const error = e as AxiosError;
          return { error: error.message };
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetAlbumQuery, useGetMultipleAlbumsQuery } = albumApi;
