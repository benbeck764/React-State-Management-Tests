import { RouteName } from "./routes";
import { replaceParams } from "./routing-helpers";

export const getArtistUrl = (artistId: string): string => {
  return replaceParams(RouteName.Artist, [artistId]);
};

export const getArtistDiscographyUrl = (artistId: string): string => {
  return replaceParams(RouteName.ArtistDiscography, [artistId]);
};

export const getAlbumUrl = (albumId: string): string => {
  return replaceParams(RouteName.Album, [albumId]);
};

export const getTrackUrl = (trackId: string): string => {
  return replaceParams(RouteName.Track, [trackId]);
};

export const getSearchUrl = (searchTerm: string): string => {
  return replaceParams(RouteName.Search, [searchTerm]);
};
