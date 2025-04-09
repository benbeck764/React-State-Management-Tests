import { SpotifyRecommendationSeed, SpotifyTrack } from '@spotify-examples/spotify-models';

//#region Get Recommendations

export type GetRecommendationsRequest = {
  /**
   * The target size of the list of recommended tracks.
   * For seeds with unusually small pools or when highly restrictive filtering is applied,
   * it may be impossible to generate the requested number of recommended tracks.
   * Debugging information for such cases is available in the response.
   *
   * Default: 20. Minimum: 1. **Maximum: 100.**
   */
  limit?: number;
  market?: string;
  seed_artists?: string;
  seed_genres?: string;
  seed_tracks?: string;
  min_acousticness?: number;
  max_acousticness?: number;
  target_acousticness?: number;
  min_danceability?: number;
  max_danceability?: number;
  target_danceability?: number;
  min_duration_ms?: number;
  max_duration_ms?: number;
  target_duration_ms?: number;
  min_energy?: number;
  max_energy?: number;
  target_energy?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  target_instrumentalness?: number;
  min_key?: number;
  max_key?: number;
  target_key?: number;
  min_liveness?: number;
  max_liveness?: number;
  target_liveness?: number;
  min_loudness?: number;
  max_loudness?: number;
  target_loudness?: number;
  min_mode?: number;
  max_mode?: number;
  target_mode?: number;
  min_popularity?: number;
  max_popularity?: number;
  target_popularity?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  target_speechiness?: number;
  min_tempo?: number;
  max_tempo?: number;
  target_tempo?: number;
  min_time_signature?: number;
  max_time_signature?: number;
  target_time_signature?: number;
  min_valence?: number;
  max_valence?: number;
  target_valence?: number;
};

export type GetRecommendationsResponse = {
  seeds: SpotifyRecommendationSeed[];
  tracks: SpotifyTrack[];
};

//#endregion
