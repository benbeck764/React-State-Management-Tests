import { SpotifyDatePrecision } from './common/date';
import { SpotifyExternalUrls } from './common/external';
import { SpotifyImage } from './common/image';
import { SpotifyRestrictions } from './common/restrictions';
import { SpotifyShow } from './show';

type SpotifyResumePoint = {
  fully_played: boolean;
  resume_position_ms: number;
};

export type SpotifyEpisode = {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: SpotifyDatePrecision;
  resume_point: SpotifyResumePoint;
  type: 'episode';
  uri: string;
  restrictions: SpotifyRestrictions;
  show: SpotifyShow;
};
