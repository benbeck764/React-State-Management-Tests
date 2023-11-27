import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import TracksGrid from "../../common/TracksGrid/TracksGrid";
import { useGetRecommendationsQuery } from "../../../state/queries/track.api";

type TrackRecommendationsProps = {
  track?: SpotifyTrack | null;
};

const TrackRecommendations: FC<TrackRecommendationsProps> = (
  props: TrackRecommendationsProps
) => {
  const { track } = props;

  const { data: recommendationsResponse, isFetching: loading } =
    useGetRecommendationsQuery(
      {
        limit: 5,
        //seed_artists: track?.artists.map((a: SpotifyArtist) => a.id).join(","),
        //seed_artists: track?.artists?.[0].id,
        //seed_genres: track?.artists?.[0].genres?.join(","),
        seed_tracks: track?.id,
        //target_popularity: track?.popularity,
      },
      { skip: !track }
    );

  const tracks = recommendationsResponse?.tracks;

  if (loading || !tracks?.length) {
    return (
      <Stack gap={2}>
        <Stack>
          <TypographySkeleton variant="h4" charCount={11} />
          <TypographySkeleton variant="paragraphSmall" charCount={20} />
        </Stack>
        <TracksGrid
          data={undefined}
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
