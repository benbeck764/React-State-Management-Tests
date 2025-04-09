import { useContext } from 'react';
import { SpotifyAuthContextData, SpotifyAuthContext } from './SpotifyAuthContext';

export const useSpotifyAuth = (): SpotifyAuthContextData => {
  const context = useContext(SpotifyAuthContext);
  if (!context) throw new Error('useSpotifyAuth must be used within SpotifyAuthProvider');
  return context;
};
