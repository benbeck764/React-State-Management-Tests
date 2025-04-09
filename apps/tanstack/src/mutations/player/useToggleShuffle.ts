import { queryOptionsMap } from '@/queries/common/query-options-map';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { SpotifyPlaybackState } from 'node_modules/@spotify-examples/spotify-models/src/models/player';

type UseToggleShuffleProps = {
  shuffleState: boolean;
  deviceId?: string;
};

type UseToggleShufflePropsContext = {
  previousPlaybackState: SpotifyPlaybackState | undefined;
};

/**
 * A custom hook for toggling Spotify Player shuffle state.
 * This is an optimistic mutation hook that updates the playback state immediately,
 * and rolls back the change if the mutation fails.
 *
 * @returns A mutation result object for the shuffle operation.
 */
export const useToggleShuffle = (): UseMutationResult<
  void,
  Error,
  UseToggleShuffleProps,
  UseToggleShufflePropsContext
> => {
  const queryClient = useQueryClient();

  const getPlaybackStateQueryKey = queryOptionsMap.player.getPlaybackStateQuery().queryKey;

  return useMutation({
    mutationFn: async ({ shuffleState, deviceId }) =>
      spotifyApi.services.player.togglePlaybackShuffle({
        state: shuffleState,
        device_id: deviceId
      }),
    onMutate: async ({ shuffleState }) => {
      await queryClient.cancelQueries({ queryKey: getPlaybackStateQueryKey });

      const previousPlaybackState = queryClient.getQueryData(getPlaybackStateQueryKey);

      queryClient.setQueryData(
        getPlaybackStateQueryKey,
        (prev: SpotifyPlaybackState | undefined) => {
          if (prev) return { ...prev, shuffle_state: shuffleState };
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
