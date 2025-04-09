import { AppPageLoader } from '@benbeck764/react-components';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { useSpotifyAuth } from '@spotify-examples/spotify-auth';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

const SpotifyAuthGatekeeper: FC<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;

  const { isAuthenticated, getAccessToken } = useSpotifyAuth();
  const [isInterceptorReady, setIsInterceptorReady] = useState(false);

  useEffect(() => {
    const bearerTokenInterceptor = async (request: RequestInit) => {
      if (!isAuthenticated) return request;

      const accessToken = await getAccessToken();
      if (accessToken) {
        const headers = new Headers(request.headers);
        headers.set('Authorization', `Bearer ${accessToken}`);
        return { ...request, headers };
      }

      return request;
    };

    const interceptorId = spotifyApi.interceptors.request.add(bearerTokenInterceptor);
    setIsInterceptorReady(true);

    return () => {
      spotifyApi.interceptors.request.remove(interceptorId);
    };
  }, [isAuthenticated, getAccessToken]);

  if (!isInterceptorReady) return <AppPageLoader />;

  return children;
};

export default SpotifyAuthGatekeeper;
