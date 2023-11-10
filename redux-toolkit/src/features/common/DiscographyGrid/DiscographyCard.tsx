import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { capitalize } from "@mui/material/utils";
import {
  StyledEllipsingTextContainer,
  TypographySkeleton,
} from "@benbeck764/react-components/common";
import { SpotifyAlbum } from "../../../state/queries/models/spotify.models";
import { StyledCard } from "../common.styles";
import { AppLink } from "../AppLink";
import TrackListing from "../TrackListing";
import { getAlbumUrl } from "../../../routing/common/url";

type AlbumCardProps =
  | {
      album: SpotifyAlbum;
      loadingPlaceholder?: never;
    }
  | {
      album?: SpotifyAlbum;
      loadingPlaceholder: true;
    };

const ArtistCard = (props: AlbumCardProps) => {
  const theme = useTheme();

  if (props.loadingPlaceholder) {
    return (
      <StyledCard>
        <Stack direction="row" gap={2}>
          <Stack gap={1.5}>
            <Skeleton variant="rectangular" width={125} height={125} />
          </Stack>
          <Stack>
            <TypographySkeleton
              variant="h2"
              charCount={22}
              charCountVariance={10}
              lines={1}
            />
            <TypographySkeleton
              variant="paragraph"
              charCount={15}
              charCountVariance={5}
              lines={1}
            />
          </Stack>
        </Stack>
        <TrackListing loading={true} />
      </StyledCard>
    );
  } else {
    const { album } = props;

    return (
      <Box sx={{ padding: (theme) => theme.spacing(2), borderRadius: "16px" }}>
        <Stack direction="row" gap={2}>
          <Stack gap={1.5}>
            <Avatar
              variant="rounded"
              sx={{ width: 125, height: 125 }}
              src={album.images[0].url}
            />
          </Stack>
          <Stack>
            <StyledEllipsingTextContainer
              lines={1}
              reserveHeight={
                +(
                  theme.typography.h2.lineHeight
                    ?.toString()
                    .replace("px", "") || 0
                )
              }
            >
              <AppLink to={getAlbumUrl(album.id)}>
                <Typography variant="h2">{album.name}</Typography>
              </AppLink>
            </StyledEllipsingTextContainer>
            <Typography
              variant="paragraph"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              {`${new Date(album.release_date).getFullYear()} • ${capitalize(
                album.album_type
              )} • ${album.total_tracks} song${
                album.total_tracks > 1 ? "s" : ""
              }`}
            </Typography>
          </Stack>
        </Stack>
        <TrackListing album={album} />
      </Box>
    );
  }
};

export default ArtistCard;
