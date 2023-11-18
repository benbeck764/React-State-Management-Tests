import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  StyledEllipsingTextContainer,
  TypographySkeleton,
} from "@benbeck764/react-components/common";
import { SpotifyAlbum } from "../../../state/queries/models/spotify.models";
import { StyledCard } from "../common.styles";
import { capitalize } from "@mui/material/utils";
import PlayButton from "../../player/PlayButton";
import Box from "@mui/material/Box";
import { useRef } from "react";
import { useHovered } from "../../../utilities/hooks/useHovered";
import { useAppSelector, AppRootState } from "../../../state/store";
import Equalizer from "../Equalizer";

type AlbumCardProps =
  | {
      album: SpotifyAlbum;
      loadingPlaceholder?: never;
    }
  | {
      album?: SpotifyAlbum;
      loadingPlaceholder: true;
    };

const AlbumCard = (props: AlbumCardProps) => {
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
            charCount={18}
            charCountVariance={8}
            lines={2}
            sx={{ textAlign: "center" }}
          />
        </Stack>
      </StyledCard>
    );
  } else {
    const { album } = props;

    const isCurrentAlbum =
      typeof playbackState !== "undefined" &&
      album.uri === playbackState.context.uri;

    const albumPlaying = isCurrentAlbum && playbackState.paused === false;

    return (
      <StyledCard ref={cardFocusRef}>
        <Stack alignItems="center" gap={2}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              variant="rounded"
              sx={{ width: 150, height: 150, position: "relative" }}
              src={album.images[0].url}
            />
            {(albumPlaying || hovered) && (
              <PlayButton
                variant="action-button"
                type="album"
                dataUri={album.uri}
                sx={{ position: "absolute", bottom: 8, right: 8 }}
                stopPropagation
              />
            )}
          </Box>

          <StyledEllipsingTextContainer
            lines={1}
            reserveHeight={
              +(
                theme.typography.paragraphLarge.lineHeight
                  ?.toString()
                  .replace("px", "") || 0
              )
            }
          >
            <Typography variant="paragraphLarge" align="center">
              {album.name}
            </Typography>
          </StyledEllipsingTextContainer>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Typography
              variant="paragraph"
              align="center"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              {`${new Date(album.release_date).getFullYear()} • ${capitalize(
                album.album_type
              )}`}
            </Typography>
            {albumPlaying && <Equalizer />}
          </Stack>
        </Stack>
      </StyledCard>
    );
  }
};

export default AlbumCard;
