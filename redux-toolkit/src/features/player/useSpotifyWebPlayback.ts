import { useEffect, useState } from "react";
import {
  SPOTIFY_ACCESS_TOKEN,
  SpotifyAccessToken,
} from "../../state/queries/models/spotify.models";

type SpotifyWebPlaybackContext = {
  player: Spotify.Player;
  ready: boolean;
  state: Spotify.PlaybackState | undefined;
  deviceId: string | undefined;
};

// How can I return player from this hook so that it is of type Spotify.Player rather than Spotify.Player | undefined
const useSpotifyWebPlayback = (): SpotifyWebPlaybackContext => {
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [ready, setReady] = useState<boolean>(false);
  const [playerState, setPlayerState] = useState<
    Spotify.PlaybackState | undefined
  >(undefined);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);

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
        setReady(true);
        setDeviceId(instance.device_id);

        intervalId = setInterval(() => {
          player
            .getCurrentState()
            .then((state: Spotify.PlaybackState | null) => {
              if (state) {
                setPlayerState(state);
              }
            });
        }, 1000);
      });

      player.addListener("not_ready", () => {
        setReady(false);
        setDeviceId(undefined);
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
        setPlayerState(state);
      });

      player.connect();
    };
  }, []);

  return { player: player!, ready, state: playerState, deviceId };
};

export default useSpotifyWebPlayback;
