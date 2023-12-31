/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import { AppRoutes, RouteName } from "../common/routes";
import AppPageLoader from "@benbeck764/react-components/PageLoader";

const Home = lazy(() => import("../../features/home/Home"));
const Search = lazy(() => import("../../features/search/Search"));

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
        <Route index path={AppRoutes[RouteName.Site].path} element={<Home />} />
        <Route
          index
          path={AppRoutes[RouteName.Search].path}
          element={<Search />}
        />
        <Route
          index
          path="*"
          element={<Navigate to={AppRoutes[RouteName.Site].path} replace />}
        />
      </>
    ),
  },
];
