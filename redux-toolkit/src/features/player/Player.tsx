import { FC, useEffect } from "react";
import {
  StyledPlayerContainer,
  StyledPlayerWrapper,
  StyledPlayerButton,
  StyledTrackTimeSlider,
} from "./Player.styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { AppLink } from "../common/AppLink";
import { getAlbumUrl, getArtistUrl } from "../../routing/common/url";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import useSpotifyWebPlayback from "./useSpotifyWebPlayback";
import {
  useGetCurrentPlayingStateQuery,
  useGetRecentlyPlayedQuery,
  useStartOrResumePlaybackMutation,
} from "../../state/queries/player.api";
import { formatMilliseconds } from "../../utilities/number";
import { debounce } from "@mui/material/utils";
import { RootState, useAppSelector } from "../../state/store";

const Player: FC = () => {
  const player = useSpotifyWebPlayback();
  const [startOrResumePlayback] = useStartOrResumePlaybackMutation();
  const { data: currentlyPlayingRes } = useGetCurrentPlayingStateQuery();
  const { data: recentlyPlayedRes } = useGetRecentlyPlayedQuery({ limit: 1 });
  const playerState = useAppSelector((s: RootState) => s.player);
  const { playbackState, deviceId } = playerState;

  // [TODO]: Do this for now, implement Episodes later?
  const item =
    playbackState?.track_window.current_track ??
    (((currentlyPlayingRes?.item as unknown) ??
      recentlyPlayedRes?.items?.[0]?.track) as Spotify.Track);

  useEffect(() => {
    if (currentlyPlayingRes && deviceId) {
      startOrResumePlayback({
        device_id: deviceId,
        context_uri: currentlyPlayingRes.context.uri,
        position_ms: currentlyPlayingRes.progress_ms,
        offset:
          currentlyPlayingRes.currently_playing_type === "track"
            ? {
                uri: currentlyPlayingRes.item.uri,
              }
            : undefined,
      });
    } else if (recentlyPlayedRes?.items?.[0] && deviceId) {
      const history = recentlyPlayedRes.items[0];
      if (history && history.context) {
        startOrResumePlayback({
          device_id: deviceId,
          context_uri: history.context.uri,
        });
      }
    }
  }, [recentlyPlayedRes, currentlyPlayingRes, deviceId, startOrResumePlayback]);

  const handlePrevious = debounce(async (): Promise<void> => {
    if (player) await player.previousTrack();
  }, 200);

  const handleNext = debounce(async (): Promise<void> => {
    if (player) await player.nextTrack();
  }, 200);

  const handleResume = debounce(async (): Promise<void> => {
    if (player) await player.resume();
  }, 200);

  const handlePause = debounce(async (): Promise<void> => {
    if (player) await player.pause();
  }, 200);

  const handleSeek = debounce(async (ms: number | number[]): Promise<void> => {
    if (player) await player.seek(ms as number);
  }, 200);

  return (
    <StyledPlayerWrapper>
      <StyledPlayerContainer>
        {item && (
          <Grid container height="100%" alignItems="center">
            <Grid item xs={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap={2}
              >
                <Avatar
                  variant="rounded"
                  src={item.album.images[0].url}
                  sx={{ width: 57.5, height: 57.5 }}
                />
                <Stack>
                  <AppLink
                    to={getAlbumUrl(item.album.uri.split(":")[2])}
                    state={item.album}
                  >
                    <Typography variant="paragraph">{item.name}</Typography>
                  </AppLink>
                  <Stack direction="row" gap={0.5}>
                    {item.artists.map((artist, artistIndex: number) => (
                      <AppLink
                        key={artist.uri}
                        to={getArtistUrl(artist.uri.split(":")[2])}
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
                          {artistIndex < item.artists.length - 1 && ","}
                        </Typography>
                      </AppLink>
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack gap={0.5}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                  gap={1.5}
                >
                  <StyledPlayerButton onClick={handlePrevious}>
                    <SkipPreviousIcon
                      sx={{
                        fontSize: "26px",
                        color: (theme) => theme.palette.text.primary,
                      }}
                    />
                  </StyledPlayerButton>

                  {!playbackState?.paused ? (
                    <StyledPlayerButton onClick={handlePause}>
                      <PauseCircleIcon
                        sx={{
                          fontSize: "40px",
                          color: (theme) => theme.palette.text.primary,
                        }}
                      />
                    </StyledPlayerButton>
                  ) : (
                    <StyledPlayerButton onClick={handleResume}>
                      <PlayCircleIcon
                        sx={{
                          fontSize: "40px",
                          color: (theme) => theme.palette.text.primary,
                        }}
                      />
                    </StyledPlayerButton>
                  )}
                  <StyledPlayerButton onClick={handleNext}>
                    <SkipNextIcon
                      sx={{
                        fontSize: "26px",
                        color: (theme) => theme.palette.text.primary,
                      }}
                    />
                  </StyledPlayerButton>
                </Stack>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography
                    variant="paragraphExtraSmall"
                    sx={{ color: (theme) => theme.palette.grey[400] }}
                  >
                    {formatMilliseconds(playbackState?.position ?? 0)}
                  </Typography>
                  <StyledTrackTimeSlider
                    aria-label="Track Position"
                    defaultValue={0}
                    value={playbackState?.position ?? 0}
                    min={0}
                    max={item.duration_ms}
                    step={1000}
                    onChangeCommitted={(_, val: number | number[]) =>
                      handleSeek(val)
                    }
                  />
                  <Typography
                    variant="paragraphExtraSmall"
                    sx={{ color: (theme) => theme.palette.grey[400] }}
                  >
                    {formatMilliseconds(item.duration_ms)}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={4}></Grid>
          </Grid>
        )}
      </StyledPlayerContainer>
    </StyledPlayerWrapper>
  );
};

export default Player;
