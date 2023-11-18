import { FC, useState } from "react";
import { StyledPlayerButton, StyledSlider } from "../Player.styles";
import Stack from "@mui/material/Stack";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { debounce } from "@mui/material/utils";

type PlayerVolumeProps = {
  initialVolume: number;
  onVolumeChange: (volume: number | number[]) => void;
};

const PlayerVolume: FC<PlayerVolumeProps> = (props: PlayerVolumeProps) => {
  const { initialVolume, onVolumeChange } = props;
  const [prevVolume, setPrevVolume] = useState<number>(initialVolume);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [muted, setMuted] = useState<boolean>(false);

  const toggleMute = debounce(() => {
    setPrevVolume(volume);
    setMuted(!muted);
    setVolume(muted ? prevVolume ?? 100 : 0);
    onVolumeChange(muted ? prevVolume ?? 100 : 0);
  }, 200);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setMuted(newVolume === 0);
    onVolumeChange(newVolume);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={1.5}
    >
      <StyledPlayerButton onClick={toggleMute}>
        {muted && (
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
        {!muted && volume > 0 && volume < 50 && (
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
        {!muted && volume >= 50 && (
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
        defaultValue={initialVolume}
        value={volume}
        min={0}
        max={100}
        step={1}
        onChange={(_, val: number | number[]) =>
          handleVolumeChange(val as number)
        }
        sx={{ width: 100 }}
      />
    </Stack>
  );
};

export default PlayerVolume;
