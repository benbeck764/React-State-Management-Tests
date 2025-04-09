import { getAlbumQuery, getAlbumTracksQuery, getSeveralAlbumsQuery } from '@/queries/album.queries';
import {
  getArtistQuery,
  getSeveralArtistsQuery,
  getArtistTopTracksQuery
} from '@/queries/artist.queries';
import {
  createQueryOptions,
  mergeQueryOptions
} from '@/queries/common/config/query-options-factory';
import {
  getPlaybackStateQuery,
  getAvailableDevicesQuery,
  getCurrentlyPlayingTrackQuery
} from '@/queries/player.queries';
import { getRecommendationsQuery, getTrackQuery } from '@/queries/track.queries';
import { userProfileQuery, userTopArtistsQuery, userTopTracksQuery } from '@/queries/user.queries';

export const queryOptionsMap = mergeQueryOptions(
  createQueryOptions('album', {
    getAlbumQuery,
    getSeveralAlbumsQuery,
    getAlbumTracksQuery
  }),
  createQueryOptions('artist', {
    getArtistQuery,
    getSeveralArtistsQuery,
    getArtistTopTracksQuery
  }),
  createQueryOptions('player', {
    getPlaybackStateQuery,
    getAvailableDevicesQuery,
    getCurrentlyPlayingTrackQuery
  }),
  createQueryOptions('track', {
    getTrackQuery,
    getRecommendationsQuery
  }),
  createQueryOptions('user', {
    userProfileQuery,
    userTopArtistsQuery,
    userTopTracksQuery
  })
);
