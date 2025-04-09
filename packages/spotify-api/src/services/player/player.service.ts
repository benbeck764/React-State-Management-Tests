import { endpoints } from '../../endpoints';
import { get, post, put } from '../api.service';
import { ServiceResult } from '../api.types';
import { SpotifyPlaybackState } from '@spotify-examples/spotify-models';
import {
  GetDevicesResponse,
  PausePlaybackRequest,
  StartOrResumePlaybackRequest,
  SeekToPositionRequest,
  SkipToNextRequest,
  SkipToPreviousRequest,
  TogglePlaybackShuffleRequest,
  SetRepeatModeRequest,
  SetPlaybackVolumeRequest,
  TransferPlaybackRequest
} from './player.service.types';

/**
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback
 *
 * @returns {ServiceResult<SpotifyPlaybackState>} Information about playback.
 */
export const getPlaybackState = (): ServiceResult<SpotifyPlaybackState> => {
  return get(endpoints.spotify.me.player);
};

/**
 * Transfer playback to a new device and optionally begin playback.
 * This API only works for users who have Spotify Premium.
 * The order of execution is not guaranteed when you use this API with other Player API endpoints.
 *
 * https://developer.spotify.com/documentation/web-api/reference/transfer-a-users-playback
 *
 * @param {TransferPlaybackRequest} request
 * @returns {ServiceResult<void>} Playback transferred.
 */
export const transferPlayback = (request: TransferPlaybackRequest): ServiceResult<void> => {
  return put(endpoints.spotify.me.player, request, 'body');
};

/**
 * Get information about a user’s available Spotify Connect devices.
 * Some device models are not supported and will not be listed in the API response.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-a-users-available-devices
 *
 * @returns {ServiceResult<GetDevicesResponse>} A set of devices.
 */
export const getAvailableDevices = (): ServiceResult<GetDevicesResponse> => {
  return get(endpoints.spotify.me.devices);
};

/**
 * Get the object currently being played on the user's Spotify account.
 *
 * https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track
 *
 * @returns {ServiceResult<SpotifyPlaybackState>} Information about the currently playing track.
 */
export const getCurrentlyPlayingTrack = (): ServiceResult<SpotifyPlaybackState> => {
  return get(endpoints.spotify.me.currentlyPlaying);
};

/**
 * Pause playback on the user's account.
 * This API only works for users who have Spotify Premium.
 * The order of execution is not guaranteed when you use this API with other Player API endpoints.
 *
 * https://developer.spotify.com/documentation/web-api/reference/pause-a-users-playback
 *
 * @param {PausePlaybackRequest} request
 * @returns {ServiceResult<void>} Playback paused.
 */
export const pausePlayback = (request: PausePlaybackRequest): ServiceResult<void> => {
  return put(endpoints.spotify.me.pause, request);
};

/**
 * Start a new context or resume current playback on the user's active device.
 * This API only works for users who have Spotify Premium.
 * The order of execution is not guaranteed when you use this API with other Player API endpoints.
 *
 * https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback
 *
 * @param {StartOrResumePlaybackRequest} request
 * @returns {ServiceResult<void>} Playback started or resumed.
 */
export const startOrResumePlayback = (
  request: StartOrResumePlaybackRequest
): ServiceResult<void> => {
  return put(endpoints.spotify.me.play, request);
};

/**
 * Skips to next track in the user’s queue.
 * This API only works for users who have Spotify Premium.
 * The order of execution is not guaranteed when you use this API with other Player API endpoints.
 *
 * @param {SkipToNextRequest} request
 * @returns {ServiceResult<void>} Command sent.
 */
export const skipToNext = (request: SkipToNextRequest): ServiceResult<void> => {
  return post(endpoints.spotify.me.next, request, 'query-params');
};

/**
 * Skips to previous track in the user’s queue.
 * This API only works for users who have Spotify Premium.
 * The order of execution is not guaranteed when you use this API with other Player API endpoints.
 *
 * @param {SkipToPreviousRequest} request
 * @returns {ServiceResult<void>} Command sent.
 */
export const skipToPrevious = (request: SkipToPreviousRequest): ServiceResult<void> => {
  return post(endpoints.spotify.me.previous, request, 'query-params');
};

/**
 * Seeks to the given position in the user’s currently playing track.
 * This API only works for users who have Spotify Premium.
 * The order of execution is not guaranteed when you use this API with other Player API endpoints.
 *
 * https://developer.spotify.com/documentation/web-api/reference/seek-to-position-in-currently-playing-track
 *
 * @param {SeekToPositionRequest} request
 * @returns {ServiceResult<void>} Command sent.
 */
export const seekToPosition = (request: SeekToPositionRequest): ServiceResult<void> => {
  return put(endpoints.spotify.me.seek, request, 'query-params');
};

/**
 * Set the repeat mode for the user's playback.
 * This API only works for users who have Spotify Premium.
 * The order of execution is not guaranteed when you use this API with other Player API endpoints.
 *
 * https://developer.spotify.com/documentation/web-api/reference/set-repeat-mode-on-users-playback
 *
 * @param {SetRepeatModeRequest} request
 * @returns {ServiceResult<void>} Command sent.
 */
export const setRepeatMode = (request: SetRepeatModeRequest): ServiceResult<void> => {
  return put(endpoints.spotify.me.repeat, request, 'query-params');
};

/**
 * Set the playback volume for the user's current playback device.
 * This API only works for users who have Spotify Premium.
 * The order of execution is not guaranteed when you use this API with other Player API endpoints.
 *
 * https://developer.spotify.com/documentation/web-api/reference/set-volume-for-users-playback
 *
 * @param {SetPlaybackVolumeRequest} request
 * @returns {ServiceResult<void>} Command sent.
 */
export const setPlaybackVolume = (request: SetPlaybackVolumeRequest): ServiceResult<void> => {
  return put(endpoints.spotify.me.volume, request, 'query-params');
};

/**
 * Toggle shuffle on or off for user’s playback.
 * This API only works for users who have Spotify Premium.
 * The order of execution is not guaranteed when you use this API with other Player API endpoints.
 *
 * https://developer.spotify.com/documentation/web-api/reference/toggle-shuffle-for-users-playback
 *
 * @param {TogglePlaybackShuffleRequest} request
 * @returns {ServiceResult<void>} Command sent.
 */
export const togglePlaybackShuffle = (
  request: TogglePlaybackShuffleRequest
): ServiceResult<void> => {
  return put(endpoints.spotify.me.shuffle, request, 'query-params');
};
