import { queryOptionsMap } from '@/queries/common/query-options-map';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

type UseSkipToNextProps = {
  deviceId?: string;
};

/**
 * A custom hook for skipping to the next track in the Spotify queue.
 *
 * @returns A mutation result object for the skip operation.
 */
export const useSkipToNext = (): UseMutationResult<void, Error, UseSkipToNextProps> => {
  const queryClient = useQueryClient();

  const getPlaybackStateQueryKey = queryOptionsMap.player.getPlaybackStateQuery().queryKey;

  return useMutation({
    mutationFn: async ({ deviceId }) =>
      spotifyApi.services.player.skipToNext({ device_id: deviceId }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getPlaybackStateQueryKey });
    }
  });
};
