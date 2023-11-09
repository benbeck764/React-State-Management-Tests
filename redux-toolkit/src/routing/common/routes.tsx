export enum RouteName {
  // Site Routes
  Site = "Site",
}

export type AppRoute = {
  displayName: string;
  path: string;
  params?: string[];
};

export const AppRoutes: Record<RouteName, AppRoute> = {
  // Site Routes
  [RouteName.Site]: {
    displayName: "Site",
    path: "/",
  },
};
