/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import { AppRoutes, RouteName } from "../common/routes";
import AppPageLoader from "@benbeck764/react-components/PageLoader";

const Artist = lazy(() => import("../../features/artist/Artist"));
const Discography = lazy(
  () => import("../../features/artist/views/Discography")
);
const RelatedArtists = lazy(
  () => import("../../features/artist/views/RelatedArtists")
);

export const getArtistRoutes = (): RouteProps[] => [
  {
    path: AppRoutes[RouteName.Artist].path,
    element: (
      <Suspense fallback={<AppPageLoader />}>
        <Outlet />
      </Suspense>
    ),
    children: (
      <>
        <Route
          index
          path={AppRoutes[RouteName.Artist].path}
          element={<Artist />}
        />
        <Route
          index
          path={AppRoutes[RouteName.Discography].path}
          element={<Discography />}
        />
        <Route
          index
          path={AppRoutes[RouteName.RelatedArtists].path}
          element={<RelatedArtists />}
        />
        <Route
          index
          path="*"
          element={<Navigate to={AppRoutes[RouteName.Artist].path} replace />}
        />
      </>
    ),
  },
];
