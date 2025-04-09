import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import ArtistsGrid from "../../common/ArtistsGrid/ArtistsGrid";
import { useGetArtistRelatedArtistsQuery } from "../../../state/queries/artist.api";
import { AppLink } from "../../common/AppLink";
import { getRelatedArtistsUrl } from "../../../routing/common/url";

type TrackRelatedArtistsProps = {
  artist?: SpotifyArtist;
  onArtistSelected?: (artist: SpotifyArtist) => void;
};

const TrackRelatedArtists: FC<TrackRelatedArtistsProps> = (
  props: TrackRelatedArtistsProps
) => {
  const { artist, onArtistSelected } = props;

  const { data: relatedArtistsResponse, isFetching: loading } =
    useGetArtistRelatedArtistsQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      { id: artist?.id! },
      { skip: !artist }
    );

  const relatedArtists = relatedArtistsResponse?.artists?.slice(0, 6);

  if (loading || !artist || !relatedArtists) {
    return (
      <Stack gap={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TypographySkeleton variant="h4" charCount={14} />
          <TypographySkeleton variant="paragraphSmallBold" charCount={8} />
        </Stack>
        <ArtistsGrid
          data={undefined}
          cardVariant="large"
          loading={loading}
          pageSize={loading ? 6 : undefined}
        />
      </Stack>
    );
  } else {
    return (
      <Stack gap={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <AppLink to={getRelatedArtistsUrl(artist.id)}>
            <Typography variant="h4">Fans also like</Typography>
          </AppLink>
          <AppLink to={getRelatedArtistsUrl(artist.id)}>
            <Typography
              variant="paragraphSmallBold"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              Show all
            </Typography>
          </AppLink>
        </Stack>
        <ArtistsGrid
          data={relatedArtists}
          cardVariant="large"
          loading={loading}
          pageSize={6}
          onArtistSelected={onArtistSelected}
        />
      </Stack>
    );
  }
};

export default TrackRelatedArtists;
