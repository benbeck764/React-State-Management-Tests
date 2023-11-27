import { useRef } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  StyledEllipsingTextContainer,
  TypographySkeleton,
} from "@benbeck764/react-components/common";
import PlayButton from "../../../player/PlayButton";
import { useHovered } from "../../../../utilities/hooks/useHovered";
import { AppRootState, useAppSelector } from "../../../../state/store";
import { formatAsTrackDurationString } from "../../../../utilities/time";
import { TrackCardProps } from "./TrackCard";
import { getArtistUrl, getTrackUrl } from "../../../../routing/common/url";
import { SpotifyArtist } from "../../../../state/queries/models/spotify.models";
import { AppLink } from "../../AppLink";

const TrackCardSearch = (props: TrackCardProps) => {
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
            <Skeleton variant="rectangular" height={40} width={40} />
            <Stack>
              <TypographySkeleton
                variant="paragraphBold"
                charCount={15}
                charCountVariance={8}
              />
              <TypographySkeleton
                variant="paragraphSmall"
                charCount={15}
                charCountVariance={8}
              />
            </Stack>
          </Stack>
          <Stack>
            <TypographySkeleton variant="paragraph" charCount={5} />
          </Stack>
        </Stack>
      </Box>
    );
  } else {
    const { track, playType } = props;

    const isCurrentTrack =
      playbackState !== null && track.uri === playbackState.item?.uri;

    return (
      <Box
        ref={cardFocusRef}
        sx={{
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.default,
          "&:hover": {
            backgroundColor: theme.palette.coolGrey[800],
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Stack direction="row" alignItems="center" gap={1.75}>
            <Box position="relative" height={40} width={40}>
              <Box
                component="img"
                height={40}
                width={40}
                src={track.album.images[0].url}
                sx={{ borderRadius: "4px", opacity: hovered ? 0.4 : 1 }}
              />
              {hovered && (
                <>
                  {playType === "track" && (
                    <PlayButton
                      type="track"
                      variant="button"
                      dataUri={track.uri}
                      size="large"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      tooltipText={`Play ${track.name} by ${track.artists
                        .map((a: SpotifyArtist) => a.name)
                        .join(", ")}`}
                    />
                  )}
                </>
              )}
            </Box>

            <Stack>
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
              <StyledEllipsingTextContainer
                lines={1}
                reserveHeight={
                  +(
                    theme.typography.paragraphSmall.lineHeight
                      ?.toString()
                      .replace("px", "") || 0
                  )
                }
                sx={{
                  height: "unset",
                  color: (theme) =>
                    hovered
                      ? theme.palette.text.primary
                      : theme.palette.grey[400],
                }}
              >
                {track.artists.map(
                  (artist: SpotifyArtist, artistIndex: number) => (
                    <AppLink
                      key={artist.id}
                      to={getArtistUrl(artist.id)}
                      state={artist}
                      sx={{
                        display: "inline-block",
                        ml: artistIndex === 0 ? 0 : 0.5,
                      }}
                    >
                      <Typography
                        variant="paragraphSmall"
                        sx={{
                          color: (theme) =>
                            hovered
                              ? theme.palette.text.primary
                              : theme.palette.grey[400],
                        }}
                      >
                        {artist.name}
                        {artistIndex < track.artists.length - 1 && ","}
                      </Typography>
                    </AppLink>
                  )
                )}
              </StyledEllipsingTextContainer>
            </Stack>
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

export default TrackCardSearch;
