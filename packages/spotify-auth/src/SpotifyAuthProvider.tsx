import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { SpotifyAuthContext, SpotifyAuthContextData } from './context/SpotifyAuthContext';
import { generateRandomString, sha256, base64encode, defaultReturnTo } from './utilities/utils';
import { AppState, SpotifyAccessToken, SpotifyAccessTokenWithExpiry } from './types';
import { endpoints } from './utilities/endpoints';

const SPOTIFY_VERIFIER_CODE = 'spotify.verifier_code';
const SPOTIFY_ACCESS_TOKEN = 'spotify.access_token';
const SPOTIFY_APP_STATE = 'spotify.app_state';

type SpotifyAuthConfig = PropsWithChildren<{
  clientId: string;
  redirectUri: string;
  onRedirectCallback?: (appState?: AppState) => void;
}>;

export const SpotifyAuthProvider: FC<SpotifyAuthConfig> = (props: SpotifyAuthConfig) => {
  const { children, clientId, redirectUri, onRedirectCallback } = props;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(SPOTIFY_ACCESS_TOKEN) !== null;
  });
  const [isLoading, setIsLoading] = useState(true);

  const loginWithRedirect = async (options?: { appState?: AppState }): Promise<void> => {
    if (localStorage.getItem(SPOTIFY_VERIFIER_CODE)) return;

    const { appState } = options || {};

    // Set the App State to Track Current User Location
    const returnTo = appState?.returnTo ?? defaultReturnTo;
    sessionStorage.setItem(SPOTIFY_APP_STATE, JSON.stringify({ returnTo }));

    // Generate Code Verifier and Code Challenge
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    localStorage.setItem(SPOTIFY_VERIFIER_CODE, codeVerifier);

    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-state',
      'user-top-read',
      'user-library-read',
      'user-library-modify',
      'user-modify-playback-state',
      'streaming'
    ];

    // Construct the Authorization URL & Redirect
    const authUrl = new URL(endpoints.auth);
    authUrl.search = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scopes.join(' '),
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri
    }).toString();

    window.location.href = authUrl.toString();
  };

  const handleRedirect = async (code: string) => {
    const currentPath = window.location.pathname;
    const redirectPath = new URL(redirectUri, window.location.origin).pathname;

    if (!code || currentPath !== redirectPath) return;

    // Check if the User is Already Authenticated
    const codeVerifier = localStorage.getItem(SPOTIFY_VERIFIER_CODE);
    if (!codeVerifier) return;

    // Exchange the Authorization Code for an Access Token
    const headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');

    const response = await fetch(endpoints.token, {
      method: 'POST',
      headers,
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier
      })
    });

    const accessTokenResponse = (await response.json()) as SpotifyAccessToken;

    // Append the Access Token with an Expires At Timestamp
    const tokenWithExpiry: SpotifyAccessTokenWithExpiry = {
      ...accessTokenResponse,
      expires_at: Date.now() + accessTokenResponse.expires_in * 1000
    };

    // Store the Access Token and Clean Up Verifier Code
    localStorage.setItem(SPOTIFY_ACCESS_TOKEN, JSON.stringify(tokenWithExpiry));
    localStorage.removeItem(SPOTIFY_VERIFIER_CODE);
    setIsAuthenticated(true);

    // Get the App State from Session Storage
    const rawState = sessionStorage.getItem(SPOTIFY_APP_STATE);
    const appState = rawState ? JSON.parse(rawState) : undefined;
    sessionStorage.removeItem(SPOTIFY_APP_STATE);

    // Redirect the User to the Original Location
    if (onRedirectCallback) onRedirectCallback(appState || {});
    else window.history.replaceState({}, '', appState?.returnTo || '/');
  };

  const getAccessToken = async (): Promise<string | null> => {
    const tokenString = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
    if (!tokenString) return null;

    try {
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt
      } = JSON.parse(tokenString) as SpotifyAccessTokenWithExpiry;

      // Check Expiry, Return Access Token if Not Expired
      const now = Date.now();
      if (expiresAt > now) return accessToken;

      // Token is Expired - Try to Refresh
      if (!refreshToken) localStorage.removeItem(SPOTIFY_ACCESS_TOKEN);

      if (refreshToken && clientId) {
        const headers = new Headers();
        headers.set('Content-Type', 'application/x-www-form-urlencoded');

        const response = await fetch(endpoints.token, {
          method: 'POST',
          headers,
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
          })
        });

        const accessTokenResponse = (await response.json()) as SpotifyAccessToken;

        // Append the Access Token with an Expires At Timestamp
        const refreshedToken: SpotifyAccessTokenWithExpiry = {
          ...accessTokenResponse,
          expires_at: Date.now() + accessTokenResponse.expires_in * 1000
        };

        localStorage.setItem(SPOTIFY_ACCESS_TOKEN, JSON.stringify(refreshedToken));

        return refreshedToken.access_token;
      }
    } catch (err) {
      console.error('Failed to get Spotify Token', err);
      return null;
    }

    return null;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const token = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);

    if (code) {
      handleRedirect(code);
    } else {
      setIsAuthenticated(!!token);

      setIsLoading(false);
    }
  }, [handleRedirect, loginWithRedirect]);

  const value: SpotifyAuthContextData = useMemo(
    () => ({ isLoading, isAuthenticated, loginWithRedirect, getAccessToken }),
    [isLoading, isAuthenticated, loginWithRedirect]
  );

  return <SpotifyAuthContext.Provider value={value}>{children}</SpotifyAuthContext.Provider>;
};
