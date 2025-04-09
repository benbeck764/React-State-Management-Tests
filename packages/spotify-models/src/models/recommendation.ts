export type SpotifyRecommendationSeed = {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: 'artist' | 'track' | 'genre';
};
