import { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { getDefaultTheme, ThemeProvider } from '@spotify-examples/components';
import { RouterProvider } from '@tanstack/react-router';
import { appRouter } from '@/routing/router';
import { SpotifyAuthProvider } from '@spotify-examples/spotify-auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/queries/common/config/query-client';
import SpotifyAuthGatekeeper from '@/auth/SpotifyAuthGatekeeper';
import { SpotifyPlayerProvider } from '@/features/player/SpotifyPlayerProvider';

const App: FC = () => {
  const theme = getDefaultTheme();

  const homePath = appRouter.flatRoutes.find((r) => r.path === '/')?.path;
  const redirectPath = appRouter.flatRoutes.find((r) => r.path === 'spotify-auth-redirect')?.path;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SpotifyAuthProvider
          clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID!}
          redirectUri={`${window.location.origin}/${redirectPath}`}
          onRedirectCallback={(appState) => {
            window.location.href = appState?.returnTo || `${window.location.origin}${homePath}`;
          }}
        >
          <SpotifyAuthGatekeeper>
            <SpotifyPlayerProvider>
              <RouterProvider router={appRouter} />
              <CssBaseline />
            </SpotifyPlayerProvider>
          </SpotifyAuthGatekeeper>
        </SpotifyAuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
