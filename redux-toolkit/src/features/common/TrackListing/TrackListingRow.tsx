import { FC, useRef } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  SimplifiedSpotifyTrack,
  SpotifyAlbum,
  SpotifyArtist,
} from "../../../state/queries/models/spotify.models";
import { AppLink } from "../AppLink";
import { getArtistUrl } from "../../../routing/common/url";
import { formatMilliseconds } from "../../../utilities/number";
import { useAppSelector, RootState } from "../../../state/store";
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
  const rowRef = useRef<HTMLDivElement>(null);
  const hovered = useHovered(rowRef);

  const playbackState = useAppSelector(
    (s: RootState) => s.player.playbackState
  );

  const isCurrentTrack =
    typeof playbackState !== "undefined" &&
    playbackState.context?.uri &&
    track.uri === playbackState.track_window.current_track.uri;

  const trackPlaying = isCurrentTrack && playbackState.paused === false;

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
              albumDataUri={album.uri}
              trackDataUri={track.uri}
            ></PlayButton>
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
                  }}
                >
                  {track.track_number}
                </Typography>
              )}
            </>
          )}
        </Stack>
        <Stack>
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
          <Stack direction="row" gap={0.5}>
            {track.artists.map((artist: SpotifyArtist, artistIndex: number) => (
              <AppLink
                key={artist.id}
                to={getArtistUrl(artist.id)}
                state={artist}
                sx={{ display: "inline-block" }}
              >
                <Typography
                  variant="paragraph"
                  sx={{
                    color: (theme) => theme.palette.grey[400],
                  }}
                >
                  {artist.name}
                  {artistIndex < track.artists.length - 1 && ","}
                </Typography>
              </AppLink>
            ))}
          </Stack>
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
