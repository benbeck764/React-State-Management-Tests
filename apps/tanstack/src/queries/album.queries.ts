import { createQueryKey } from '@/queries/common/config/query-options-factory';
import { GetAlbumTracksRequest, spotifyApi } from '@spotify-examples/spotify-api';
import { SpotifyAlbum, SpotifyAlbumTrack } from '@spotify-examples/spotify-models';
import { queryOptions, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';

//#region Queries

export const getAlbumQuery = ({ id }: { id: string }) =>
  queryOptions<SpotifyAlbum, Error>({
    queryKey: createQueryKey('album.get-album', id),
    queryFn: async () => await spotifyApi.services.album.getAlbum(id)
  });

export const getSeveralAlbumsQuery = (ids: string[]) =>
  queryOptions<SpotifyAlbum[], Error>({
    queryKey: createQueryKey('album.get-several-albums', ids),
    queryFn: async () => {
      const { albums } = await spotifyApi.services.album.getSeveralAlbums(ids);
      return albums;
    }
  });

export const getAlbumTracksQuery = (request: GetAlbumTracksRequest) =>
  queryOptions<SpotifyAlbumTrack[], Error>({
    queryKey: createQueryKey('album.get-tracks', request),
    queryFn: async () => {
      const { items: tracks } = await spotifyApi.services.album.getAlbumTracks(request);
      return tracks;
    }
  });

//#endregion

//#region Query Hooks

/**
 * Makes multiple requests to fetch albums by their IDs due to a maximum API size of 20 Albums.
 *
 * @param {string[]} ids
 * @returns {UseQueryResult<SpotifyAlbum[], Error>}
 */

export const useGetAlbums = (ids: string[]): UseQueryResult<SpotifyAlbum[], Error> => {
  const queryClient = useQueryClient();
  const chunkSize = 20; // Max API size, hence chunking

  return useQuery({
    queryKey: createQueryKey('album.get-albums', ids),
    queryFn: async () => {
      const chunks: string[][] = [];
      for (let i = 0; i < ids.length; i += chunkSize) {
        chunks.push(ids.slice(i, i + chunkSize));
      }

      const promises = chunks.map((chunk) => queryClient.fetchQuery(getSeveralAlbumsQuery(chunk)));

      const albumsRes = await Promise.all(promises);
      return albumsRes.flat();
    }
  });
};

//#endregion
