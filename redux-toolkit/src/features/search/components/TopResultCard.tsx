import { FC, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  TypographySkeleton,
  StyledEllipsingTextContainer,
} from "@benbeck764/react-components";
import AppChip from "@benbeck764/react-components/Chip";
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import { getArtistUrl } from "../../../routing/common/url";
import { AppLink } from "../../common/AppLink";
import { StyledCard } from "../../common/common.styles";
import { useHovered } from "../../../utilities/hooks/useHovered";
import { useAppSelector, AppRootState } from "../../../state/store";
import PlayButton from "../../player/PlayButton";

type TopResultCardProps = {
  artist?: SpotifyArtist;
  loading: boolean;
};

const TopResultCard: FC<TopResultCardProps> = (props: TopResultCardProps) => {
  const { artist: topArtist, loading } = props;
  const theme = useTheme();
  const cardFocusRef = useRef<HTMLDivElement>();
  const hovered = useHovered(cardFocusRef);

  const playbackState = useAppSelector(
    (s: AppRootState) => s.player.playbackState
  );

  if (!topArtist || loading) {
    return (
      <>
        <Typography variant="h5">Top result</Typography>
        <StyledCard height="100%">
          <Stack gap={2}>
            <Skeleton variant="circular" width={100} height={100} />
            <TypographySkeleton
              variant="h4"
              charCount={12}
              charCountVariance={6}
              lines={1}
            />
            <Skeleton
              variant="rounded"
              width={60}
              height={32}
              sx={{ borderRadius: "500px" }}
            />
          </Stack>
        </StyledCard>
      </>
    );
  } else {
    const isCurrentArtist =
      playbackState !== null && topArtist.uri === playbackState.context?.uri;

    const artistPlaying = isCurrentArtist && playbackState.is_playing;

    return (
      <>
        <Typography variant="h5">Top result</Typography>
        <Box sx={{ position: "relative" }} height="100%" ref={cardFocusRef}>
          <AppLink
            to={getArtistUrl(topArtist.id)}
            sx={{
              height: "100%",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            <StyledCard height="100%">
              <Stack gap={2}>
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={topArtist.images?.[0]?.url}
                />
                <StyledEllipsingTextContainer
                  lines={1}
                  reserveHeight={
                    +(
                      theme.typography.h4.lineHeight
                        ?.toString()
                        .replace("px", "") || 0
                    )
                  }
                >
                  <Typography variant="h4">{topArtist.name}</Typography>
                </StyledEllipsingTextContainer>
                <AppChip
                  sx={{ width: 60 }}
                  label={
                    <Typography variant="paragraphBold">Artist</Typography>
                  }
                />
              </Stack>
            </StyledCard>
          </AppLink>
          {(hovered || artistPlaying) && (
            <PlayButton
              variant="action-button"
              type="artist"
              dataUri={topArtist.uri}
              sx={{ position: "absolute", bottom: 15, right: 15, zIndex: 1052 }}
              stopPropagation
            />
          )}
        </Box>
      </>
    );
  }
};

export default TopResultCard;
