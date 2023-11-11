import { useEffect, useState } from "react";
import {
  SPOTIFY_ACCESS_TOKEN,
  SpotifyAccessToken,
} from "../../state/queries/models/spotify.models";

type SpotifyWebPlaybackContext = {
  player: Spotify.Player;
  ready: boolean;
  state: Spotify.PlaybackState | undefined;
};

// How can I return player from this hook so that it is of type Spotify.Player rather than Spotify.Player | undefined
const useSpotifyWebPlayback = (): SpotifyWebPlaybackContext => {
  const [ready, setReady] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [playerState, setPlayerState] = useState<
    Spotify.PlaybackState | undefined
  >(undefined);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
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
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", (instance: Spotify.WebPlaybackInstance) => {
        console.log("Ready with Device ID", instance.device_id);
        setReady(true);
      });

      player.addListener(
        "not_ready",
        (instance: Spotify.WebPlaybackInstance) => {
          console.log("Device ID has gone offline", instance.device_id);
          setReady(false);
        }
      );

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

      // I am using the Spotify Web Playback SDK and have the following code defined:
      // Why is nothing being emitted from this listener?
      player.addListener("player_state_changed", (state) => {
        console.log(state);
        setPlayerState(state);
      });

      player.connect();
    };
  }, []);

  return { player: player!, ready, state: playerState };
};

export default useSpotifyWebPlayback;
