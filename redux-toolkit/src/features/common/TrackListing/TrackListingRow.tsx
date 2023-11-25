import { FC, useRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { StyledEllipsingTextContainer } from "@benbeck764/react-components/common";
import {
  SimplifiedSpotifyTrack,
  SpotifyAlbum,
  SpotifyArtist,
} from "../../../state/queries/models/spotify.models";
import { AppLink } from "../AppLink";
import { getArtistUrl, getTrackUrl } from "../../../routing/common/url";
import { formatMilliseconds } from "../../../utilities/number";
import { useAppSelector, AppRootState } from "../../../state/store";
import Equalizer from "../Equalizer";
import { useHovered } from "../../../utilities/hooks/useHovered";
import PlayButton from "../../player/PlayButton";

type TrackListingRowProps = {
  album: SpotifyAlbum;
  track: SimplifiedSpotifyTrack;
};

const TrackListingRow: FC<TrackListingRowProps> = (
  props: TrackListingRowProps
) => {
  const { album, track } = props;
  const theme = useTheme();
  const rowRef = useRef<HTMLDivElement>(null);
  const hovered = useHovered(rowRef);

  const playbackState = useAppSelector(
    (s: AppRootState) => s.player.playbackState
  );

  const isCurrentTrack =
    playbackState !== null && track.uri === playbackState.item?.uri;

  const trackPlaying = isCurrentTrack && playbackState.is_playing;

  return (
    <Stack
      ref={rowRef}
      direction="row"
      key={track.track_number}
      alignItems="center"
      justifyContent="space-between"
      p={1}
      sx={{
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: (theme) => theme.palette.coolGrey[800],
        },
      }}
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <Stack justifyContent="center" width="14px">
          {hovered ? (
            <PlayButton
              type="track"
              variant="button"
              dataUri={album.uri}
              offsetUri={track.uri}
            />
          ) : (
            <>
              {trackPlaying ? (
                <Equalizer />
              ) : (
                <Typography
                  variant={isCurrentTrack ? "paragraphBold" : "paragraph"}
                  sx={{
                    color: (theme) =>
                      isCurrentTrack
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    width: "14px",
                  }}
                >
                  {track.track_number}
                </Typography>
              )}
            </>
          )}
        </Stack>
        <Stack>
          <AppLink to={getTrackUrl(track.id)} state={track}>
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
          </AppLink>
          <StyledEllipsingTextContainer
            lines={1}
            reserveHeight={
              +(
                theme.typography.paragraph.lineHeight
                  ?.toString()
                  .replace("px", "") || 0
              )
            }
            sx={{
              height: "unset",
              color: (theme) =>
                hovered ? theme.palette.text.primary : theme.palette.grey[400],
            }}
          >
            {track.artists.map((artist: SpotifyArtist, artistIndex: number) => (
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
                  variant="paragraph"
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
            ))}
          </StyledEllipsingTextContainer>
        </Stack>
      </Stack>
      <Typography
        variant="paragraph"
        sx={{ color: (theme) => theme.palette.grey[400] }}
      >
        {formatMilliseconds(track.duration_ms)}
      </Typography>
    </Stack>
  );
};

export default TrackListingRow;
