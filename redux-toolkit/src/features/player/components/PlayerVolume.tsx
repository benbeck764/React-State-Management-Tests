import { FC, useEffect, useState } from "react";
import { StyledPlayerButton, StyledSlider } from "../Player.styles";
import Stack from "@mui/material/Stack";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { debounce } from "@mui/material/utils";
import { Typography } from "@mui/material";

type PlayerVolumeProps = {
  playerVolume: number;
  onVolumeChange: (volume: number | number[]) => void;
};

const PlayerVolume: FC<PlayerVolumeProps> = (props: PlayerVolumeProps) => {
  const { playerVolume, onVolumeChange } = props;
  const [prevVolume, setPrevVolume] = useState<number>(playerVolume);
  const [volume, setVolume] = useState<number>(playerVolume);
  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    setVolume(playerVolume);
  }, [playerVolume]);

  const toggleMute = debounce(() => {
    setPrevVolume(volume);
    setMuted(!muted);
    setVolume(muted ? prevVolume ?? 100 : 0);
    onVolumeChange(muted ? prevVolume ?? 100 : 0);
  }, 200);

  const volumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setMuted(newVolume === 0);
    onVolumeChange(newVolume);
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography
          variant="paragraphExtraSmall"
          sx={{ color: (theme) => theme.palette.grey[300] }}
        >
          {volume}
        </Typography>
        <StyledPlayerButton onClick={toggleMute}>
          {muted && (
            <VolumeOffIcon
              sx={{
                fontSize: "22px",
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
                fontSize: "22px",
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
                fontSize: "22px",
                color: (theme) => theme.palette.grey[300],
                "&:hover": {
                  color: (theme) => theme.palette.text.primary,
                },
              }}
            />
          )}
        </StyledPlayerButton>
      </Stack>
      <StyledSlider
        aria-label="Track Position"
        defaultValue={volume}
        value={volume}
        min={0}
        max={100}
        step={1}
        onChange={(_, val: number | number[]) => volumeChange(val as number)}
        sx={{ width: 100 }}
      />
    </Stack>
  );
};

export default PlayerVolume;
