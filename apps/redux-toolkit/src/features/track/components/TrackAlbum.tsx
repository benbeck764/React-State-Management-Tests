import { FC } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import {
  SpotifyAlbum,
  SpotifyTrack,
} from "../../../state/queries/models/spotify.models";
import TrackListing from "../../common/TrackListing/TrackListing";
import { useGetAlbumQuery } from "../../../state/queries/album.api";
import { AppLink } from "../../common/AppLink";
import { getAlbumUrl } from "../../../routing/common/url";

type TrackAlbumProps = {
  track?: SpotifyTrack | null;
  onAlbumSelected: (album: SpotifyAlbum) => void;
};

const TrackAlbum: FC<TrackAlbumProps> = (props: TrackAlbumProps) => {
  const { track, onAlbumSelected } = props;

  const { data: album, isFetching: loading } = useGetAlbumQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    { id: track?.album?.id! },
    { skip: !track }
  );

  if (!album || loading) {
    return (
      <Box>
        <StyledTracksHeader>
          <Stack direction="row">
            <Skeleton
              height={80}
              width={80}
              sx={{ borderTopLeftRadius: "8px" }}
            />
            <Stack px={2} py={3}>
              <TypographySkeleton
                variant="paragraphExtraSmall"
                charCount={12}
              />
              <TypographySkeleton
                variant="paragraphBold"
                charCount={24}
                charCountVariance={14}
              />
            </Stack>
          </Stack>
        </StyledTracksHeader>
        <TrackListing loading={true} />
      </Box>
    );
  } else {
    return (
      <Box>
        <StyledTracksHeader onClick={() => onAlbumSelected(album)}>
          <Stack direction="row">
            <Box
              component="img"
              height={80}
              width={80}
              src={album.images?.[0]?.url}
              sx={{ borderTopLeftRadius: "8px" }}
            />
            <Stack px={2} py={3}>
              <Typography variant="paragraphExtraSmall">
                From the album
              </Typography>
              <AppLink to={getAlbumUrl(album.id)} state={album}>
                <Typography variant="paragraphBold">{album.name}</Typography>
              </AppLink>
            </Stack>
          </Stack>
        </StyledTracksHeader>
        <TrackListing album={album} />
      </Box>
    );
  }
};

const StyledTracksHeader = styled(Box)(({ theme }) => ({
  height: "80px",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  backgroundColor: theme.palette.coolGrey[900],
  "&:hover": {
    backgroundColor: theme.palette.coolGrey[800],
    cursor: "pointer",
  },
}));

export default TrackAlbum;
