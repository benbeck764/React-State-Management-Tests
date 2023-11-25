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
};

type GeniusSearchSong = {
  annotation_count: number;
  api_path: string;
  artist_names: string;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  lyrics_owner_id: number;
  lyrics_state: string;
  path: string;
  pyongs_count: number;
  relationships_index_url: string;
  release_date_components: GeniusDateComponents;
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
  unreviewed_annotations: number;
  hot: boolean;
  pageviews: number;
};

//#endregion
