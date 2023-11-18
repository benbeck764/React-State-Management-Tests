import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import Box from "@mui/material/Box";
import PlayButton from "../../player/PlayButton";
import Equalizer from "../Equalizer";
import { useHovered } from "../../../utilities/hooks/useHovered";
import { useRef } from "react";
import { RootState, useAppSelector } from "../../../state/store";
import { formatMilliseconds } from "../../../utilities/number";

type TrackCardProps =
  | {
      track: SpotifyTrack;
      index: number;
      loadingPlaceholder?: never;
    }
  | {
      track?: SpotifyTrack;
      index?: never;
      loadingPlaceholder: true;
    };

const TrackCard = (props: TrackCardProps) => {
  const theme = useTheme();
  const cardFocusRef = useRef<HTMLDivElement>();
  const hovered = useHovered(cardFocusRef);

  const playbackState = useAppSelector(
    (s: RootState) => s.player.playbackState
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
    const { track, index } = props;

    const isCurrentTrack =
      typeof playbackState !== "undefined" &&
      playbackState.context?.uri &&
      track.uri === playbackState.track_window.current_track.uri;

    const trackPlaying = isCurrentTrack && playbackState.paused === false;

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
                <PlayButton
                  type="track"
                  variant="button"
                  albumDataUri={track.album.uri}
                  trackDataUri={track.uri}
                ></PlayButton>
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
              src={track.album.images[0].url}
              height={40}
              width={40}
              sx={{ borderRadius: "4px" }}
            ></Box>
            <Typography variant="paragraphBold">{track.name}</Typography>
          </Stack>
          <Stack>
            <Typography
              variant="paragraph"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              {formatMilliseconds(track.duration_ms)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    );
  }
};

export default TrackCard;
