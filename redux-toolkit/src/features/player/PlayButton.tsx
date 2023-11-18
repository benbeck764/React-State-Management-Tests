import Fab from "@mui/material/Fab";
import { FC } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { AppRootState, useAppSelector } from "../../state/store";
import {
  useStartOrResumePlaybackMutation,
  usePausePlaybackMutation,
} from "../../state/queries/player.api";
import { debounce } from "@mui/material/utils";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material/styles";

export type PlayButtonPlayType = "artist" | "album" | "track" | "playlist";
type PlayButtonVariant = "action-button" | "button";
type PlayButtonSize = "small" | "medium" | "large";

type PlayButtonProps = {
  type: PlayButtonPlayType;
  variant: PlayButtonVariant;
  dataUri: string;
  offsetUri?: string;
  size?: PlayButtonSize;
  sx?: SxProps<Theme>;
  stopPropagation?: boolean;
};

const PlayButton: FC<PlayButtonProps> = (props: PlayButtonProps) => {
  const {
    type,
    variant,
    dataUri,
    offsetUri,
    size = "medium",
    sx,
    stopPropagation,
  } = props;

  const [startOrResumePlayback] = useStartOrResumePlaybackMutation();
  const [pausePlayback] = usePausePlaybackMutation();

  const playerState = useAppSelector((s: AppRootState) => s.player);
  const { playbackState, deviceId } = playerState;

  const currentTrack =
    typeof playbackState !== "undefined" &&
    type === "track" &&
    ((!offsetUri && dataUri === playbackState.track_window.current_track.uri) ||
      (offsetUri &&
        offsetUri === playbackState.track_window.current_track.uri));

  const isCurrent =
    typeof playbackState !== "undefined" &&
    (currentTrack ||
      (type === "album" && dataUri === playbackState.context.uri) ||
      (type === "artist" && dataUri === playbackState.context.uri));

  const isPlaying =
    isCurrent &&
    typeof playbackState !== "undefined" &&
    playbackState.paused === false;

  const handlePlayChange = (): void => {
    if (!deviceId) return;

    if (isPlaying) {
      // Pause
      pausePlayback(deviceId);
    } else {
      if (isCurrent) {
        // Currently item is the track/album/artist? Resume from where it's at.
        startOrResumePlayback({
          device_id: deviceId,
          context_uri: dataUri,
          position_ms: playbackState.position,
          offset:
            typeof playbackState.track_window.current_track !== "undefined" &&
            type !== "artist"
              ? {
                  uri: playbackState.track_window.current_track.uri,
                }
              : undefined,
        });
      } else {
        // Otherwise start new track/album/artist.
        startOrResumePlayback({
          device_id: deviceId,
          context_uri:
            type !== "track" || (type === "track" && offsetUri)
              ? dataUri
              : undefined,
          uris: type === "track" && !offsetUri ? [dataUri] : undefined,
          offset:
            typeof offsetUri !== "undefined" && type !== "artist"
              ? {
                  uri: offsetUri,
                }
              : undefined,
        });
      }
    }
  };

  const debouncedHandlePlayChange = debounce(handlePlayChange, 200);

  let buttonSize = "32px";
  switch (size) {
    case "small":
      buttonSize = "32px";
      break;
    case "medium":
      buttonSize = "40px";
      break;
    case "large":
      buttonSize = "48px";
      break;
  }

  return variant === "button" ? (
    <IconButton onClick={debouncedHandlePlayChange} sx={{ p: 0, ...sx }}>
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
        width: buttonSize,
        height: buttonSize,
        ...sx,
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
