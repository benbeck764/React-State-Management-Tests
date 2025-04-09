import { FC, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { SpotifyScrollingContainer } from '@spotify-examples/components';
import {
  StyledPlayerWrapper,
  StyledPlayerContainer,
  StyledPlayingOnOtherDeviceWrapper,
  StyledPlayerButton
} from '@/features/player/Player.styles';
import {
  SpotifyDevice,
  SpotifyPlaybackState,
  SpotifyTrack
} from '@spotify-examples/spotify-models';
import PlayerTrackPosition from '@/features/player/components/PlayerTrackPosition';
import PlayerVolume from '@/features/player/components/PlayerVolume';
import DeviceMenu from '@/features/player/components/DeviceMenu/DeviceMenu';

type SpotifyPlayerProps = {
  loading: boolean;
  thisDeviceId: string | undefined;
  devices: SpotifyDevice[] | undefined;
  fetchingDevices: boolean;
  playbackState: SpotifyPlaybackState | undefined;
  currentlyPlayingTrack: SpotifyPlaybackState | undefined;
  onStartOrResume: () => void;
  onPause: () => void;
  onSkipToNext: () => void;
  onSkipToPrevious: () => void;
  onSeek: (ms: number) => void;
  onSetRepeatMode: (repeatState: SpotifyPlaybackState['repeat_state']) => void;
  onVolumeChange: (volume: number) => void;
  onToggleShuffle: (shuffleState: boolean) => void;
  onDeviceChange: (deviceId: string) => void;
  onDevicesRefresh: () => void;
};

const SpotifyPlayer: FC<SpotifyPlayerProps> = (props: SpotifyPlayerProps) => {
  const {
    thisDeviceId,
    devices,
    fetchingDevices,
    playbackState,
    currentlyPlayingTrack,
    onPause,
    onSkipToNext,
    onSkipToPrevious,
    onStartOrResume,
    onSeek,
    onSetRepeatMode,
    onVolumeChange,
    onToggleShuffle,
    onDeviceChange,
    onDevicesRefresh
  } = props;

  const currentDevice = playbackState?.device;
  const hasActiveDevice = !!(currentDevice ?? devices?.find((d: SpotifyDevice) => d.is_active));
  const isActiveDevice = currentDevice?.id === thisDeviceId;
  const playingOnOtherDevice = hasActiveDevice !== undefined && !isActiveDevice;

  // [TODO]: Do this for now, implement Episodes later?
  // [TODO]: Why do I need both of these endpoints....?
  const item = (playbackState?.item as SpotifyTrack) ?? currentlyPlayingTrack?.item;

  const handleStartOrResume = onStartOrResume;
  const handlePause = onPause;
  const handleSkipToNext = onSkipToNext;
  const handleSkipToPrevious = onSkipToPrevious;
  const handleSeek = onSeek;

  const handleSetRepeatMode = useCallback(() => {
    if (playbackState) {
      if (playbackState.repeat_state === 'off') {
        onSetRepeatMode('context');
      } else if (playbackState.repeat_state === 'context') {
        onSetRepeatMode('track');
      } else if (playbackState.repeat_state === 'track') {
        onSetRepeatMode('off');
      }
    }
  }, [playbackState, onSetRepeatMode]);

  const handleVolumeChange = onVolumeChange;

  const handleToggleShuffle = useCallback(() => {
    if (playbackState) onToggleShuffle(!playbackState.shuffle_state);
  }, [playbackState, onToggleShuffle]);

  return (
    <StyledPlayerWrapper playingOnOtherDevice={playingOnOtherDevice}>
      <StyledPlayerContainer playingOnOtherDevice={playingOnOtherDevice}>
        {item && (
          <Grid container height="100%" alignItems="center">
            <Grid item xs={4}>
              <Stack direction="row" alignItems="center" justifyContent="flex-start" gap={2}>
                {/* <AppLink to={getAlbumUrl(item.album.uri.split(':')[2])} state={item.album}> */}
                <Avatar
                  variant="rounded"
                  src={item.album.images[0].url}
                  sx={{ width: 57.5, height: 57.5 }}
                />
                {/* </AppLink> */}
                <Stack maxWidth={370} sx={{ overflow: 'hidden' }}>
                  <SpotifyScrollingContainer>
                    {/* <AppLink to={getTrackUrl(item.id)} state={item}> */}
                    <Typography variant="paragraph" sx={{ textWrap: 'nowrap' }}>
                      {item.name}
                    </Typography>
                    {/* </AppLink> */}
                  </SpotifyScrollingContainer>

                  <SpotifyScrollingContainer>
                    <Stack direction="row" gap={0.5}>
                      {item.artists.map((artist, artistIndex: number) => (
                        // <AppLink
                        //   key={artist.uri}
                        //   to={getArtistUrl(artist.uri.split(':')[2])}
                        //   state={artist}
                        //   sx={{ display: 'inline-block' }}
                        // >
                        <Typography
                          variant="paragraphExtraSmall"
                          sx={{
                            color: (theme) => theme.palette.grey[400]
                          }}
                        >
                          {artist.name}
                          {artistIndex < item.artists.length - 1 && ','}
                        </Typography>
                        // </AppLink>
                      ))}
                    </Stack>
                  </SpotifyScrollingContainer>
                </Stack>
                {/* <FavoriteButton type="track" itemId={item.id} size="small" /> */}
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack gap={0.5}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  gap={1.5}
                >
                  <StyledPlayerButton onClick={handleToggleShuffle}>
                    <ShuffleIcon
                      sx={{
                        fontSize: '20px',
                        color: (theme) =>
                          playbackState?.shuffle_state === true
                            ? theme.palette.primary.main
                            : theme.palette.grey[300],
                        '&:hover': {
                          color: (theme) =>
                            playbackState?.shuffle_state === true
                              ? theme.palette.primary.dark
                              : theme.palette.text.primary
                        }
                      }}
                    />
                  </StyledPlayerButton>

                  <StyledPlayerButton onClick={handleSkipToPrevious}>
                    <SkipPreviousIcon
                      sx={{
                        fontSize: '26px',
                        color: (theme) => theme.palette.grey[300],
                        '&:hover': { color: (theme) => theme.palette.text.primary }
                      }}
                    />
                  </StyledPlayerButton>

                  {playbackState?.is_playing ? (
                    <StyledPlayerButton onClick={handlePause}>
                      <PauseCircleIcon
                        sx={{ fontSize: '40px', color: (theme) => theme.palette.text.primary }}
                      />
                    </StyledPlayerButton>
                  ) : (
                    <StyledPlayerButton onClick={handleStartOrResume}>
                      <PlayCircleIcon
                        sx={{ fontSize: '40px', color: (theme) => theme.palette.text.primary }}
                      />
                    </StyledPlayerButton>
                  )}

                  <StyledPlayerButton onClick={handleSkipToNext}>
                    <SkipNextIcon
                      sx={{
                        fontSize: '26px',
                        color: (theme) => theme.palette.grey[300],
                        '&:hover': { color: (theme) => theme.palette.text.primary }
                      }}
                    />
                  </StyledPlayerButton>

                  <StyledPlayerButton onClick={handleSetRepeatMode}>
                    {(playbackState?.repeat_state === 'off' ||
                      playbackState?.repeat_state === 'context') && (
                      <RepeatIcon
                        sx={{
                          fontSize: '20px',
                          color: (theme) =>
                            playbackState?.repeat_state === 'off'
                              ? theme.palette.grey[300]
                              : theme.palette.primary.main,
                          '&:hover': {
                            color: (theme) =>
                              playbackState?.repeat_state === 'off'
                                ? theme.palette.text.primary
                                : theme.palette.primary.dark
                          }
                        }}
                      />
                    )}
                    {playbackState?.repeat_state === 'track' && (
                      <RepeatOneIcon
                        sx={{
                          fontSize: '20px',
                          color: (theme) => theme.palette.primary.main,
                          '&:hover': {
                            color: (theme) => theme.palette.primary.dark
                          }
                        }}
                      />
                    )}
                  </StyledPlayerButton>
                </Stack>
                {playbackState && (
                  <PlayerTrackPosition
                    playbackState={playbackState}
                    item={item}
                    onSeek={handleSeek}
                  />
                )}
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack
                mt={2}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                height="100%"
              >
                {devices && thisDeviceId && playbackState && (
                  <DeviceMenu
                    devices={devices}
                    fetchingDevices={fetchingDevices}
                    thisDeviceId={thisDeviceId}
                    playbackState={playbackState}
                    onDeviceChange={onDeviceChange}
                    onDevicesRefresh={onDevicesRefresh}
                  />
                )}
                <PlayerVolume
                  playerVolume={playbackState?.device?.volume_percent ?? 100}
                  onVolumeChange={handleVolumeChange}
                />
              </Stack>
            </Grid>
          </Grid>
        )}
      </StyledPlayerContainer>
      {playingOnOtherDevice && (
        <StyledPlayingOnOtherDeviceWrapper>
          <VolumeUpIcon
            sx={{
              fontSize: (theme) => theme.typography.paragraph.fontSize,
              color: (theme) => theme.palette.text.secondary
            }}
          />
          <Typography variant="paragraph" sx={{ color: (theme) => theme.palette.text.secondary }}>
            {`Listening on ${currentDevice?.name}`}
          </Typography>
        </StyledPlayingOnOtherDeviceWrapper>
      )}
    </StyledPlayerWrapper>
  );
};

export default SpotifyPlayer;
