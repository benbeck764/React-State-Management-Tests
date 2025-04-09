import Fab from '@mui/material/Fab';
import { FC } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { debounce } from '@mui/material/utils';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { PlayButtonProps } from '@/components/common/PlayButton/PlayButton.props';

const PlayButton: FC<PlayButtonProps> = (props: PlayButtonProps) => {
  const {
    type,
    variant,
    dataUri,
    playbackState,
    deviceId,
    offsetUri,
    onPause,
    onResume,
    onPlay,
    size = 'medium',
    sx,
    stopPropagation,
    tooltipText
  } = props;

  const currentTrack =
    playbackState &&
    type === 'track' &&
    ((!offsetUri && dataUri === playbackState.context?.uri) ||
      (offsetUri && offsetUri === playbackState.item.uri));

  const isCurrent =
    playbackState &&
    (currentTrack ||
      (type === 'album' && dataUri === playbackState.context?.uri) ||
      (type === 'artist' && dataUri === playbackState.context?.uri));

  const isPlaying = isCurrent && playbackState !== null && playbackState.is_playing;

  const handlePlayChange = (): void => {
    if (!deviceId) return;

    if (isPlaying) {
      // Pause
      onPause?.(deviceId);
    } else {
      if (isCurrent) {
        // Currently item is the track/album/artist? Resume from where it's at.
        onResume?.(deviceId);
      } else {
        // Otherwise start new track/album/artist.
        onPlay?.({
          deviceId: deviceId,
          contextUri: type !== 'track' || (type === 'track' && offsetUri) ? dataUri : undefined,
          uris: type === 'track' && !offsetUri ? [dataUri] : undefined,
          offset:
            typeof offsetUri !== 'undefined' && type !== 'artist'
              ? {
                  uri: offsetUri
                }
              : undefined
        });
      }
    }
  };

  const debouncedHandlePlayChange = debounce(handlePlayChange, 200);

  const sizes = {
    small: { fabSize: '32px', fabFontSize: '24px', iconButtonFontSize: '16px' },
    medium: { fabSize: '40px', fabFontSize: '30px', iconButtonFontSize: '20px' },
    large: { fabSize: '48px', fabFontSize: '36px', iconButtonFontSize: '28px' }
  };

  const { fabSize, fabFontSize, iconButtonFontSize } = sizes[size];

  return (
    <Tooltip title={tooltipText} placement="top">
      {variant === 'button' ? (
        <IconButton onClick={debouncedHandlePlayChange} sx={{ p: 0, ...sx }}>
          {isPlaying ? (
            <PauseIcon
              sx={{ fontSize: iconButtonFontSize, color: (theme) => theme.palette.common.white }}
            />
          ) : (
            <PlayArrowIcon
              sx={{ fontSize: iconButtonFontSize, color: (theme) => theme.palette.common.white }}
            />
          )}
        </IconButton>
      ) : (
        <Fab
          color="primary"
          sx={{
            '&:hover': { transform: 'scale(1.05)' },
            width: fabSize,
            height: fabSize,
            ...sx
          }}
          onClick={(e) => {
            if (stopPropagation) {
              e.preventDefault();
              e.stopPropagation();
            }
            debouncedHandlePlayChange();
          }}
        >
          {isPlaying ? (
            <PauseIcon
              sx={{ fontSize: fabFontSize, color: (theme) => theme.palette.common.black }}
            />
          ) : (
            <PlayArrowIcon
              sx={{ fontSize: fabFontSize, color: (theme) => theme.palette.common.black }}
            />
          )}
        </Fab>
      )}
    </Tooltip>
  );
};

export default PlayButton;
