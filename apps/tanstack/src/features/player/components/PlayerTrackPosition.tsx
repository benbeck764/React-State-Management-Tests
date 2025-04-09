import { FC, useEffect, useState } from 'react';
import { StyledSlider } from '../Player.styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SpotifyPlaybackState, SpotifyTrack } from '@spotify-examples/spotify-models';

// [TODO]: Use from `components` package once moved
export const formatAsTrackDurationString = (milliseconds: number): string => {
  const date = new Date(milliseconds);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  let formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
  if (hours) formattedTime = `${padZero(hours)}:${formattedTime}`;

  return formattedTime;
};

const padZero = (number: number) => (number < 10 ? '0' + number : number);

type PlayerTrackPositionProps = {
  //playbackState: Spotify.PlaybackState | undefined;
  playbackState: SpotifyPlaybackState | null;
  item: SpotifyTrack;
  onSeek: (position: number) => void;
};

const PlayerTrackPosition: FC<PlayerTrackPositionProps> = (props: PlayerTrackPositionProps) => {
  const { playbackState, item: track, onSeek } = props;

  const [seeking, setSeeking] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(playbackState?.progress_ms ?? 0);

  useEffect(() => {
    if (playbackState?.progress_ms && !seeking) setPosition(playbackState.progress_ms);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playbackState?.progress_ms]);

  const seek = (ms: number): void => {
    setSeeking(true);
    setPosition(ms);
  };

  const seekCommitted = (ms: number): void => {
    setSeeking(false);
    onSeek(ms);
  };

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Typography variant="paragraphExtraSmall" sx={{ color: (theme) => theme.palette.grey[400] }}>
        {formatAsTrackDurationString(position)}
      </Typography>
      <StyledSlider
        aria-label="Track Position"
        defaultValue={0}
        value={position}
        min={0}
        max={track.duration_ms}
        step={1000}
        onChange={(_, val: number | number[]) => seek(val as number)}
        onChangeCommitted={(_, val: number | number[]) => seekCommitted(val as number)}
      />
      <Typography variant="paragraphExtraSmall" sx={{ color: (theme) => theme.palette.grey[400] }}>
        {formatAsTrackDurationString(track.duration_ms)}
      </Typography>
    </Stack>
  );
};

export default PlayerTrackPosition;
