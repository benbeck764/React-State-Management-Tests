import { useEffect, useState } from "react";
import {
  SPOTIFY_ACCESS_TOKEN,
  SpotifyAccessToken,
} from "../../state/queries/models/spotify.models";
import { useDispatch } from "react-redux";
import { playbackState } from "../../state/slices/player.slice";

type SpotifyWebPlaybackContext = {
  player: Spotify.Player;
  ready: boolean;
  state: Spotify.PlaybackState | undefined;
  deviceId: string | undefined;
};

const useSpotifyWebPlayback = (): SpotifyWebPlaybackContext => {
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [ready, setReady] = useState<boolean>(false);
  const [playerState, setPlayerState] = useState<
    Spotify.PlaybackState | undefined
  >(undefined);
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined);
  const dispatch = useDispatch();

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

        setPlayerCurrentState(player); // Immediately, then every 1s
        intervalId = setInterval(() => setPlayerCurrentState(player), 1000);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPlayerCurrentState = (spotifyPlayer: Spotify.Player) => {
    spotifyPlayer
      .getCurrentState()
      .then((state: Spotify.PlaybackState | null) => {
        if (state) {
          setPlayerState(state);
          dispatch(playbackState(state));
        }
      });
  };

  return { player: player!, ready, state: playerState, deviceId };
};

export default useSpotifyWebPlayback;
