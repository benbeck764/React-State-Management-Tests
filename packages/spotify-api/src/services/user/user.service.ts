import { endpoints } from '../../endpoints';
import { get } from '../api.service';
import { ServiceResult } from '../api.types';
import { SpotifyUser } from '@spotify-examples/spotify-models';
import {
  GetUserTopArtistsResponse,
  GetUserTopItemsRequest,
  GetUserTopTracksResponse
} from './user.service.types';

/**
 * Get detailed profile information about the current user (including the current user's username).
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 *
 * @returns {ServiceResult<SpotifyUser>} The current Spotify user's profile information.
 */
export const getCurrentUserProfile = (): ServiceResult<SpotifyUser> => {
  return get(endpoints.spotify.me.profile);
};

/**
 * Get the current user's top artists based on calculated affinity.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 *
 * @returns {ServiceResult<GetUserTopArtistsResponse>} Pages of artists.
 */
export const getUsersTopArtists = (
  request?: GetUserTopItemsRequest
): ServiceResult<GetUserTopArtistsResponse> => {
  return get(endpoints.spotify.me.topArtists, request);
};

/**
 * Get the current user's top tracks based on calculated affinity.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 *
 * @returns {ServiceResult<GetUserTopTracksResponse>} Pages of tracks.
 */
export const getUsersTopTracks = (
  request?: GetUserTopItemsRequest
): ServiceResult<GetUserTopTracksResponse> => {
  return get(endpoints.spotify.me.topTracks, request);
};
