import { useEffect, useState } from 'react';
import { playbackStateChanged, playerNotReady, playerReady } from '../../state/slices/player.slice';
import { useAppDispatch } from '../../state/store';
import { useGetDevicesQuery, useGetPlaybackStateQuery } from '../../state/queries/player.api';
import { useSpotifyAuth } from '@spotify-examples/spotify-auth';

const useSpotifyWebPlayback = (): Spotify.Player => {
  const { getAccessToken } = useSpotifyAuth();

  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);

  const { data: devicesResponse } = useGetDevicesQuery();
  const playerStateQuery = useGetPlaybackStateQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      let intervalId: NodeJS.Timeout;

      const player = new window.Spotify.Player({
        name: 'Redux Spotify Client',
        getOAuthToken: async (cb: (token: string) => void) => {
          const accessToken = await getAccessToken();
          if (accessToken) cb(accessToken);
        },
        volume: 1
      });

      setPlayer(player);

      player.addListener('ready', (instance: Spotify.WebPlaybackInstance) => {
        dispatch(playerReady(instance.device_id));
        setPlayerCurrentState(); // Immediately, then every 1s
        intervalId = setInterval(async () => await setPlayerCurrentState(), 1000);
      });

      player.addListener('not_ready', () => {
        dispatch(playerNotReady());
        if (intervalId) clearInterval(intervalId);
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

      // player.addListener("player_state_changed", (state) => {
      //   dispatch(playbackStateChanged(state));
      // });

      player.connect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devicesResponse]);

  const setPlayerCurrentState = async (): Promise<void> => {
    const { data: test } = await playerStateQuery.refetch();
    //const state = await player.getCurrentState();

    if (test) {
      //if (state) {
      //dispatch(playbackStateChanged(state));
      dispatch(playbackStateChanged(test));
    }
  };

  return player!;
};

export default useSpotifyWebPlayback;
