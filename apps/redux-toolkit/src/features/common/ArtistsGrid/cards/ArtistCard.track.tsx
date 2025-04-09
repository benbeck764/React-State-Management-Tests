import { FC } from "react";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  StyledEllipsingTextContainer,
  TypographySkeleton,
} from "@benbeck764/react-components/common";
import { ArtistCardProps } from "./ArtistCard";
import { getArtistUrl } from "../../../../routing/common/url";
import { AppLink } from "../../AppLink";

const ArtistCardTrack: FC<ArtistCardProps> = (props: ArtistCardProps) => {
  const theme = useTheme();

  if (props.loadingPlaceholder) {
    return (
      <Box
        sx={{
          p: 1,
          borderRadius: "4px",
        }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Skeleton variant="circular" width={80} height={80} />
          <Stack>
            <TypographySkeleton variant="paragraphSmallBold" charCount={6} />
            <TypographySkeleton
              variant="paragraphBold"
              charCount={12}
              charCountVariance={6}
            />
          </Stack>
        </Stack>
      </Box>
    );
  } else {
    const { artist } = props;

    return (
      <Box
        sx={{
          p: 1,
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: (theme) => theme.palette.coolGrey[800],
          },
        }}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Avatar sx={{ width: 80, height: 80 }} src={artist.images[0]?.url} />
          <Stack>
            <Typography variant="paragraphSmallBold">Artist</Typography>
            <StyledEllipsingTextContainer
              lines={1}
              reserveHeight={
                +(
                  theme.typography.paragraphBold.lineHeight
                    ?.toString()
                    .replace("px", "") || 0
                )
              }
            >
              <AppLink to={getArtistUrl(artist.id)} state={artist}>
                <Typography variant="paragraphBold">{artist.name}</Typography>
              </AppLink>
            </StyledEllipsingTextContainer>
          </Stack>
        </Stack>
      </Box>
    );
  }
};

export default ArtistCardTrack;
