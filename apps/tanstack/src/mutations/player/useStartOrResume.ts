import { queryOptionsMap } from '@/queries/common/query-options-map';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { SpotifyPlaybackState } from '@spotify-examples/spotify-models';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';

type UseStartOrResumeProps = {
  deviceId?: string;
};

type UseStartOrResumeContext = {
  previousPlaybackState: SpotifyPlaybackState | undefined;
};

/**
 * A custom hook for starting or resuming playback on a Spotify player.
 * This is an optimistic mutation hook that updates the playback state immediately,
 * and rolls back the change if the mutation fails.
 *
 * @returns A mutation result object for the start or resume operation.
 */
export const useStartOrResume = (): UseMutationResult<
  void,
  Error,
  UseStartOrResumeProps,
  UseStartOrResumeContext
> => {
  const queryClient = useQueryClient();

  const getPlaybackStateQueryKey = queryOptionsMap.player.getPlaybackStateQuery().queryKey;

  return useMutation({
    mutationFn: async ({ deviceId }) =>
      spotifyApi.services.player.startOrResumePlayback({ device_id: deviceId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: getPlaybackStateQueryKey });

      const previousPlaybackState = queryClient.getQueryData(getPlaybackStateQueryKey);

      queryClient.setQueryData(
        getPlaybackStateQueryKey,
        (prev: SpotifyPlaybackState | undefined) => {
          if (prev) return { ...prev, is_playing: true };
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
