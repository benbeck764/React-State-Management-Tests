import { createContext } from 'react';
import { AppState } from '../types';

export type SpotifyAuthContextData = {
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithRedirect: (options?: { appState?: AppState }) => Promise<void>;
  getAccessToken: () => Promise<string | null>;
};

export const SpotifyAuthContext = createContext<SpotifyAuthContextData | undefined>(undefined);
