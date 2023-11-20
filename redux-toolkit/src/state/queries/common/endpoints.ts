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
      currentlyPlaying: "me/player/currently-playing",
      recentlyPlayed: "me/player/recently-played",
    },
    artists: {
      byId: (artistId: string) => `artists/${artistId}`,
      albums: (artistId: string) => `artists/${artistId}/albums`,
      topTracks: (artistId: string) => `artists/${artistId}/top-tracks`,
    },
    albums: {
      all: "albums",
      byId: (albumId: string) => `albums/${albumId}`,
      tracks: (albumId: string) => `albums/${albumId}/tracks`,
    },
  },
};
