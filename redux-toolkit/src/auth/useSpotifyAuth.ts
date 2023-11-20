import { useEffect, useState } from "react";
import { endpoints } from "../state/queries/common/endpoints";
import {
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_VERIFIER_CODE,
  SpotifyAccessToken,
} from "../state/queries/models/spotify.models";
import axios, { AxiosHeaders } from "axios";

type SpotifyAuthContext = {
  isAuthenticated: boolean;
  loginWithRedirect: () => Promise<void>;
};

export const useSpotifyAuth = (): SpotifyAuthContext => {
  const token = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
  const [isAuthenticated] = useState<boolean>(token !== null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) getAccessToken(code);
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

    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-read-recently-played",
      "user-read-playback-state",
      "user-top-read",
      "user-library-read",
      "user-library-modify",
      "user-modify-playback-state",
      "streaming",
    ];

    const authUrl = new URL(endpoints.spotify.auth);

    const params: Record<string, string> = {
      response_type: "code",
      client_id: clientId,
      scope: scopes.join(" "),
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: window.location.origin,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  const getAccessToken = async (code: string) => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    if (!clientId) throw new Error("Missing Spotify Client ID");

    const codeVerifier = localStorage.getItem(SPOTIFY_VERIFIER_CODE);
    if (!codeVerifier) return;

    const headers = new AxiosHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    const response = await axios.post<SpotifyAccessToken>(
      endpoints.spotify.token,
      new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: window.location.origin, // validates against original redirect_uri
        code_verifier: codeVerifier,
      }),
      { headers }
    );

    localStorage.setItem(SPOTIFY_ACCESS_TOKEN, JSON.stringify(response.data));
    window.location.href = window.location.origin;
  };

  return { isAuthenticated, loginWithRedirect };
};
