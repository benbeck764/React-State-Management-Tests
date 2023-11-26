export const GENIUS_CLIENT_ACCESS_TOKEN = "genius.token";

//#region Request Types
export type GeniusSongRequest = {
  id: number;
  text_format?: "dom" | "plain" | "html";
};
//#endregion

//#region Response Types
export type GeniusApiResponse<T> = {
  meta: {
    status: number;
  };
  response: T;
};

export type GeniusSearchResponse = {
  hits: GeniusHit[];
};
//#endregion

//#region Models

type GeniusHit = {
  highlights: unknown[];
  index: string;
  type: string;
  result: GeniusSearchSong;
};

type GeniusSearchArtist = {
  api_path: string;
  header_image_url: string;
  id: number;
  image_url: string;
  is_meme_verified: boolean;
  is_verified: boolean;
  name: string;
  url: string;
  iq: number;
};

type GeniusSearchSong = Pick<
  GeniusSong,
  | "annotation_count"
  | "api_path"
  | "artist_names"
  | "full_title"
  | "header_image_thumbnail_url"
  | "header_image_url"
  | "id"
  | "lyrics_owner_id"
  | "lyrics_state"
  | "path"
  | "pyongs_count"
  | "relationships_index_url"
  | "release_date_for_display"
  | "release_date_with_abbreviated_month_for_display"
  | "song_art_image_thumbnail_url"
  | "song_art_image_url"
  | "stats"
  | "title"
  | "title_with_featured"
  | "url"
  | "featured_artists"
  | "primary_artist"
> & {
  release_date_components: GeniusDateComponents;
};

export type GeniusSong = {
  annotation_count: number;
  api_path: string;
  apple_music_id: string;
  apple_music_player_url: string;
  artist_names: string;
  description: {
    html: string;
  };
  embed_content: string;
  featured_video: boolean;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  language: number;
  lyrics_owner_id: number;
  lyrics_placeholder_reason: string | null;
  lyrics_state: string;
  path: string;
  pyongs_count: number;
  recording_location: string;
  relationships_index_url: string;
  release_date: Date | string;
  release_date_for_display: string;
  release_date_with_abbreviated_month_for_display: string;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  stats: GeniusStats;
  title: string;
  title_with_featured: string;
  url: string;
  featured_artists: GeniusSearchArtist[];
  primary_artist: GeniusSearchArtist[];
};

type GeniusDateComponents = {
  year: number;
  month: number;
  day: number;
};

type GeniusStats = {
  accepted_annotations: number;
  contributors: number;
  iq_earners: number;
  transcribers: number;
  unreviewed_annotations: number;
  verified_annotations: number;
  concurrents: number;
  hot: boolean;
  pageviews: number;
};

//#endregion
