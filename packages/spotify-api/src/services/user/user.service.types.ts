import {
  GetSpotifyItemsBaseResponse,
  SpotifyArtist,
  SpotifyTrack
} from '@spotify-examples/spotify-models';

//#region User's Top Items

export type GetUserTopItemsRequest = {
  time_range?: 'short_term' | 'medium_term' | 'long_term';
  limit?: number;
  offset?: number;
};

export type GetUserTopArtistsResponse = GetSpotifyItemsBaseResponse<SpotifyArtist>;

export type GetUserTopTracksResponse = GetSpotifyItemsBaseResponse<SpotifyTrack>;

//#endregion
