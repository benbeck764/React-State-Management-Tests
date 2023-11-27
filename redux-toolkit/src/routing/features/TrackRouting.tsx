/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import { AppRoutes, RouteName } from "../common/routes";
import AppPageLoader from "@benbeck764/react-components/PageLoader";

const Track = lazy(() => import("../../features/track/Track"));

export const getTrackRoutes = (): RouteProps[] => [
  {
    path: AppRoutes[RouteName.Track].path,
    element: (
      <Suspense fallback={<AppPageLoader />}>
        <Outlet />
      </Suspense>
    ),
    children: (
      <>
        <Route
          index
          path={AppRoutes[RouteName.Track].path}
          element={<Track />}
        />
        <Route
          index
          path="*"
          element={<Navigate to={AppRoutes[RouteName.Track].path} replace />}
        />
      </>
    ),
  },
];
