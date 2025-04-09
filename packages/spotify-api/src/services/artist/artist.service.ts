import { endpoints } from '../../endpoints';
import { get } from '../api.service';
import { ServiceResult } from '../api.types';
import { SpotifyArtist } from '@spotify-examples/spotify-models';
import {
  GetArtistAlbumsRequest,
  GetArtistAlbumsResponse,
  GetArtistTopTracksRequest,
  GetArtistTopTracksResponse,
  GetSeveralArtistsResponse
} from './artist.service.types';

/**
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artist
 *
 * @param {string} id The Spotify ID for the artist.
 * @returns {ServiceResult<SpotifyArtist>} The Spotify artist information.
 */
export const getArtist = (id: string): ServiceResult<SpotifyArtist> => {
  return get(endpoints.spotify.artists.byId(id));
};

/**
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-multiple-artists
 *
 * @param {string[]} ids The Spotify IDs for the artists. **Maximum: 50 IDs.**
 * @returns {ServiceResult<SpotifyArtist[]>} The Spotify artist information.
 */
export const getSeveralArtists = (ids: string[]): ServiceResult<GetSeveralArtistsResponse> => {
  // Spotify API expects a comma-separated list of the Spotify IDs for the artists.
  const artistIds = ids.join(',');
  return get(endpoints.spotify.artists.all, { ids: artistIds });
};

/**
 * Get Spotify catalog information about an artist's albums.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
 *
 * @param {GetArtistAlbumsRequest} request The request object containing the Spotify IDs for the artists. **Maximum `limit` of 50.**
 * @returns {ServiceResult<SpotifyArtist[]>} The Spotify artist information.
 */
export const getArtistAlbums = (
  request: GetArtistAlbumsRequest
): ServiceResult<GetArtistAlbumsResponse> => {
  return get(endpoints.spotify.artists.albums(request.id), request);
};

/**
 * Get Spotify catalog information about an artist's top tracks by country.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
 *
 * @param {GetArtistTopTracksRequest} request The request object containing the Spotify ID for the artist.
 * @returns {ServiceResult<SpotifyTrack[]>} A set of tracks.
 */
export const getArtistTopTracks = (
  request: GetArtistTopTracksRequest
): ServiceResult<GetArtistTopTracksResponse> => {
  return get(endpoints.spotify.artists.topTracks(request.id), request);
};
