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
import Tooltip from "@mui/material/Tooltip";

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
  tooltipText?: string;
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
    tooltipText,
  } = props;

  const [startOrResumePlayback] = useStartOrResumePlaybackMutation();
  const [pausePlayback] = usePausePlaybackMutation();

  const playerState = useAppSelector((s: AppRootState) => s.player);
  const { playbackState, deviceId } = playerState;

  const currentTrack =
    playbackState !== null &&
    type === "track" &&
    ((!offsetUri && dataUri === playbackState.context?.uri) ||
      (offsetUri && offsetUri === playbackState.item.uri));

  const isCurrent =
    playbackState !== null &&
    (currentTrack ||
      (type === "album" && dataUri === playbackState.context?.uri) ||
      (type === "artist" && dataUri === playbackState.context?.uri));

  const isPlaying =
    isCurrent && playbackState !== null && playbackState.is_playing;

  const handlePlayChange = (): void => {
    if (!deviceId) return;

    if (isPlaying) {
      // Pause
      pausePlayback(deviceId);
    } else {
      if (isCurrent) {
        // Currently item is the track/album/artist? Resume from where it's at.
        startOrResumePlayback({ device_id: deviceId });
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

  let fabSize = "32px";
  let fabFontSize = "24px";
  let iconButtonFontSize = "16px";
  switch (size) {
    case "small":
      fabSize = "32px";
      fabFontSize = "24px";
      iconButtonFontSize = "16px";
      break;
    case "medium":
      fabSize = "40px";
      fabFontSize = "30px";
      iconButtonFontSize = "20px";
      break;
    case "large":
      fabSize = "48px";
      fabFontSize = "36px";
      iconButtonFontSize = "28px";
      break;
  }

  return (
    <Tooltip title={tooltipText} placement="top">
      {variant === "button" ? (
        <IconButton onClick={debouncedHandlePlayChange} sx={{ p: 0, ...sx }}>
          {isPlaying ? (
            <PauseIcon
              sx={{
                fontSize: iconButtonFontSize,
                color: (theme) => theme.palette.common.white,
              }}
            />
          ) : (
            <PlayArrowIcon
              sx={{
                fontSize: iconButtonFontSize,
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
            width: fabSize,
            height: fabSize,
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
                fontSize: fabFontSize,
                color: (theme) => theme.palette.common.black,
              }}
            />
          ) : (
            <PlayArrowIcon
              sx={{
                fontSize: fabFontSize,
                color: (theme) => theme.palette.common.black,
              }}
            />
          )}
        </Fab>
      )}
    </Tooltip>
  );
};

export default PlayButton;
