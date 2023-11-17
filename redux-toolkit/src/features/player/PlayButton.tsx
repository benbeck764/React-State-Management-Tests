import Fab from "@mui/material/Fab";
import { FC } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

type PlayButtonProps = {
  isPlaying: boolean;
};

const PlayButton: FC<PlayButtonProps> = (props: PlayButtonProps) => {
  const { isPlaying } = props;

  return (
    <Fab
      color="primary"
      sx={{
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      {isPlaying ? (
        <PauseIcon
          sx={{
            fontSize: "32px",
            color: (theme) => theme.palette.common.black,
          }}
        />
      ) : (
        <PlayArrowIcon
          sx={{
            fontSize: "32px",
            color: (theme) => theme.palette.common.black,
          }}
        />
      )}
    </Fab>
  );
};

export default PlayButton;
