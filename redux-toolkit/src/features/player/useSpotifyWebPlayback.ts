import { useEffect, useState } from "react";
import {
  SPOTIFY_ACCESS_TOKEN,
  SpotifyAccessToken,
} from "../../state/queries/models/spotify.models";
import {
  playbackStateChanged,
  playerNotReady,
  playerReady,
} from "../../state/slices/player.slice";
import { useAppDispatch } from "../../state/store";

const useSpotifyWebPlayback = (): Spotify.Player => {
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);

  const dispatch = useAppDispatch();

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      let intervalId: NodeJS.Timeout;

      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb: (token: string) => void) => {
          const tokenString = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
          if (!tokenString) return;

          const { access_token: accessToken } = JSON.parse(
            tokenString
          ) as SpotifyAccessToken;

          if (accessToken) cb(accessToken);
        },
        volume: 1,
      });

      setPlayer(player);

      player.addListener("ready", (instance: Spotify.WebPlaybackInstance) => {
        dispatch(playerReady(instance.device_id));

        setPlayerCurrentState(player); // Immediately, then every 1s
        intervalId = setInterval(() => setPlayerCurrentState(player), 1000);
      });

      player.addListener("not_ready", () => {
        dispatch(playerNotReady());
        if (intervalId) clearInterval(intervalId);
      });

      // Error handling
      player.addListener("autoplay_failed", () => {
        console.error(`Autoplay failed`);
      });
      player.addListener("initialization_error", ({ message }) => {
        console.error(`Initialization error: ${message}`);
      });
      player.addListener("authentication_error", ({ message }) => {
        console.error(`Authentication error: ${message}`);
      });
      player.addListener("account_error", ({ message }) => {
        console.error(`Account error: ${message}`);
      });
      player.addListener("playback_error", ({ message }) => {
        console.error(`Playback error: ${message}`);
      });

      player.addListener("player_state_changed", (state) => {
        dispatch(playbackStateChanged(state));
      });

      player.connect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPlayerCurrentState = (spotifyPlayer: Spotify.Player) => {
    spotifyPlayer
      .getCurrentState()
      .then((state: Spotify.PlaybackState | null) => {
        if (state) {
          dispatch(playbackStateChanged(state));
        }
      });
  };

  return player!;
};

export default useSpotifyWebPlayback;
