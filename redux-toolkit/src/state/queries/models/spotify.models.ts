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

export type GetTrackRequest = {
  id: string;
  market?: string;
};

export type GetRecommendationsRequest = {
  limit?: number;
  market?: string;
  seed_artists?: string;
  seed_genres?: string;
  seed_tracks?: string;
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_duration_ms?: number;
  max_duration_ms?: number;
  target_duration_ms?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
};

export type SearchItemRequest = {
  q: string;
  type: (
    | "album"
    | "artist"
    | "playlist"
    | "track"
    | "show"
    | "episode"
    | "audiobook"
  )[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: "audio";
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

export type GetArtistsResponse = {
  artists: SpotifyArtist[];
};

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

export type GetDevicesResponse = {
  devices: SpotifyDevice[];
};

export type SearchItemResponse = {
  tracks: GetItemsBaseResponse<SpotifyTrack>;
  artists: GetItemsBaseResponse<SpotifyArtist>;
  albums: GetItemsBaseResponse<SpotifyAlbum>;
  // [TODO]: Implement these in the future if necessary
  playlists: never;
  shows: never;
  episodes: never;
  audiobooks: never;
};

export type GetRecommendationsResponse = {
  seeds: SpotifyRecommendationSeed[];
  tracks: SpotifyTrack[];
};

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
  href?: string;
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

type SpotifyExplicitContent = {
  filter_enabled: boolean;
  filter_locked: boolean;
};

type SpotifyCursors = {
  after: string;
  before: string;
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
export type SimplifiedSpotifyArtist = Pick<
  SpotifyArtist,
  "external_urls" | "href" | "id" | "name" | "type" | "uri"
>;

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
  uri: string;
  artists: SimplifiedSpotifyArtist[];
  tracks: SpotifyAlbumTracks;
  copyrights: SpotifyCopyRights[];
  external_ids: SpotifyExternalIds;
  genres: string[];
  label: string;
  popularity: number;
};
export type SimplifiedSpotifyAlbum = Omit<
  SpotifyAlbum,
  "tracks" | "copyrights" | "external_ids" | "genres" | "label" | "popularity"
> & { album_group: "album" | "single" | "compilation" | "appears_on" };

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
  type: "user";
  uri: string;
};

type SpotifyRecommendationSeed = {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: "artist" | "track" | "genre";
};

//#endregion

//#region Player Models

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

type SpotifyContext = {
  type: "artist" | "playlist" | "album" | "show";
  href: string;
  external_urls: SpotifyExternalUrls;
  uri: string;
};

type SpotifyResumePoint = {
  fully_played: boolean;
  resume_position_ms: number;
};

type SpotifyShow = {
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
  type: "show";
  uri: string;
  total_episodes: number;
};

type SpotifyEpisode = {
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
  release_date_precision: string;
  resume_point: SpotifyResumePoint;
  type: "episode";
  uri: string;
  restrictions: SpotifyRestrictions;
  show: SpotifyShow;
};

type SpotifyPlaybackActions = {
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
  repeat_state: "off" | "track" | "context";
  shuffle_state: boolean;
  context: SpotifyContext;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: SpotifyTrack | SpotifyEpisode;
  currently_playing_type: "track" | "episode" | "unknown";
  actions: SpotifyPlaybackActions;
};

export type SpotifyPlayHistory = {
  track: SpotifyTrack;
  played_at: string | Date;
  context: SpotifyContext;
};

export type GetRecentlyPlayedTracksRequest = {
  limit?: number;
  after?: number;
  before?: number;
};

export type GetRecentlyPlayedTracksResponse = {
  href: string;
  limit: number;
  next: string;
  cursors: SpotifyCursors;
  total: number;
  items: SpotifyPlayHistory[];
};

export type StartOrResumePlaybackRequest = {
  device_id: string;
  context_uri?: string;
  uris?: string[];
  offset?: { position?: number; uri?: string };
  position_ms?: number;
};

//#endregion
