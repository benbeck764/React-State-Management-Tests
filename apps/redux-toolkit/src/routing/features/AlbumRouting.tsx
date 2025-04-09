/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, RouteProps } from 'react-router-dom';
import { AppRoutes, RouteName } from '../common/routes';
import AppPageLoader from '@benbeck764/react-components/PageLoader';
import { SpotifyAuthGuard } from '@/auth/SpotifyAuthGuard';

const Album = lazy(() => import('../../features/album/Album'));

export const getAlbumRoutes = (): RouteProps[] => [
  {
    path: AppRoutes[RouteName.Album].path,
    element: (
      <Suspense fallback={<AppPageLoader />}>
        <SpotifyAuthGuard>
          <Outlet />
        </SpotifyAuthGuard>
      </Suspense>
    ),
    children: (
      <>
        <Route index path={AppRoutes[RouteName.Album].path} element={<Album />} />
        <Route index path="*" element={<Navigate to={AppRoutes[RouteName.Album].path} replace />} />
      </>
    )
  }
];
