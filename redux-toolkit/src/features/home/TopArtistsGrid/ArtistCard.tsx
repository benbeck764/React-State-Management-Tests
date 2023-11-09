import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  StyledEllipsingTextContainer,
  TypographySkeleton,
} from "@benbeck764/react-components/common";
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import { StyledCard } from "./ArtistCard.styles";

type ArtistCardProps =
  | {
      artist: SpotifyArtist;
      loadingPlaceholder?: never;
    }
  | {
      artist?: SpotifyArtist;
      loadingPlaceholder: true;
    };

const ArtistCard = (props: ArtistCardProps) => {
  const theme = useTheme();

  if (props.loadingPlaceholder) {
    return (
      <StyledCard>
        <Stack alignItems="center" gap={2}>
          <Skeleton variant="circular" width={150} height={150} />
          <TypographySkeleton
            variant="h6"
            charCount={12}
            charCountVariance={6}
            lines={1}
          />
        </Stack>
      </StyledCard>
    );
  } else {
    const { artist } = props;
    return (
      <StyledCard>
        <Stack alignItems="center" gap={2}>
          <Avatar sx={{ width: 150, height: 150 }} src={artist.images[0].url} />
          <StyledEllipsingTextContainer
            lines={1}
            reserveHeight={
              +(
                theme.typography.h6.lineHeight?.toString().replace("px", "") ||
                0
              )
            }
          >
            <Typography variant="h6">{artist.name}</Typography>
          </StyledEllipsingTextContainer>
        </Stack>
      </StyledCard>
    );
  }
};

export default ArtistCard;
