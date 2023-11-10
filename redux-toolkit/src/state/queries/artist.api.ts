import { endpoints } from "./common/endpoints";
import {
  GetAlbumTracksRequest,
  GetAlbumTracksResponse,
  GetAlbumsRequest,
  GetAlbumsResponse,
  GetArtistAlbumsRequest,
  GetArtistAlbumsResponse,
  GetArtistTopTracksRequest,
  GetArtistTopTracksResponse,
  GetDiscographyResponse,
  SimplifiedSpotifyAlbum,
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
    getAlbums: builder.query<GetAlbumsResponse, GetAlbumsRequest>({
      query: (request: GetAlbumsRequest) => ({
        url: endpoints.spotify.albums.all,
        method: "GET",
        params: request,
      }),
    }),
    getTracks: builder.query<GetAlbumTracksResponse, GetAlbumTracksRequest>({
      query: (request: GetAlbumTracksRequest) => ({
        url: endpoints.spotify.albums.tracks(request.id),
        method: "GET",
        params: request,
      }),
    }),
    getArtistDiscography: builder.query<
      GetDiscographyResponse,
      GetArtistAlbumsRequest
    >({
      queryFn: async (
        arg: GetArtistAlbumsRequest,
        _api,
        _extraOptions,
        baseQuery
      ) => {
        // Get Artist Albums (max of 20 at a time)
        const artistAlbumsRes = await baseQuery({
          url: endpoints.spotify.artists.albums(arg.id),
          method: "GET",
          params: arg,
        });

        if (artistAlbumsRes.error) return { error: artistAlbumsRes.error };

        const artistAlbums = artistAlbumsRes.data as GetArtistAlbumsResponse;
        if (!artistAlbums.items.length) return { albums: [] };

        // Get FULL Albums, including Tracks from Artist Album IDs
        const discographyRes = await baseQuery({
          url: endpoints.spotify.albums.all,
          method: "GET",
          params: {
            ids: artistAlbums.items
              .map((a: SimplifiedSpotifyAlbum) => a.id)
              .join(","),
          },
        });

        if (discographyRes.error) return { error: discographyRes.error };

        // If an Album has more than 50 Tracks, fetch the additional Tracks
        const discographyData = discographyRes.data as GetAlbumsResponse;
        for (let i = 0; i < discographyData.albums.length; i++) {
          const album = discographyData.albums[i];
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
        }

        return {
          data: {
            albums: (discographyRes.data as GetAlbumsResponse).albums,
            total: artistAlbums.total,
          },
        };
      },
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (typeof newQueryArgs.offset !== "undefined") {
          delete newQueryArgs.offset;
        }
        return newQueryArgs;
      },
      merge: (
        currentCache: GetDiscographyResponse,
        newItems: GetDiscographyResponse
      ) => {
        return {
          ...currentCache,
          albums: [...currentCache.albums, ...newItems.albums],
        };
      },
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
