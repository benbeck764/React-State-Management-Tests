import { SpotifyCopyRights } from './common/copyright';
import { SpotifyExternalUrls } from './common/external';
import { SpotifyImage } from './common/image';

export type SpotifyShow = {
  available_markets: string[];
  copyrights: SpotifyCopyRights;
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  uri: string;
  total_episodes: number;
};
