import { AxiosHeaders } from "axios";
import ApiService from "./common/api.service";
import { endpoints } from "./common/endpoints";
import {
  GetUserTopItemsRequest,
  SPOTIFY_ACCESS_TOKEN,
  SPOTIFY_VERIFIER_CODE,
  SpotifyAccessToken,
} from "./models/spotify.models";
import { ServiceResult } from "./models/api-shared.models";

class SpotifyService extends ApiService {
  private static classInstance: SpotifyService;

  public getToken = async (code: string): Promise<void> => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    if (!clientId) throw new Error("Missing Spotify Client ID");

    const codeVerifier = localStorage.getItem(SPOTIFY_VERIFIER_CODE);
    if (!codeVerifier) return;

    const headers = new AxiosHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    const response = await this.post<SpotifyAccessToken>(
      endpoints.spotify.token,
      new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: window.location.origin, // validates against original redirect_uri
        code_verifier: codeVerifier,
      }),
      headers
    );

    localStorage.setItem(SPOTIFY_ACCESS_TOKEN, JSON.stringify(response.data));
    window.location.href = window.location.origin;
  };

  public getMyTopItems = async (
    request: GetUserTopItemsRequest
  ): ServiceResult<void> => {
    return this.get(endpoints.spotify.me.topArtists, request);
  };

  static getInstance(): SpotifyService {
    if (!this.classInstance) {
      this.classInstance = new SpotifyService();
    }
    return this.classInstance;
  }
}

export default SpotifyService;
