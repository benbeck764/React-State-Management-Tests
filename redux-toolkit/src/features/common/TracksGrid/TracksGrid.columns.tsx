import { FC } from "react";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import { formatMilliseconds } from "../../../utilities/number";

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
  if (props.loadingPlaceholder) {
    return <TypographySkeleton variant="paragraph" charCount={1} />;
  } else {
    const { index } = props;
    return (
      <Typography
        variant="paragraph"
        sx={{ color: (theme) => theme.palette.grey[400] }}
      >
        {(index ?? 0) + 1}
      </Typography>
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
      ></Box>
    );
  }
};

export const TracksGridTrackTitle: FC<TracksGridColunnProps> = (
  props: TracksGridColunnProps
) => {
  if (props.loadingPlaceholder) {
    return (
      <TypographySkeleton variant="h6" charCount={15} charCountVariance={8} />
    );
  } else {
    const { item: track } = props;
    return <Typography variant="h6">{track.name}</Typography>;
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
