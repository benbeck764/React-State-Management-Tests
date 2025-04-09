import { SpotifyAlbum } from './album';
import { SpotifyArtist } from './artist';
import { SpotifyExternalIds, SpotifyExternalUrls } from './common/external';
import { SpotifyRestrictions } from './common/restrictions';

export type SpotifyTrack = {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalIds;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: unknown;
  restrictions: SpotifyRestrictions;
  name: string;
  popularity: number;
  preview_url?: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};
