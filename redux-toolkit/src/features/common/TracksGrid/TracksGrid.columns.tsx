import { FC } from "react";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { formatMilliseconds } from "../../../utilities/number";
import PlayButton from "../../player/PlayButton";
import Equalizer from "../Equalizer";
import Stack from "@mui/material/Stack";
import { Skeleton } from "@mui/material";
import { useAppSelector, RootState } from "../../../state/store";

type TracksGridColunnProps =
  | {
      item: SpotifyTrack;
      loadingPlaceholder?: never;
    }
  | {
      loadingPlaceholder: true;
    };

export const TracksGridIndex: FC<TracksGridColunnProps & { index?: number }> = (
  props: TracksGridColunnProps & { index?: number }
) => {
  const playbackState = useAppSelector(
    (s: RootState) => s.player.playbackState
  );

  if (props.loadingPlaceholder) {
    return <TypographySkeleton variant="paragraph" charCount={1} />;
  } else {
    const { index } = props;
    const hovered = false;
    const track = props.item;

    const isCurrentTrack =
      typeof playbackState !== "undefined" &&
      playbackState.context?.uri &&
      track.uri === playbackState.track_window.current_track.uri;

    const trackPlaying = isCurrentTrack && playbackState.paused === false;
    return (
      <Stack justifyContent="center" width="14px">
        {hovered ? (
          <PlayButton
            type="track"
            variant="button"
            albumDataUri={track.album.uri}
            trackDataUri={track.uri}
          ></PlayButton>
        ) : (
          <>
            {trackPlaying ? (
              <Equalizer />
            ) : (
              <Typography>{(index ?? 0) + 1}</Typography>
            )}
          </>
        )}
      </Stack>
    );
  }
};

export const TracksGridAlbumCover: FC<TracksGridColunnProps> = (
  props: TracksGridColunnProps
) => {
  if (props.loadingPlaceholder) {
    return <Skeleton variant="rectangular" height={40} width={40} />;
  } else {
    const { item: track } = props;
    return (
      <Box
        component="img"
        src={track.album.images[0].url}
        height={40}
        width={40}
        sx={{ borderRadius: "4px" }}
      ></Box>
    );
  }
};

export const TracksGridTrackTitle: FC<TracksGridColunnProps> = (
  props: TracksGridColunnProps
) => {
  if (props.loadingPlaceholder) {
    return (
      <TypographySkeleton
        variant="paragraphBold"
        charCount={15}
        charCountVariance={8}
      />
    );
  } else {
    const { item: track } = props;
    return <Typography variant="paragraphBold">{track.name}</Typography>;
  }
};

export const TracksGridTrackDuration: FC<TracksGridColunnProps> = (
  props: TracksGridColunnProps
) => {
  if (props.loadingPlaceholder) {
    return <TypographySkeleton variant="paragraph" charCount={5} />;
  } else {
    const { item: track } = props;
    return (
      <Typography
        variant="paragraph"
        sx={{ color: (theme) => theme.palette.grey[400] }}
      >
        {formatMilliseconds(track.duration_ms)}
      </Typography>
    );
  }
};
