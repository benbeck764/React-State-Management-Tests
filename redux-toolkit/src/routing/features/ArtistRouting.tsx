/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import { AppRoutes, RouteName } from "../common/routes";
import AppPageLoader from "@benbeck764/react-components/PageLoader";

const Artist = lazy(() => import("../../features/artist/Artist"));
const ArtistDiscography = lazy(
  () => import("../../features/artist/ArtistDiscography")
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
        ></Route>
        <Route
          index
          path={AppRoutes[RouteName.ArtistDiscography].path}
          element={<ArtistDiscography />}
        ></Route>
        <Route
          index
          path="*"
          element={<Navigate to={AppRoutes[RouteName.Artist].path} replace />}
        ></Route>
      </>
    ),
  },
];
