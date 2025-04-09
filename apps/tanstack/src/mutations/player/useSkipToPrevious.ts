import { queryOptionsMap } from '@/queries/common/query-options-map';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

type UseSkipToPreviousProps = {
  deviceId?: string;
};

/**
 * A custom hook for skipping to the previous track in the Spotify queue.
 *
 * @returns A mutation result object for the skip operation.
 */
export const useSkipToPrevious = (): UseMutationResult<void, Error, UseSkipToPreviousProps> => {
  const queryClient = useQueryClient();

  const getPlaybackStateQueryKey = queryOptionsMap.player.getPlaybackStateQuery().queryKey;

  return useMutation({
    mutationFn: async ({ deviceId }) =>
      spotifyApi.services.player.skipToPrevious({ device_id: deviceId }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getPlaybackStateQueryKey });
    }
  });
};
