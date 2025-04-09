import { SpotifyDevice, SpotifyPlaybackState } from '@spotify-examples/spotify-models';

//#region Devices

export type GetDevicesResponse = {
  devices: SpotifyDevice[];
};

export type TransferPlaybackRequest = {
  /**
   * A JSON array containing the ID of the device on which playback should be started/transferred.
   */
  device_ids: string[];
  /**
   * - `true`: ensure playback happens on new device.
   * - `false` or not provided: keep the current playback state.
   */
  play?: boolean;
};

//#endregion

//#region Player Controls

type BasePlayerRequest = {
  /**
   * The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   */
  device_id?: string;
};

export type PausePlaybackRequest = BasePlayerRequest & {};

export type StartOrResumePlaybackRequest = BasePlayerRequest & {};

export type SkipToNextRequest = BasePlayerRequest & {};

export type SkipToPreviousRequest = BasePlayerRequest & {};

export type SeekToPositionRequest = BasePlayerRequest & {
  /**
   * The position in milliseconds to seek to. Must be a positive number.
   * Passing in a position that is greater than the length of the track will cause the player to start playing the next song.
   */
  position_ms: number;
};

export type SetRepeatModeRequest = BasePlayerRequest & {
  /**
   * The repeat mode to set. Can be one of the following:
   * - "off": Repeat is disabled.
   * - "track": Repeat the current track.
   * - "context": Repeat the current context (e.g., album, playlist).
   */
  state: SpotifyPlaybackState['repeat_state'];
};

export type SetPlaybackVolumeRequest = BasePlayerRequest & {
  /**
   * The volume to set. Must be a value from 0 to 100 inclusive.
   */
  volume_percent: number;
};

export type TogglePlaybackShuffleRequest = BasePlayerRequest & {
  /**
   * - `true`: Shuffle user's playback.
   * - `false`: Do not shuffle user's playback.
   */
  state: boolean;
};

//#endregion
