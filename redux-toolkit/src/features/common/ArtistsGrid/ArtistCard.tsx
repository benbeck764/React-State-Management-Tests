import { FC, useRef } from "react";
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
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import { StyledCard } from "../common.styles";
import { useHovered } from "../../../utilities/hooks/useHovered";
import PlayButton from "../../player/PlayButton";
import { useAppSelector, AppRootState } from "../../../state/store";

type ArtistCardProps =
  | {
      artist: SpotifyArtist;
      loadingPlaceholder?: never;
    }
  | {
      artist?: SpotifyArtist;
      loadingPlaceholder: true;
    };

const ArtistCard: FC<ArtistCardProps> = (props: ArtistCardProps) => {
  const theme = useTheme();
  const cardFocusRef = useRef<HTMLDivElement>();
  const hovered = useHovered(cardFocusRef);
  const playbackState = useAppSelector(
    (s: AppRootState) => s.player.playbackState
  );

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

    const isCurrentArtist =
      playbackState !== null && artist.uri === playbackState.context.uri;

    const artistPlaying = isCurrentArtist && playbackState.is_playing;

    return (
      <StyledCard ref={cardFocusRef}>
        <Stack alignItems="center" gap={2}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{ width: 150, height: 150 }}
              src={artist.images[0].url}
            />
            {(hovered || artistPlaying) && (
              <PlayButton
                variant="action-button"
                type="artist"
                dataUri={artist.uri}
                sx={{ position: "absolute", bottom: 0, right: 0 }}
                stopPropagation
              />
            )}
          </Box>
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
            <Typography variant="paragraphLarge">{artist.name}</Typography>
          </StyledEllipsingTextContainer>
        </Stack>
      </StyledCard>
    );
  }
};

export default ArtistCard;
