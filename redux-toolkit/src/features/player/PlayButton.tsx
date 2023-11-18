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

type PlayButtonProps = {
  dataUri: string;
};

const PlayButton: FC<PlayButtonProps> = (props: PlayButtonProps) => {
  const { dataUri } = props;

  const [startOrResumePlayback] = useStartOrResumePlaybackMutation();
  const [pausePlayback] = usePausePlaybackMutation();

  const playerState = useAppSelector((s: RootState) => s.player);
  const { playbackState, deviceId } = playerState;

  const isPlaying =
    typeof playbackState !== "undefined" &&
    playbackState.paused === false &&
    playbackState.context?.uri &&
    dataUri === playbackState.context.uri;

  const handlePlayChange = (): void => {
    if (!deviceId) return;
    if (isPlaying) {
      pausePlayback(deviceId);
    } else {
      if (
        playbackState?.context?.uri &&
        dataUri === playbackState.context.uri
      ) {
        startOrResumePlayback({
          device_id: deviceId,
          context_uri: dataUri,
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
          context_uri: dataUri,
        });
      }
    }
  };

  const debouncedHandlePlayChange = debounce(handlePlayChange, 200);

  return (
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
