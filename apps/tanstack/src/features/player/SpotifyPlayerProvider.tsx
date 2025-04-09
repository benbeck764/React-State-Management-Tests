import { useSpotifyAuth } from '@spotify-examples/spotify-auth';
import { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';

const SpotifyPlayerContext = createContext<{
  player: Spotify.Player | undefined;
  thisDeviceId: string | undefined;
} | null>(null);

export const SpotifyPlayerProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const { getAccessToken } = useSpotifyAuth();

  const [thisDeviceId, setThisDeviceId] = useState<string>();
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'TanStack Spotify Client',
        getOAuthToken: async (cb) => {
          const accessToken = await getAccessToken();
          if (accessToken) cb(accessToken);
        },
        volume: 1
      });

      player.addListener('ready', ({ device_id }) => {
        setThisDeviceId(device_id);
      });

      player.addListener('ready', (instance: Spotify.WebPlaybackInstance) => {
        setThisDeviceId(instance.device_id);
      });

      player.addListener('not_ready', () => {
        //
      });

      // Error handling
      player.addListener('autoplay_failed', () => {
        console.error(`Autoplay failed`);
      });
      player.addListener('initialization_error', ({ message }) => {
        console.error(`Initialization error: ${message}`);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error(`Authentication error: ${message}`);
      });
      player.addListener('account_error', ({ message }) => {
        console.error(`Account error: ${message}`);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error(`Playback error: ${message}`);
      });

      player.connect();

      setPlayer(player);
    };

    // return () => {
    //   if (player) player.disconnect();
    // };
  }, [getAccessToken, player]);

  return (
    <SpotifyPlayerContext.Provider value={{ player, thisDeviceId }}>
      {children}
    </SpotifyPlayerContext.Provider>
  );
};

export const useSpotifyPlayer = () => useContext(SpotifyPlayerContext);
