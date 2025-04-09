import { queryOptionsMap } from '@/queries/common/query-options-map';
import { spotifyApi } from '@spotify-examples/spotify-api';
import { UseMutationResult, useMutation, useQueryClient } from '@tanstack/react-query';
import { SpotifyPlaybackState } from 'node_modules/@spotify-examples/spotify-models/src/models/player';

type UseSetVolumeProps = {
  volume: number;
  deviceId?: string;
};

type UseSetVolumePropsContext = {
  previousPlaybackState: SpotifyPlaybackState | undefined;
};

/**
 * A custom hook for setting Spotify Player volume.
 * This is an optimistic mutation hook that updates the playback state immediately,
 * and rolls back the change if the mutation fails.
 *
 * @returns A mutation result object for the volume operation.
 */
export const useSetVolume = (): UseMutationResult<
  void,
  Error,
  UseSetVolumeProps,
  UseSetVolumePropsContext
> => {
  const queryClient = useQueryClient();

  const getPlaybackStateQueryKey = queryOptionsMap.player.getPlaybackStateQuery().queryKey;

  return useMutation({
    mutationFn: async ({ volume, deviceId }) => {
      return spotifyApi.services.player.setPlaybackVolume({
        volume_percent: volume,
        device_id: deviceId
      });
    },
    onMutate: async ({ volume }) => {
      await queryClient.cancelQueries({ queryKey: getPlaybackStateQueryKey });

      const previousPlaybackState = queryClient.getQueryData(getPlaybackStateQueryKey);

      queryClient.setQueryData(
        getPlaybackStateQueryKey,
        (prev: SpotifyPlaybackState | undefined) => {
          if (prev) return { ...prev, volume };
        }
      );

      return { previousPlaybackState };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousPlaybackState)
        queryClient.setQueryData(getPlaybackStateQueryKey, context.previousPlaybackState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getPlaybackStateQueryKey });
    }
  });
};
