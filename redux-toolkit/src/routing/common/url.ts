import { RouteName } from "./routes";
import { replaceParams } from "./routing-helpers";

export const getArtistUrl = (artistId: string): string => {
  return replaceParams(RouteName.Artist, [artistId]);
};
