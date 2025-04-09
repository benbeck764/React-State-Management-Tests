import { endpoints } from '../../endpoints';
import { get } from '../api.service';
import { ServiceResult } from '../api.types';
import { SpotifyAlbum } from '@spotify-examples/spotify-models';
import {
  GetAlbumTracksRequest,
  GetAlbumTracksResponse,
  GetSeveralAlbumsResponse
} from './album.service.types';

/**
 * Get Spotify catalog information for a single album.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-an-album
 *
 * @param {string} id The Spotify ID for the album.
 * @returns {ServiceResult<SpotifyAlbum>} The Spotify album information.
 */
export const getAlbum = (id: string): ServiceResult<SpotifyAlbum> => {
  return get(endpoints.spotify.albums.byId(id));
};

/**
 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
 *
 * @param {string[]} ids The Spotify IDs for the albums. **Maximum: 20 IDs.**
 * @returns {ServiceResult<SpotifyAlbum[]>} The Spotify album information.
 */
export const getSeveralAlbums = (ids: string[]): ServiceResult<GetSeveralAlbumsResponse> => {
  // Spotify API expects a comma-separated list of the Spotify IDs for the albums.
  const albumIds = ids.join(',');
  return get(endpoints.spotify.albums.all, { ids: albumIds });
};

/**
 * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-an-albums-tracks
 *
 * @param request The request object containing the album ID and optional parameters.
 * @returns The Spotify album tracks information.
 */
export const getAlbumTracks = (
  request: GetAlbumTracksRequest
): ServiceResult<GetAlbumTracksResponse> => {
  return get(endpoints.spotify.albums.tracks(request.id), request);
};
