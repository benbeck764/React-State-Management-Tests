/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, RouteProps } from 'react-router-dom';
import { AppRoutes, RouteName } from '../common/routes';
import AppPageLoader from '@benbeck764/react-components/PageLoader';
import { SpotifyAuthGuard } from '@/auth/SpotifyAuthGuard';

const Home = lazy(() => import('@/features/home/Home'));
const Search = lazy(() => import('@/features/search/Search'));

export const getSiteRoutes = (): RouteProps[] => [
  {
    path: AppRoutes[RouteName.SpotifyAuthRedirect].path,
    element: <></>
  },
  {
    path: AppRoutes[RouteName.Site].path,
    element: (
      <Suspense fallback={<AppPageLoader />}>
        <SpotifyAuthGuard>
          <Outlet />
        </SpotifyAuthGuard>
      </Suspense>
    ),
    children: (
      <>
        <Route index path={AppRoutes[RouteName.Site].path} element={<Home />} />
        <Route index path={AppRoutes[RouteName.Search].path} element={<Search />} />
        <Route index path="*" element={<Navigate to={AppRoutes[RouteName.Site].path} replace />} />
      </>
    )
  }
];
