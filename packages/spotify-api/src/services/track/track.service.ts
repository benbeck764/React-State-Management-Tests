import { endpoints } from '../../endpoints';
import { get } from '../api.service';
import { ServiceResult } from '../api.types';
import { SpotifyTrack } from '@spotify-examples/spotify-models';
import { GetRecommendationsRequest, GetRecommendationsResponse } from './track.service.types';

/**
 * Get Spotify catalog information for a single track identified by its unique Spotify ID.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-track
 *
 * @param {string} id The Spotify ID for the track.
 * @returns {ServiceResult<SpotifyTrack>} The Spotify track information.
 */
export const getTrack = (id: string): ServiceResult<SpotifyTrack> => {
  return get(endpoints.spotify.tracks.byId(id));
};

/**
 * @deprecated
 *
 * Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks.
 * If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 *
 * @param {GetRecommendationsRequest} request The parameters for the recommendation request.
 * @returns {ServiceResult<GetRecommendationsResponse>} A list of recommended Spotify tracks.
 */
export const getRecommendations = (
  request: GetRecommendationsRequest
): ServiceResult<GetRecommendationsResponse> => {
  return get(endpoints.spotify.tracks.recommendations, request);
};
