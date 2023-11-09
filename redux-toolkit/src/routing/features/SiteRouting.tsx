/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import { AppRoutes, RouteName } from "../common/routes";
import { AppPageLoader } from "@benbeck764/react-components";

const Home = lazy(() => import("../../features/home/Home"));

export const getSiteRoutes = (): RouteProps[] => [
  {
    path: AppRoutes[RouteName.Site].path,
    element: (
      <Suspense fallback={<AppPageLoader />}>
        <Outlet />
      </Suspense>
    ),
    children: (
      <>
        <Route
          index
          path={AppRoutes[RouteName.Home].path}
          element={<Home />}
        ></Route>
        <Route
          index
          path="*"
          element={<Navigate to={AppRoutes[RouteName.Home].path} replace />}
        ></Route>
      </>
    ),
  },
];
