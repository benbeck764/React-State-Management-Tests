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
import { useHovered } from "../../../../utilities/hooks/useHovered";
import PlayButton from "../../../player/PlayButton";
import { useAppSelector, AppRootState } from "../../../../state/store";
import { ArtistCardProps } from "./ArtistCard";
import Equalizer from "../../Equalizer";

const ArtistCardSmall: FC<ArtistCardProps> = (props: ArtistCardProps) => {
  const theme = useTheme();
  const cardFocusRef = useRef<HTMLDivElement>();
  const hovered = useHovered(cardFocusRef);
  const playbackState = useAppSelector(
    (s: AppRootState) => s.player.playbackState
  );

  if (props.loadingPlaceholder) {
    return (
      <Box
        sx={{
          p: 0,
          borderRadius: "4px",
        }}
      >
        <Stack
          direction="row"
          position="relative"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Skeleton variant="rounded" width={48} height={48} />
            <TypographySkeleton
              variant="paragraphBold"
              charCount={12}
              charCountVariance={6}
              lines={1}
            />
          </Stack>
        </Stack>
      </Box>
    );
  } else {
    const { artist } = props;

    const isCurrentArtist =
      playbackState !== null && artist.uri === playbackState.context?.uri;

    const artistPlaying = isCurrentArtist && playbackState.is_playing;

    return (
      <Box
        ref={cardFocusRef}
        sx={{
          p: 0,
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: theme.palette.coolGrey[800],
          },
        }}
      >
        <Stack
          direction="row"
          position="relative"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar
              variant="rounded"
              sx={{ width: 48, height: 48 }}
              src={artist.images[0].url}
            />
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
              <Typography variant="paragraphBold">{artist.name}</Typography>
            </StyledEllipsingTextContainer>
          </Stack>
          <Box pr={1.5}>
            {hovered && (
              <PlayButton
                variant="action-button"
                size="small"
                type="artist"
                dataUri={artist.uri}
                stopPropagation
                sx={{ position: "absolute", bottom: 6, right: 6 }}
              />
            )}
            {artistPlaying && !hovered && <Equalizer />}
          </Box>
        </Stack>
      </Box>
    );
  }
};

export default ArtistCardSmall;
