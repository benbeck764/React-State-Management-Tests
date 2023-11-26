import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import FavoriteButton from "../../common/FavoriteButton";
import PlayButton from "../../player/PlayButton";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";

type TrackButtonsProps = {
  loading: boolean;
  track?: SpotifyTrack | null;
};

const TrackButtons: FC<TrackButtonsProps> = (props: TrackButtonsProps) => {
  const { loading, track } = props;

  if (loading || !track) {
    return (
      <Stack direction="row" alignItems="center" gap={2} my={2}>
        <Skeleton variant="circular" height={48} width={48} />
        <Skeleton variant="circular" height={38} width={38} />
      </Stack>
    );
  } else {
    return (
      <Stack direction="row" alignItems="center" gap={2} my={2}>
        {/* [TODO]: Fix this Play button, should start a Playlist... */}
        <PlayButton
          variant="action-button"
          type="track"
          dataUri={track.album.uri}
          offsetUri={track.uri}
          size="large"
        />
        <FavoriteButton type="track" itemId={track.id} size="large" />
      </Stack>
    );
  }
};

export default TrackButtons;
