import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppContent from './AppContent';
import CustomThemeProvider from '@benbeck764/react-components/theme';
import { store } from './state/store';
import { Provider as ReduxProvider } from 'react-redux';
import { SpotifyAuthProvider } from '@spotify-examples/spotify-auth';
import { AppRoutes, RouteName } from '@/routing/common/routes';
import SpotifyAuthInjection from '@/auth/SpotifyAuthInjection';
import { getDefaultTheme } from '@spotify-examples/components';

const App: FC = () => {
  const theme = getDefaultTheme();

  return (
    <ReduxProvider store={store}>
      <CustomThemeProvider theme={theme}>
        <SpotifyAuthProvider
          clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID!}
          redirectUri={`${window.location.origin}${AppRoutes[RouteName.SpotifyAuthRedirect].path}`}
          onRedirectCallback={(appState) => {
            window.location.href =
              appState?.returnTo || `${window.location.origin}${AppRoutes[RouteName.Site].path}`;
          }}
        >
          <SpotifyAuthInjection />
          <Router>
            <CssBaseline />
            <AppContent />
          </Router>
        </SpotifyAuthProvider>
      </CustomThemeProvider>
    </ReduxProvider>
  );
};

export default App;
