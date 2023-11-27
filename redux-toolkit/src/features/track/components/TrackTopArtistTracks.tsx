import { FC, useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AppButton from "@benbeck764/react-components/Button";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import TracksGrid from "../../common/TracksGrid/TracksGrid";
import { useGetArtistTopTracksQuery } from "../../../state/queries/artist.api";

type TrackTopArtistTracksProps = {
  artists?: SpotifyArtist[];
};

const TrackTopArtistTracks: FC<TrackTopArtistTracksProps> = (
  props: TrackTopArtistTracksProps
) => {
  const { artists } = props;
  const [expanded, setExpanded] = useState<boolean>(false);

  const artist = artists?.[0];

  const { data: topTracksData, isFetching: loading } =
    useGetArtistTopTracksQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      { id: artist?.id!, market: "US" },
      { skip: !artists?.length }
    );
  const tracks = topTracksData?.tracks;

  if (loading || !tracks?.length || !artist) {
    return (
      <Stack gap={2} alignItems="flex-start">
        <Stack>
          <TypographySkeleton variant="paragraphSmall" charCount={17} />
          <TypographySkeleton
            variant="h4"
            charCount={14}
            charCountVariance={7}
          />
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
      <Stack gap={2} alignItems="flex-start">
        <Stack>
          <Typography
            variant="paragraphSmall"
            sx={{ color: (theme) => theme.palette.grey[400] }}
          >
            Popular Tracks by
          </Typography>
          <Typography variant="h4">{artist.name}</Typography>
        </Stack>
        <TracksGrid
          data={expanded ? tracks : tracks.slice(0, 5)}
          cardType="top-track"
          loading={loading}
          pageSize={5}
          playType="track"
          sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        />
        <AppButton
          sx={{ color: (theme) => theme.palette.grey[400] }}
          onClick={() => setExpanded((prev: boolean) => !prev)}
        >
          {expanded ? "See less" : "See more"}
        </AppButton>
      </Stack>
    );
  }
};

export default TrackTopArtistTracks;
