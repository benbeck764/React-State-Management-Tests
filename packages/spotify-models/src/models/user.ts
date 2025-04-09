import { SpotifyExternalUrls } from './common/external';
import { SpotifyFollowers } from './common/followers';
import { SpotifyImage } from './common/image';

type SpotifyExplicitContent = {
  filter_enabled: boolean;
  filter_locked: boolean;
};

export type SpotifyUser = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: SpotifyExplicitContent;
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  href: string;
  id: string;
  images: SpotifyImage[];
  product: string;
  type: 'user';
  uri: string;
};
