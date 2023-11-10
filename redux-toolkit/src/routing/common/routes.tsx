export enum RouteName {
  // Site Routes
  Site = "Site",
  Artist = "Artist",
  ArtistDiscography = "ArtistDiscography",
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
    path: "/artist/:artistId/discography",
    params: [":artistId"],
  },
};
