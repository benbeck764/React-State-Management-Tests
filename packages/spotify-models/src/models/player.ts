import { SpotifyExternalUrls } from './common/external';
import { SpotifyEpisode } from './episode';
import { SpotifyTrack } from './track';

export type SpotifyContext = {
  type: 'artist' | 'playlist' | 'album' | 'show';
  href: string;
  external_urls: SpotifyExternalUrls;
  uri: string;
};

export type SpotifyDevice = {
  id: string | null;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
};

export type SpotifyPlaybackActions = {
  interrupting_playback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_shuffle: boolean;
  toggling_repeat_track: boolean;
  transferring_playback: boolean;
};

export type SpotifyPlaybackState = {
  device: SpotifyDevice;
  repeat_state: 'off' | 'track' | 'context';
  shuffle_state: boolean;
  context: SpotifyContext;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: SpotifyTrack | SpotifyEpisode;
  currently_playing_type: 'track' | 'episode' | 'unknown';
  actions: SpotifyPlaybackActions;
};

export type SpotifyPlayHistory = {
  track: SpotifyTrack;
  played_at: string | Date;
  context: SpotifyContext;
};
