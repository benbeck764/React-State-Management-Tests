import { queryOptionsMap } from '@/queries/common/query-options-map';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { SpotifyPlaybackState } from 'node_modules/@spotify-examples/spotify-models/src/models/player';

type UseTransferPlaybackProps = {
  deviceId: string;
  play?: boolean;
};

type UseTransferPlaybackPropsContext = {
  previousPlaybackState: SpotifyPlaybackState | undefined;
};

/**
 * A custom hook for transferring Spotify Player playback to a new device.
 *
 * @returns A mutation result object for the transfer operation.
 */
export const useTransferPlayback = (): UseMutationResult<
  void,
  Error,
  UseTransferPlaybackProps,
  UseTransferPlaybackPropsContext
> => {
  const queryClient = useQueryClient();

  const getPlaybackStateQueryKey = queryOptionsMap.player.getPlaybackStateQuery().queryKey;
  const getDevicesQueryKey = queryOptionsMap.player.getAvailableDevicesQuery().queryKey;

  return useMutation({
    mutationFn: async ({ deviceId, play }) =>
      spotifyApi.services.player.transferPlayback({ device_ids: [deviceId], play }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getPlaybackStateQueryKey });
      queryClient.invalidateQueries({ queryKey: getDevicesQueryKey });
    }
  });
};
