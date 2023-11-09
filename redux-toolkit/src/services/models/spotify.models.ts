export const SPOTIFY_VERIFIER_CODE = "spotify.verifier-code";
export const SPOTIFY_ACCESS_TOKEN = "spotify.token";

//#region Request Types

export type GetUserTopItemsRequest = {
  type?: "artists" | "tracks";
  time_range?: "short_term" | "medium_term" | "long_term";
  limit?: number;
  offset?: number;
};

//#endregion

//#region Response Types

export type SpotifyAccessToken = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

type SpotifyExternalUrls = {
  spotify: string;
};

type SpotifyExternalIds = {
  isrc: string;
  ean: string;
  upc: string;
};

type SpotifyFollowers = {
  href: string;
  total: number;
};

type SpotifyImage = {
  url: string;
  height?: number;
  width?: number;
};

type SpotifyRestrictions = {
  reason: string;
};

export type SpotifyAlbum = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: SpotifyRestrictions;
  type: "album";
  url: string;
  artists: SimplifiedSpotifyArtist[];
};

export type SpotifyArtist = {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
};
type SimplifiedSpotifyArtist = Pick<
  SpotifyArtist,
  "external_urls" | "href" | "id" | "name" | "type" | "uri"
>;

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
  linked_from: unknown; //
  restrictions: SpotifyRestrictions;
  name: string;
  popularity: number;
  preview_url?: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
};

//#endregion
