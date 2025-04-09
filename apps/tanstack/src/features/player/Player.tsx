import { FC, useCallback, useEffect, useMemo } from 'react';
import {
  getAvailableDevicesQuery,
  getCurrentlyPlayingTrackQuery,
  getPlaybackStateQuery
} from '@/queries/player.queries';
import { useQuery } from '@tanstack/react-query';
import SpotifyPlayer from '@/features/player/SpotifyPlayer';
import { usePause } from '@/mutations/player/usePause';
import { useSeek } from '@/mutations/player/useSeek';
import { useSkipToNext } from '@/mutations/player/useSkipToNext';
import { useSkipToPrevious } from '@/mutations/player/useSkipToPrevious';
import { useStartOrResume } from '@/mutations/player/useStartOrResume';
import { useToggleShuffle } from '@/mutations/player/useToggleShuffle';
import { useSetRepeatMode } from '@/mutations/player/useSetRepeatMode';
import { SpotifyDevice, SpotifyPlaybackState } from '@spotify-examples/spotify-models';
import { debounce } from '@spotify-examples/utilities';
import { useSetVolume } from '@/mutations/player/useSetVolume';
import { useTransferPlayback } from '@/mutations/player/useTransferPlayback';
import { useSpotifyPlayer } from '@/features/player/SpotifyPlayerProvider';

const Player: FC = () => {
  //const { thisDeviceId, player } = useSpotifyWebPlayback();
  const { thisDeviceId, player } = useSpotifyPlayer() ?? {};

  // Data
  const {
    data: devices,
    isPending: pendingDevices,
    isFetching: fetchingDevices,
    refetch: refetchDevices
  } = useQuery(getAvailableDevicesQuery());

  const { data: playbackState, isPending: pendingPlaybackState } = useQuery({
    ...getPlaybackStateQuery(),
    refetchInterval: 1000,
    enabled: !!thisDeviceId
  });

  const { data: currentlyPlayingTrack } = useQuery({
    ...getCurrentlyPlayingTrackQuery(),
    enabled: !!thisDeviceId
  });

  // Controls
  const { mutate: startOrResume } = useStartOrResume();
  const { mutate: skipToNext } = useSkipToNext();
  const { mutate: skipToPrevious } = useSkipToPrevious();
  const { mutate: pause } = usePause();
  const { mutate: seek } = useSeek();
  const { mutate: setRepeatMode } = useSetRepeatMode();
  const { mutate: setVolume } = useSetVolume();
  const { mutate: toggleShuffle } = useToggleShuffle();
  const { mutate: transferPlayback } = useTransferPlayback();

  const currentDevice = playbackState?.device;
  const currentDeviceId = currentDevice?.id ?? undefined;
  const activeDevices = devices ? !!devices.find((d: SpotifyDevice) => d.is_active) : null;
  const thisDeviceActive = !!player && currentDevice?.id === thisDeviceId;

  const loading = pendingDevices || pendingPlaybackState;

  // One function to allow a shared debounce
  const handleStartOrResumeOrPause = useMemo(
    () =>
      debounce((command: 'start' | 'resume' | 'pause') => {
        if (command === 'start' || command === 'resume') {
          startOrResume({ deviceId: currentDeviceId });
        } else {
          pause({ deviceId: currentDeviceId });
        }
      }, 200),
    [currentDeviceId]
  );

  const handleSkipToNext = useMemo(
    () =>
      debounce(() => {
        skipToNext({ deviceId: currentDeviceId });
      }, 200),
    [currentDeviceId]
  );

  const handleVolumeChange = useCallback(
    (volume: number) => {
      if (thisDeviceActive) player.setVolume(volume / 100);
      else debouncedHandleVolumeChange(volume);
    },
    [thisDeviceActive, currentDeviceId]
  );

  const debouncedHandleVolumeChange = useMemo(
    () =>
      debounce(
        (volume: number) => {
          setVolume({ volume, deviceId: currentDeviceId });
        },
        200,
        { leading: true, trailing: true }
      ),
    [thisDeviceActive, currentDeviceId]
  );

  const handleSkipToPrevious = useMemo(
    () =>
      debounce(() => {
        skipToPrevious({ deviceId: currentDeviceId });
      }, 200),
    [currentDeviceId]
  );

  const handleSeek = useCallback(
    (ms: number) => {
      if (thisDeviceActive) player.seek(ms);
      else seek({ position: ms, deviceId: currentDeviceId });
    },
    [thisDeviceActive, currentDeviceId]
  );

  const handleSetRepeatMode = useMemo(
    () =>
      debounce(
        (repeatState: SpotifyPlaybackState['repeat_state']) =>
          setRepeatMode({ repeatState, deviceId: currentDeviceId }),
        200
      ),
    [currentDeviceId]
  );

  const handleToggleShuffle = useMemo(
    () =>
      debounce(
        (shuffleState: boolean) => toggleShuffle({ shuffleState, deviceId: currentDeviceId }),
        200
      ),
    [currentDeviceId]
  );

  const handleTransferPlayback = useMemo(
    () =>
      debounce((deviceId: string, play: boolean) => {
        transferPlayback({ deviceId, play });
      }, 200),
    [transferPlayback]
  );

  const handleDevicesRefresh = useMemo(
    () =>
      debounce(() => {
        refetchDevices();
      }, 200),
    [refetchDevices]
  );

  /**
   * Auto transfer playback to the current device if no other devices are active.
   */
  useEffect(() => {
    if (activeDevices === false && thisDeviceId)
      transferPlayback({ deviceId: thisDeviceId, play: false });
  }, [activeDevices, thisDeviceId, transferPlayback]);

  return (
    <SpotifyPlayer
      loading={loading}
      thisDeviceId={thisDeviceId}
      devices={devices}
      fetchingDevices={fetchingDevices}
      playbackState={playbackState}
      currentlyPlayingTrack={currentlyPlayingTrack}
      onStartOrResume={() => handleStartOrResumeOrPause('start')}
      onPause={() => handleStartOrResumeOrPause('pause')}
      onSkipToNext={handleSkipToNext}
      onSkipToPrevious={handleSkipToPrevious}
      onSeek={handleSeek}
      onSetRepeatMode={handleSetRepeatMode}
      onVolumeChange={handleVolumeChange}
      onToggleShuffle={handleToggleShuffle}
      onDeviceChange={handleTransferPlayback}
      onDevicesRefresh={handleDevicesRefresh}
    />
  );
};

export default Player;
