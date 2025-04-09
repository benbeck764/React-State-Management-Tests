import { getSpotifyAxiosInstance } from '@/state/queries/common/spotify-axios-instance';
import { useSpotifyAuth } from '@spotify-examples/spotify-auth';
import { InternalAxiosRequestConfig } from 'axios';
import { FC, useCallback, useEffect, useMemo } from 'react';

const SpotifyAuthInjection: FC = () => {
  const { isAuthenticated, getAccessToken } = useSpotifyAuth();

  const spotifyAxiosInstance = useMemo(() => getSpotifyAxiosInstance(), []);

  const bearerTokenInterceptor = useCallback(
    async (request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      if (!isAuthenticated) return request;

      const accessToken = await getAccessToken();

      if (accessToken) {
        request.headers.Accept = 'application/json';
        request.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return request;
    },
    [isAuthenticated, getAccessToken]
  );

  useEffect(() => {
    spotifyAxiosInstance.interceptors.request.clear();
    spotifyAxiosInstance.interceptors.request.use(bearerTokenInterceptor);
  }, [spotifyAxiosInstance, bearerTokenInterceptor]);

  return null;
};

export default SpotifyAuthInjection;
