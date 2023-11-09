import { useEffect, useState } from "react";
import { endpoints } from "../services/common/endpoints";
import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_VERIFIER_CODE,
} from "../services/models/spotify.models";
import SpotifyService from "../services/spotify.service";

type SpotifyAuthContext = {
  isAuthenticated: boolean;
  loginWithRedirect: () => Promise<void>;
};

export const useSpotifyAuth = (): SpotifyAuthContext => {
  const spotifyService = SpotifyService.getInstance();
  const token = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
  const [isAuthenticated] = useState<boolean>(token !== null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) spotifyService.getToken(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search]);

  const generateRandomString = (length: number) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };

  const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const loginWithRedirect = async (): Promise<void> => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    if (!clientId) throw new Error("Missing Spotify Client ID");

    if (localStorage.getItem(SPOTIFY_VERIFIER_CODE) !== null) return;

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    localStorage.setItem(SPOTIFY_VERIFIER_CODE, codeVerifier);

    const scope = "user-read-private user-read-email user-top-read";
    const authUrl = new URL(endpoints.spotify.auth);

    const params: Record<string, string> = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: window.location.origin,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  return { isAuthenticated, loginWithRedirect };
};
