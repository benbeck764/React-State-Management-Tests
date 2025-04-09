import { SpotifyArtist } from './artist';
import { StrictOmit } from './common/_types';
import { SpotifyCopyRights } from './common/copyright';
import { SpotifyDatePrecision } from './common/date';
import { SpotifyExternalIds, SpotifyExternalUrls } from './common/external';
import { SpotifyImage } from './common/image';
import { SpotifyRestrictions } from './common/restrictions';
import { SpotifyTrack } from './track';

export type SpotifyAlbumTrack = StrictOmit<SpotifyTrack, 'album' | 'external_urls' | 'popularity'>;

export type SpotifyAlbumTracks = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyAlbumTrack[];
};

export type SpotifyAlbumArtist = Pick<
  SpotifyArtist,
  'external_urls' | 'href' | 'id' | 'name' | 'type' | 'uri'
>;

export type SpotifyAlbum = {
  album_type: 'album' | 'single' | 'compilation';
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: SpotifyDatePrecision;
  restrictions: SpotifyRestrictions;
  type: 'album';
  uri: string;
  artists: SpotifyAlbumArtist[];
  tracks: SpotifyAlbumTracks;
  copyrights: SpotifyCopyRights[];
  external_ids: SpotifyExternalIds;
  genres: string[];
  label: string;
  popularity: number;
};
