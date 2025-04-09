import { SpotifyAuthGuard } from '@/auth/SpotifyAuthGuard';
import { createRootRoute, createRoute, Navigate } from '@tanstack/react-router';
import AppContent from 'src/AppContent';

const rootRoute = createRootRoute({
  notFoundComponent: () => <Navigate to="/" />
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <SpotifyAuthGuard>
      <AppContent />
    </SpotifyAuthGuard>
  ),
  id: 'layout'
});

const authRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/spotify-auth-redirect'
});

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/'
}).lazy(() => import('@/features/home/Home').then((module) => module.Route));

const artistRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: 'artist/$id'
}).lazy(() => import('@/features/artist/Artist').then((module) => module.Route));

export const routeTree = rootRoute.addChildren([
  authRedirectRoute,
  layoutRoute.addChildren([homeRoute, artistRoute])
]);
