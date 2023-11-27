import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { capitalize } from "@mui/material/utils";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import {
  SpotifyAlbum,
  SpotifyArtist,
} from "../../../state/queries/models/spotify.models";
import AlbumsGrid from "../../common/AlbumsGrid/AlbumsGrid";
import { AppLink } from "../../common/AppLink";
import { getArtistDiscographyUrl } from "../../../routing/common/url";

type TrackPopularAlbumsProps = {
  loading: boolean;
  variant: "releases" | "albums";
  albums?: SpotifyAlbum[];
  artist?: SpotifyArtist;
  onAlbumSelected: (album: SpotifyAlbum) => void;
};

const TrackPopularItems: FC<TrackPopularAlbumsProps> = (
  props: TrackPopularAlbumsProps
) => {
  const { loading, variant, albums, artist, onAlbumSelected } = props;

  if (loading || !albums?.length || !artist) {
    return (
      <Stack gap={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TypographySkeleton
            variant="h4"
            charCount={22}
            charCountVariance={8}
          />
          <TypographySkeleton variant="paragraphSmallBold" charCount={8} />
        </Stack>
        <AlbumsGrid
          data={undefined}
          loading={true}
          pageSize={6}
          cardType="minimal"
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
          <AppLink to={getArtistDiscographyUrl(artist.id)}>
            <Typography variant="h4">{`Popular ${capitalize(variant)} by ${
              artist.name
            }`}</Typography>
          </AppLink>
          <AppLink to={getArtistDiscographyUrl(artist.id)}>
            <Typography
              variant="paragraphSmallBold"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              Show all
            </Typography>
          </AppLink>
        </Stack>
        <AlbumsGrid
          data={albums}
          loading={loading}
          cardType="minimal"
          pageSize={6}
          onAlbumSelected={onAlbumSelected}
        />
      </Stack>
    );
  }
};

export default TrackPopularItems;
