import Fab from "@mui/material/Fab";
import { FC } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { RootState, useAppSelector } from "../../state/store";
import {
  useStartOrResumePlaybackMutation,
  usePausePlaybackMutation,
} from "../../state/queries/player.api";
import { debounce } from "@mui/material/utils";
import IconButton from "@mui/material/IconButton";

type PlayButtonVariant = "action-button" | "button";

type PlayButtonProps = { variant: PlayButtonVariant } & (
  | {
      type: "album";
      albumDataUri: string;
    }
  | {
      type: "track";
      albumDataUri: string;
      trackDataUri: string;
    }
);

const PlayButton: FC<PlayButtonProps> = (props: PlayButtonProps) => {
  const { variant, type } = props;

  const [startOrResumePlayback] = useStartOrResumePlaybackMutation();
  const [pausePlayback] = usePausePlaybackMutation();

  const playerState = useAppSelector((s: RootState) => s.player);
  const { playbackState, deviceId } = playerState;

  const isCurrent =
    typeof playbackState !== "undefined" &&
    ((type === "track" &&
      props.trackDataUri === playbackState.track_window.current_track.uri) ||
      (type === "album" && props.albumDataUri === playbackState.context.uri));

  const isPlaying =
    isCurrent &&
    typeof playbackState !== "undefined" &&
    playbackState.paused === false;

  const handlePlayChange = (): void => {
    if (!deviceId) return;

    // Pause
    if (isPlaying) {
      pausePlayback(deviceId);
    } else {
      // Currently item is the track or album? Resume  from where it's at
      if (isCurrent) {
        startOrResumePlayback({
          device_id: deviceId,
          context_uri: props.albumDataUri,
          position_ms: playbackState.position,
          offset:
            typeof playbackState.track_window.current_track !== "undefined"
              ? {
                  uri: playbackState.track_window.current_track.uri,
                }
              : undefined,
        });
      } else {
        startOrResumePlayback({
          device_id: deviceId,
          context_uri: props.albumDataUri,
          offset:
            type === "track"
              ? {
                  uri: props.trackDataUri,
                }
              : undefined,
        });
      }
    }
  };

  const debouncedHandlePlayChange = debounce(handlePlayChange, 200);

  return variant === "button" ? (
    <IconButton onClick={debouncedHandlePlayChange} sx={{ p: 0 }}>
      {isPlaying ? (
        <PauseIcon
          sx={{
            fontSize: "20px",
            color: (theme) => theme.palette.common.white,
          }}
        />
      ) : (
        <PlayArrowIcon
          sx={{
            fontSize: "20px",
            color: (theme) => theme.palette.common.white,
          }}
        />
      )}
    </IconButton>
  ) : (
    <Fab
      color="primary"
      sx={{
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      onClick={debouncedHandlePlayChange}
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
