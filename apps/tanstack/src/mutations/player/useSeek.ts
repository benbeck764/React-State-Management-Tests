import { queryOptionsMap } from '@/queries/common/query-options-map';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { SpotifyPlaybackState } from 'node_modules/@spotify-examples/spotify-models/src/models/player';

type UseSeekProps = {
  position: number;
  deviceId?: string;
};

type UseSeekContext = {
  previousPlaybackState: SpotifyPlaybackState | undefined;
};

/**
 * A custom hook for seeking to a specific position in the playback on a Spotify player.
 * This is an optimistic mutation hook that updates the playback state immediately,
 * and rolls back the change if the mutation fails.
 *
 * @returns A mutation result object for the seek operation.
 */
export const useSeek = (): UseMutationResult<void, Error, UseSeekProps, UseSeekContext> => {
  const queryClient = useQueryClient();

  const getPlaybackStateQueryKey = queryOptionsMap.player.getPlaybackStateQuery().queryKey;

  return useMutation({
    mutationFn: async ({ position, deviceId }) =>
      spotifyApi.services.player.seekToPosition({ position_ms: position, device_id: deviceId }),
    onMutate: async ({ position }) => {
      await queryClient.cancelQueries({ queryKey: getPlaybackStateQueryKey });

      const previousPlaybackState = queryClient.getQueryData(getPlaybackStateQueryKey);

      queryClient.setQueryData(
        getPlaybackStateQueryKey,
        (prev: SpotifyPlaybackState | undefined) => {
          if (prev) return { ...prev, progress_ms: position };
        }
      );

      return { previousPlaybackState };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPlaybackState)
        queryClient.setQueryData(getPlaybackStateQueryKey, context.previousPlaybackState);
    }
  });
};
