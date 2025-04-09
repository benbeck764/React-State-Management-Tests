import { createQueryKey } from '@/queries/common/config/query-options-factory';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { SpotifyDevice, SpotifyPlaybackState } from '@spotify-examples/spotify-models';
import { queryOptions } from '@tanstack/react-query';

//#region Queries

export const getPlaybackStateQuery = () =>
  queryOptions<SpotifyPlaybackState, Error>({
    queryKey: createQueryKey('player.get-playback-state'),
    queryFn: async () => await spotifyApi.services.player.getPlaybackState()
  });

export const getAvailableDevicesQuery = () =>
  queryOptions<SpotifyDevice[], Error>({
    queryKey: createQueryKey('player.get-available-devices'),
    queryFn: async () => {
      const { devices } = await spotifyApi.services.player.getAvailableDevices();
      return devices;
    }
  });

export const getCurrentlyPlayingTrackQuery = () =>
  queryOptions<SpotifyPlaybackState, Error>({
    queryKey: createQueryKey('player.get-currently-playing'),
    queryFn: async () => await spotifyApi.services.player.getCurrentlyPlayingTrack()
  });

//#endregion
