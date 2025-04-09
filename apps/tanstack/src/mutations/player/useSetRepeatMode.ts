import { queryOptionsMap } from '@/queries/common/query-options-map';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { SpotifyPlaybackState } from 'node_modules/@spotify-examples/spotify-models/src/models/player';

type UseSetRepeatModeProps = {
  repeatState: SpotifyPlaybackState['repeat_state'];
  deviceId?: string;
};

type UseSetRepeatModePropsContext = {
  previousPlaybackState: SpotifyPlaybackState | undefined;
};

/**
 * A custom hook for setting Spotify Player repeat mode.
 * This is an optimistic mutation hook that updates the playback state immediately,
 * and rolls back the change if the mutation fails.
 *
 * @returns A mutation result object for the repeat mode operation.
 */
export const useSetRepeatMode = (): UseMutationResult<
  void,
  Error,
  UseSetRepeatModeProps,
  UseSetRepeatModePropsContext
> => {
  const queryClient = useQueryClient();

  const getPlaybackStateQueryKey = queryOptionsMap.player.getPlaybackStateQuery().queryKey;

  return useMutation({
    mutationFn: async ({ repeatState, deviceId }) =>
      spotifyApi.services.player.setRepeatMode({ state: repeatState, device_id: deviceId }),
    onMutate: async ({ repeatState }) => {
      await queryClient.cancelQueries({ queryKey: getPlaybackStateQueryKey });

      const previousPlaybackState = queryClient.getQueryData(getPlaybackStateQueryKey);

      queryClient.setQueryData(
        getPlaybackStateQueryKey,
        (prev: SpotifyPlaybackState | undefined) => {
          if (prev) return { ...prev, repeat_state: repeatState };
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
