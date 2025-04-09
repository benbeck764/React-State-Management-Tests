import { queryOptionsMap } from '@/queries/common/query-options-map';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { SpotifyPlaybackState } from 'node_modules/@spotify-examples/spotify-models/src/models/player';

type UsePauseProps = {
  deviceId?: string;
};

type UsePausePropsContext = {
  previousPlaybackState: SpotifyPlaybackState | undefined;
};

/**
 * A custom hook for pausing playback on a Spotify player.
 * This is an optimistic mutation hook that updates the playback state immediately,
 * and rolls back the change if the mutation fails.
 *
 * @returns A mutation result object for the pause operation.
 */
export const usePause = (): UseMutationResult<void, Error, UsePauseProps, UsePausePropsContext> => {
  const queryClient = useQueryClient();

  const getPlaybackStateQueryKey = queryOptionsMap.player.getPlaybackStateQuery().queryKey;

  return useMutation({
    mutationFn: async ({ deviceId }) =>
      spotifyApi.services.player.pausePlayback({ device_id: deviceId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: getPlaybackStateQueryKey });

      const previousPlaybackState = queryClient.getQueryData(getPlaybackStateQueryKey);

      queryClient.setQueryData(
        getPlaybackStateQueryKey,
        (prev: SpotifyPlaybackState | undefined) => {
          if (prev) return { ...prev, is_playing: false };
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
