export const endpoints = {
  spotify: {
    base: "https://api.spotify.com/v1/",
    auth: "https://accounts.spotify.com/authorize",
    token: "https://accounts.spotify.com/api/token",
    me: {
      profile: "me",
      topArtists: "me/top/artists",
      topTracks: "me/top/tracks",
      devices: "me/player/devices",
      pause: "me/player/pause",
      play: "me/player/play",
      player: "me/player",
      next: "me/player/next",
      previous: "me/player/previous",
      repeat: "me/player/repeat",
      seek: "me/player/seek",
      shuffle: "me/player/shuffle",
      volume: "me/player/volume",
      albums: "me/albums",
      checkSavedAlbums: "me/albums/contains",
      tracks: "me/tracks",
      checkSavedTracks: "me/tracks/contains",
      currentlyPlaying: "me/player/currently-playing",
      recentlyPlayed: "me/player/recently-played",
    },
    artists: {
      all: "artists",
      byId: (artistId: string) => `artists/${artistId}`,
      albums: (artistId: string) => `artists/${artistId}/albums`,
      topTracks: (artistId: string) => `artists/${artistId}/top-tracks`,
      relatedArtists: (artistId: string) =>
        `artists/${artistId}/related-artists`,
    },
    albums: {
      all: "albums",
      byId: (albumId: string) => `albums/${albumId}`,
      tracks: (albumId: string) => `albums/${albumId}/tracks`,
    },
    tracks: {
      recommendations: "recommendations",
      byId: (trackId: string) => `tracks/${trackId}`,
    },
    search: "search",
  },
  // Genius API uses Vite proxy server to handle issues with CORS
  genius: {
    base: "http://localhost:5173/api/",
    search: "search",
    songs: {
      byId: (songId: number) => `songs/${songId}`,
    },
  },
};
