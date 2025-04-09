import { SpotifyAlbum } from './album';
import { StrictOmit } from './common/_types';
import { SpotifyExternalUrls } from './common/external';
import { SpotifyFollowers } from './common/followers';
import { SpotifyImage } from './common/image';

export type SpotifyArtist = {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
};

export type SpotifyArtistAlbum = StrictOmit<
  SpotifyAlbum,
  'tracks' | 'copyrights' | 'external_ids' | 'genres' | 'label' | 'popularity'
> & { album_group: 'album' | 'single' | 'compilation' | 'appears_on' };
