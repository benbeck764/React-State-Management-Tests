import AppPageLoader from '@benbeck764/react-components/PageLoader';
import { useSpotifyAuth, withAuthenticationRequired } from '@spotify-examples/spotify-auth';
import { PropsWithChildren } from 'react';

export const SpotifyAuthGuard = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useSpotifyAuth();

  if (!isAuthenticated) {
    const Component = withAuthenticationRequired(() => children, {
      onRedirecting: () => <AppPageLoader />
    });

    return <Component />;
  }

  return children;
};
