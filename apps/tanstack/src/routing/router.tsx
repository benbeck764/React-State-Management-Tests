import { routeTree } from '@/routing/routes';
import { SpotifyArtist } from '@spotify-examples/spotify-models';
import { createRouter } from '@tanstack/react-router';

export const appRouter = createRouter({
  routeTree,
  search: { strict: true },
  defaultPreload: 'intent',
  notFoundMode: 'root'
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof appRouter;
  }
  interface HistoryState {
    artist?: {
      artist: SpotifyArtist;
    };
  }
}
