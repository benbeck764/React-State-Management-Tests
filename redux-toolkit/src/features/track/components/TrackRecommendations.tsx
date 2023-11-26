import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import TracksGrid from "../../common/TracksGrid/TracksGrid";

type TrackRecommendationsProps = {
  loading: boolean;
  tracks?: SpotifyTrack[];
};

const TrackRecommendations: FC<TrackRecommendationsProps> = (
  props: TrackRecommendationsProps
) => {
  const { loading, tracks } = props;

  if (loading || !tracks?.length) {
    return (
      <Stack gap={2}>
        <Stack>
          <TypographySkeleton variant="h4" charCount={11} />
          <TypographySkeleton variant="paragraphSmall" charCount={20} />
        </Stack>
        <TracksGrid
          data={tracks}
          cardType="search"
          loading={true}
          pageSize={5}
          playType="track"
        />
      </Stack>
    );
  } else {
    return (
      <Stack gap={2}>
        <Stack>
          <Typography variant="h4">Recommended</Typography>
          <Typography
            variant="paragraphSmall"
            sx={{ color: (theme) => theme.palette.grey[400] }}
          >
            Based upon this song
          </Typography>
        </Stack>
        <TracksGrid
          data={tracks}
          cardType="search"
          loading={loading}
          pageSize={5}
          playType="track"
        />
      </Stack>
    );
  }
};

export default TrackRecommendations;
