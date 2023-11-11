export const SPOTIFY_VERIFIER_CODE = "spotify.verifier-code";
export const SPOTIFY_ACCESS_TOKEN = "spotify.token";

//#region Request Types

export type GetUserTopItemsRequest = {
  time_range?: "short_term" | "medium_term" | "long_term";
  limit?: number;
  offset?: number;
};

export type GetArtistAlbumsRequest = {
  id: string;
  include_groups?: string;
  market?: string;
  limit?: number;
  offset?: number;
};

export type GetArtistTopTracksRequest = {
  id: string;
  market?: string;
};

export type GetAlbumRequest = {
  id: string;
  market?: string;
};

export type GetAlbumsRequest = {
  ids: string;
  market?: string;
};

export type GetAlbumTracksRequest = {
  id: string;
  market?: string;
  limit?: number;
  offset?: number;
};

//#endregion

//#region Response Types

type GetItemsBaseResponse<T> = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
};

export type GetUserTopArtistsResponse = GetItemsBaseResponse<SpotifyArtist>;
export type GetUserTopTracksResponse = GetItemsBaseResponse<SpotifyTrack>;

export type GetArtistAlbumsResponse =
  GetItemsBaseResponse<SimplifiedSpotifyAlbum>;
export type GetArtistTopTracksResponse = {
  tracks: SpotifyTrack[];
};

export type GetAlbumsResponse = {
  albums: SpotifyAlbum[];
};
export type GetDiscographyResponse = GetAlbumsResponse & {
  total: number;
};
export type GetAlbumTracksResponse =
  GetItemsBaseResponse<SimplifiedSpotifyTrack>;

//#endregion

//#region Models

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

type SpotifyCopyRights = {
  text: string;
  type: string;
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
  tracks: SpotifyAlbumTracks;
  copyrights: SpotifyCopyRights[];
  external_ids: SpotifyExternalIds;
  genres: string[];
  label: string;
  popularity: number;
};
export type SimplifiedSpotifyAlbum = SpotifyAlbum & { album_group: string };

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
export type SimplifiedSpotifyArtist = Pick<
  SpotifyArtist,
  "external_urls" | "href" | "id" | "name" | "type" | "uri"
>;

type SpotifyAlbumTracks = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SimplifiedSpotifyTrack[];
};

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
export type SimplifiedSpotifyTrack = Omit<
  SpotifyTrack,
  "album" | "external_urls" | "popularity"
>;

//#endregion
