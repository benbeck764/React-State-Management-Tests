import { FC } from "react";
import { StyledSlider } from "../Player.styles";
import { formatMilliseconds } from "../../../utilities/number";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type PlayerTrackPositionProps = {
  playbackState: Spotify.PlaybackState | undefined;
  track: Spotify.Track;
  onSeek: (position: number | number[]) => void;
};

const PlayerTrackPosition: FC<PlayerTrackPositionProps> = (
  props: PlayerTrackPositionProps
) => {
  const { playbackState, track, onSeek } = props;

  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Typography
        variant="paragraphExtraSmall"
        sx={{ color: (theme) => theme.palette.grey[400] }}
      >
        {formatMilliseconds(playbackState?.position ?? 0)}
      </Typography>
      <StyledSlider
        aria-label="Track Position"
        defaultValue={0}
        value={playbackState?.position ?? 0}
        min={0}
        max={track.duration_ms}
        step={1000}
        onChangeCommitted={(_, val: number | number[]) => onSeek(val)}
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
