import { FC, useEffect, useState } from "react";
import { StyledSlider } from "../Player.styles";
import { formatMilliseconds } from "../../../utilities/number";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  SpotifyPlaybackState,
  SpotifyTrack,
} from "../../../state/queries/models/spotify.models";

type PlayerTrackPositionProps = {
  //playbackState: Spotify.PlaybackState | undefined;
  playbackState: SpotifyPlaybackState | null;
  track: SpotifyTrack;
  onSeek: (position: number | number[]) => void;
};

const PlayerTrackPosition: FC<PlayerTrackPositionProps> = (
  props: PlayerTrackPositionProps
) => {
  const { playbackState, track, onSeek } = props;
  const [seeking, setSeeking] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(
    playbackState?.progress_ms ?? 0
  );

  useEffect(() => {
    if (playbackState?.progress_ms && !seeking)
      setPosition(playbackState.progress_ms);
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
      <Typography
        variant="paragraphExtraSmall"
        sx={{ color: (theme) => theme.palette.grey[400] }}
      >
        {formatMilliseconds(position)}
      </Typography>
      <StyledSlider
        aria-label="Track Position"
        defaultValue={0}
        value={position}
        min={0}
        max={track.duration_ms}
        step={1000}
        onChange={(_, val: number | number[]) => seek(val as number)}
        onChangeCommitted={(_, val: number | number[]) =>
          seekCommitted(val as number)
        }
      />
      <Typography
        variant="paragraphExtraSmall"
        sx={{ color: (theme) => theme.palette.grey[400] }}
      >
        {formatMilliseconds(track.duration_ms)}
      </Typography>
    </Stack>
  );
};

export default PlayerTrackPosition;
