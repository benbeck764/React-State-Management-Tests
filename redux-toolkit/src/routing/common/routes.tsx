export enum RouteName {
  // Site Routes
  Site = "Site",
  Artist = "Artist",
  ArtistDiscography = "ArtistDiscography",
  Album = "Album",
  Track = "Track",
  Search = "Search",
}

export type AppRoute = {
  path: string;
  displayName?: string;
  params?: string[];
};

export const AppRoutes: Record<RouteName, AppRoute> = {
  // Site Routes
  [RouteName.Site]: {
    path: "/",
  },
  [RouteName.Artist]: {
    path: "/artist/:artistId",
    params: [":artistId"],
  },
  [RouteName.ArtistDiscography]: {
    path: "/artist/:artistId/discography/:discographyType",
    params: [":artistId", ":discographyType"],
  },
  [RouteName.Album]: {
    path: "/album/:albumId",
    params: [":albumId"],
  },
  [RouteName.Track]: {
    path: "/track/:trackId",
    params: [":trackId"],
  },
  [RouteName.Search]: {
    path: "/search/:query",
    params: [":query"],
  },
};
