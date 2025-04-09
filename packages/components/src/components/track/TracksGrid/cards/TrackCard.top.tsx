import { Fragment, useRef } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import {
  StyledEllipsingTextContainer,
  TypographySkeleton
} from '@benbeck764/react-components/common';
import PlayButton from '@/components/common/PlayButton/PlayButton';
import { TrackCardProps } from '@/components/track/TracksGrid/cards/TrackCard';
import { useHovered } from '@/hooks/useHovered';
import { Equalizer } from '@mui/icons-material';
import { PlayButtonProps } from '@/components/common/PlayButton/PlayButton.props';
import { formatAsTrackDurationString } from '@/utilities/time';

const TrackCardTopTracks = (props: TrackCardProps) => {
  const theme = useTheme();
  const cardFocusRef = useRef<HTMLDivElement>();
  const hovered = useHovered(cardFocusRef);

  if (props.loadingPlaceholder) {
    return (
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} py={1}>
          <Stack direction="row" alignItems="center" gap={1.75}>
            <TypographySkeleton variant="paragraph" charCount={1} />
            <Skeleton variant="rectangular" height={40} width={40} />
            <TypographySkeleton variant="paragraphBold" charCount={15} charCountVariance={8} />
          </Stack>
          <Stack>
            <TypographySkeleton variant="paragraph" charCount={5} />
          </Stack>
        </Stack>
      </Box>
    );
  }
  const { track, index, playType, playButtonProps, renderTrackLink: renderLink } = props;
  const { playbackState, deviceId } = playButtonProps ?? {};

  const isCurrentTrack = playbackState && track.uri === playbackState.item?.uri;
  const trackPlaying = isCurrentTrack && playbackState.is_playing;

  const playButtonBaseProps: Pick<PlayButtonProps, 'playbackState' | 'deviceId' | 'offsetUri'> = {
    playbackState,
    deviceId,
    offsetUri: track.uri
  };

  const LinkComponent = renderLink?.(track) ?? Fragment;

  return (
    <Box ref={cardFocusRef} sx={{ '&:hover': { backgroundColor: theme.palette.coolGrey[800] } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" px={2} py={1}>
        <Stack direction="row" alignItems="center" gap={1.75}>
          <Stack justifyContent="center" width="14px">
            {hovered ? (
              <>
                {playType === 'artist' && (
                  <PlayButton
                    type="artist"
                    variant="button"
                    dataUri={track.artists?.[0].uri}
                    {...playButtonBaseProps}
                  />
                )}
                {playType === 'album' && (
                  <PlayButton
                    type="album"
                    variant="button"
                    dataUri={track.album.uri}
                    {...playButtonBaseProps}
                  />
                )}
                {playType === 'track' && (
                  <PlayButton
                    type="track"
                    variant="button"
                    dataUri={track.uri}
                    {...playButtonBaseProps}
                  />
                )}
              </>
            ) : (
              <>{trackPlaying ? <Equalizer /> : <Typography>{(index ?? 0) + 1}</Typography>}</>
            )}
          </Stack>
          <Box
            component="img"
            src={track.album.images?.[0]?.url}
            height={40}
            width={40}
            sx={{ borderRadius: '4px' }}
          />
          <LinkComponent>
            <StyledEllipsingTextContainer
              lines={1}
              reserveHeight={
                +(theme.typography.paragraphBold.lineHeight?.toString().replace('px', '') || 0)
              }
            >
              <Typography
                variant="paragraphBold"
                sx={{
                  color: (theme) =>
                    isCurrentTrack ? theme.palette.primary.main : theme.palette.text.primary
                }}
              >
                {track.name}
              </Typography>
            </StyledEllipsingTextContainer>
          </LinkComponent>
        </Stack>
        <Stack>
          <Typography variant="paragraph" sx={{ color: (theme) => theme.palette.grey[400] }}>
            {formatAsTrackDurationString(track.duration_ms)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TrackCardTopTracks;
