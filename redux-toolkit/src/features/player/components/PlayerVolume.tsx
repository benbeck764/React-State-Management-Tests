import { FC } from "react";
import { StyledPlayerButton, StyledSlider } from "../Player.styles";
import Stack from "@mui/material/Stack";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

type PlayerVolumeProps = {
  volume: number;
  onVolumeChange: (volume: number | number[]) => void;
};

const PlayerVolume: FC<PlayerVolumeProps> = (props: PlayerVolumeProps) => {
  const { volume, onVolumeChange } = props;

  const toggleMute = () => {
    // [TODO] - Debounce this?
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
      <StyledPlayerButton onClick={toggleMute}>
        {volume === 0 && (
          <VolumeOffIcon
            sx={{
              fontSize: "26px",
              color: (theme) => theme.palette.grey[300],
              "&:hover": {
                color: (theme) => theme.palette.text.primary,
              },
            }}
          />
        )}
        {volume > 0 && volume < 50 && (
          <VolumeDownIcon
            sx={{
              fontSize: "26px",
              color: (theme) => theme.palette.grey[300],
              "&:hover": {
                color: (theme) => theme.palette.text.primary,
              },
            }}
          />
        )}
        {volume >= 50 && (
          <VolumeUpIcon
            sx={{
              fontSize: "26px",
              color: (theme) => theme.palette.grey[300],
              "&:hover": {
                color: (theme) => theme.palette.text.primary,
              },
            }}
          />
        )}
      </StyledPlayerButton>
      <StyledSlider
        aria-label="Track Position"
        defaultValue={100}
        value={volume}
        min={0}
        max={100}
        step={1}
        onChangeCommitted={(_, val: number | number[]) => onVolumeChange(val)}
        sx={{ width: 100 }}
      />
    </Stack>
  );
};

export default PlayerVolume;
