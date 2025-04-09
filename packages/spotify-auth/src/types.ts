export type SpotifyAccessToken = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export type SpotifyAccessTokenWithExpiry = SpotifyAccessToken & {
  expires_at: number; // Absolute expiration time in milliseconds
};

export type AppState = { returnTo?: string };
