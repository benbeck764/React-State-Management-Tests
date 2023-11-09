export enum RouteName {
  // Site Routes
  Site = "Site",
  Artist = "Artist",
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
};
