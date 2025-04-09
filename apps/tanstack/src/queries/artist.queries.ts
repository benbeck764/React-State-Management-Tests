import { createQueryKey } from '@/queries/common/config/query-options-factory';
import { spotifyApi, GetArtistTopTracksRequest } from '@spotify-examples/spotify-api';
import { SpotifyArtist, SpotifyTrack } from '@spotify-examples/spotify-models';
import { queryOptions } from '@tanstack/react-query';

//#region Queries

export const getArtistQuery = (id: string, { enabled = true }: { enabled: boolean }) =>
  queryOptions<SpotifyArtist, Error>({
    queryKey: createQueryKey('artist.get-artist', id),
    queryFn: async () => await spotifyApi.services.artist.getArtist(id),
    enabled
  });

export const getSeveralArtistsQuery = (ids: string[]) =>
  queryOptions<SpotifyArtist[], Error>({
    queryKey: createQueryKey('artist.get-several-artists', ids),
    queryFn: async () => {
      const { artists } = await spotifyApi.services.artist.getSeveralArtists(ids);
      return artists;
    }
  });

export const getArtistTopTracksQuery = (
  request: GetArtistTopTracksRequest,
  { enabled = true }: { enabled: boolean }
) =>
  queryOptions<SpotifyTrack[], Error>({
    queryKey: createQueryKey('artist.get-artist-top-tracks', request),
    queryFn: async () => {
      const { tracks } = await spotifyApi.services.artist.getArtistTopTracks(request);
      return tracks;
    }
  });

//#endregion
