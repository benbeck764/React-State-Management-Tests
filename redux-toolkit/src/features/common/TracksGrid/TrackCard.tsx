import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import Box from "@mui/material/Box";
import PlayButton, { PlayButtonPlayType } from "../../player/PlayButton";
import Equalizer from "../Equalizer";
import { useHovered } from "../../../utilities/hooks/useHovered";
import { useRef } from "react";
import { AppRootState, useAppSelector } from "../../../state/store";
import { formatMilliseconds } from "../../../utilities/number";

type TrackCardProps =
  | {
      track: SpotifyTrack;
      index: number;
      playType: PlayButtonPlayType;
      loadingPlaceholder?: never;
    }
  | {
      track?: never;
      index?: never;
      playType?: never;
      loadingPlaceholder: true;
    };

const TrackCard = (props: TrackCardProps) => {
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
      playbackState !== null && track.uri === playbackState.item.uri;

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
                    ></PlayButton>
                  )}
                  {playType === "album" && (
                    <PlayButton
                      type="album"
                      variant="button"
                      dataUri={track.album.uri}
                      offsetUri={track.uri}
                    ></PlayButton>
                  )}
                  {playType === "track" && (
                    <PlayButton
                      type="track"
                      variant="button"
                      dataUri={track.uri}
                    ></PlayButton>
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
              src={track.album.images[0].url}
              height={40}
              width={40}
              sx={{ borderRadius: "4px" }}
            ></Box>
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
