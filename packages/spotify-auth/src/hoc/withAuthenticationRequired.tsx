import { ComponentType, FC, useEffect } from 'react';
import { defaultReturnTo } from '../utilities/utils';
import { useSpotifyAuth } from '../context/useSpotifyAuth';

type WithAuthenticationRequiredOptions = {
  onRedirecting?: () => JSX.Element;
  returnTo?: string;
};

export const withAuthenticationRequired = <P extends object>(
  Component: ComponentType<P>,
  options: WithAuthenticationRequiredOptions = {}
): FC<P> => {
  const { onRedirecting = (): JSX.Element => <></>, returnTo = defaultReturnTo } = options;

  const WithAuthenticationRequired = (props: P): JSX.Element => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useSpotifyAuth();

    useEffect(() => {
      if (isLoading || isAuthenticated) return;

      (async (): Promise<void> => {
        await loginWithRedirect({
          appState: { returnTo }
        });
      })();
    }, [isLoading, isAuthenticated, loginWithRedirect, returnTo]);

    return isAuthenticated ? <Component {...props} /> : onRedirecting();
  };

  return WithAuthenticationRequired;
};
