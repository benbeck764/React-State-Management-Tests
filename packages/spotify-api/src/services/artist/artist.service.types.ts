import {
  GetSpotifyItemsBaseResponse,
  SpotifyArtist,
  SpotifyArtistAlbum,
  SpotifyTrack
} from '@spotify-examples/spotify-models';

//#region Get Several Artists

export type GetSeveralArtistsResponse = {
  artists: SpotifyArtist[];
};

//#endregion

//#region Get Artist's Albums

export type GetArtistAlbumsRequest = {
  id: string;
  include_groups?: string;
  market?: string;
  limit?: number; // Maximum: 50
  offset?: number;
};

export type GetArtistAlbumsResponse = GetSpotifyItemsBaseResponse<SpotifyArtistAlbum>;

//#endregion

//#region Get Artist's Top Tracks

export type GetArtistTopTracksRequest = {
  id: string;
  market?: string;
};

export type GetArtistTopTracksResponse = {
  tracks: SpotifyTrack[];
};

//#endregion
