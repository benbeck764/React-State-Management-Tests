import {
  GetSpotifyItemsBaseResponse,
  SpotifyAlbum,
  SpotifyAlbumTrack
} from '@spotify-examples/spotify-models';

//#region Get Several Albums

export type GetSeveralAlbumsResponse = {
  albums: SpotifyAlbum[];
};

//#endregion

//#region Get Album Tracks

export type GetAlbumTracksRequest = {
  id: string;
  market?: string;
  limit?: number; // Maximum: 50
  offset?: number;
};

export type GetAlbumTracksResponse = GetSpotifyItemsBaseResponse<SpotifyAlbumTrack>;

//#endregion
