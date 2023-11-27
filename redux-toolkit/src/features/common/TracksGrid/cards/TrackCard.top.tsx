import { useRef } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  StyledEllipsingTextContainer,
  TypographySkeleton,
} from "@benbeck764/react-components/common";
import PlayButton from "../../../player/PlayButton";
import Equalizer from "../../Equalizer";
import { useHovered } from "../../../../utilities/hooks/useHovered";
import { AppRootState, useAppSelector } from "../../../../state/store";
import { formatAsTrackDurationString } from "../../../../utilities/time";
import { TrackCardProps } from "./TrackCard";
import { getTrackUrl } from "../../../../routing/common/url";
import { AppLink } from "../../AppLink";

const TrackCardTopTracks = (props: TrackCardProps) => {
  const theme = useTheme();
  const cardFocusRef = useRef<HTMLDivElement>();
  const hovered = useHovered(cardFocusRef);

  const playbackState = useAppSelector(
    (s: AppRootState) => s.player.playbackState
  );

  if (props.loadingPlaceholder) {
    return (
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1}
        >
          <Stack direction="row" alignItems="center" gap={1.75}>
            <TypographySkeleton variant="paragraph" charCount={1} />
            <Skeleton variant="rectangular" height={40} width={40} />
            <TypographySkeleton
              variant="paragraphBold"
              charCount={15}
              charCountVariance={8}
            />
          </Stack>
          <Stack>
            <TypographySkeleton variant="paragraph" charCount={5} />
          </Stack>
        </Stack>
      </Box>
    );
  } else {
    const { track, index, playType } = props;

    const isCurrentTrack =
      playbackState !== null && track.uri === playbackState.item?.uri;

    const trackPlaying = isCurrentTrack && playbackState.is_playing;

    return (
      <Box
        ref={cardFocusRef}
        sx={{
          "&:hover": {
            backgroundColor: theme.palette.coolGrey[800],
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1}
        >
          <Stack direction="row" alignItems="center" gap={1.75}>
            <Stack justifyContent="center" width="14px">
              {hovered ? (
                <>
                  {playType === "artist" && (
                    <PlayButton
                      type="artist"
                      variant="button"
                      dataUri={track.artists?.[0].uri}
                      offsetUri={track.uri}
                    />
                  )}
                  {playType === "album" && (
                    <PlayButton
                      type="album"
                      variant="button"
                      dataUri={track.album.uri}
                      offsetUri={track.uri}
                    />
                  )}
                  {playType === "track" && (
                    <PlayButton
                      type="track"
                      variant="button"
                      dataUri={track.uri}
                    />
                  )}
                </>
              ) : (
                <>
                  {trackPlaying ? (
                    <Equalizer />
                  ) : (
                    <Typography>{(index ?? 0) + 1}</Typography>
                  )}
                </>
              )}
            </Stack>
            <Box
              component="img"
              src={track.album.images?.[0]?.url}
              height={40}
              width={40}
              sx={{ borderRadius: "4px" }}
            />
            <AppLink to={getTrackUrl(track.id)} state={track}>
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
                <Typography
                  variant="paragraphBold"
                  sx={{
                    color: (theme) =>
                      isCurrentTrack
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                  }}
                >
                  {track.name}
                </Typography>
              </StyledEllipsingTextContainer>
            </AppLink>
          </Stack>
          <Stack>
            <Typography
              variant="paragraph"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              {formatAsTrackDurationString(track.duration_ms)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    );
  }
};

export default TrackCardTopTracks;
