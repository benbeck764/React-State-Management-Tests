import { addInterceptor, removeInterceptor } from './services/inteceptor.manager';
import * as album from './services/album/album.service';
import * as artist from './services/artist/artist.service';
import * as player from './services/player/player.service';
import * as track from './services/track/track.service';
import * as user from './services/user/user.service';

// Spotify API (Services & Interceptors)
export { type Interceptor } from './services/inteceptor.manager';

export * from './services/album/album.service.types';
export * from './services/artist/artist.service.types';
export * from './services/player/player.service.types';
export * from './services/track/track.service.types';
export * from './services/user/user.service.types';

export type SpotifyAPI = {
  services: {
    album: typeof album;
    artist: typeof artist;
    player: typeof player;
    track: typeof track;
    user: typeof user;
  };
  interceptors: {
    request: {
      add: typeof addInterceptor;
      remove: typeof removeInterceptor;
    };
  };
};

export const spotifyApi: SpotifyAPI = {
  services: {
    album,
    artist,
    player,
    track,
    user
  },
  interceptors: {
    request: {
      add: addInterceptor,
      remove: removeInterceptor
    }
  }
};
