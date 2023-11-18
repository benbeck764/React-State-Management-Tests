import { FC, useEffect } from "react";
import {
  StyledPlayerContainer,
  StyledPlayerWrapper,
  StyledPlayerButton,
} from "./Player.styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { AppLink } from "../common/AppLink";
import { getAlbumUrl, getArtistUrl } from "../../routing/common/url";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import useSpotifyWebPlayback from "./useSpotifyWebPlayback";
import {
  useGetCurrentPlayingStateQuery,
  useGetRecentlyPlayedQuery,
  useStartOrResumePlaybackMutation,
  useToggleShuffleMutation,
  useSetRepeatModeMutation,
} from "../../state/queries/player.api";
import { debounce } from "@mui/material/utils";
import { AppRootState, useAppSelector } from "../../state/store";
import PlayerTrackPosition from "./components/PlayerTrackPosition";
import PlayerVolume from "./components/PlayerVolume";

const Player: FC = () => {
  const player = useSpotifyWebPlayback();
  const [startOrResumePlayback] = useStartOrResumePlaybackMutation();
  const [toggleShuffe] = useToggleShuffleMutation();
  const [toggleRepeatMode] = useSetRepeatModeMutation();

  const { data: currentlyPlayingRes } = useGetCurrentPlayingStateQuery();
  const { data: recentlyPlayedRes } = useGetRecentlyPlayedQuery({ limit: 1 });

  const playerState = useAppSelector((s: AppRootState) => s.player);
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

  const handleToggleShuffle = debounce(async (): Promise<void> => {
    if (deviceId && playbackState)
      await toggleShuffe({ deviceId, state: !playbackState.shuffle });
  }, 200);

  const handleToggleRepeatMode = debounce(async (): Promise<void> => {
    if (deviceId && playbackState) {
      if (playbackState.repeat_mode === 0) {
        await toggleRepeatMode({ deviceId, state: "context" });
      } else if (playbackState.repeat_mode === 1) {
        await toggleRepeatMode({ deviceId, state: "track" });
      } else if (playbackState.repeat_mode === 2) {
        await toggleRepeatMode({ deviceId, state: "off" });
      }
    }
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
                  <StyledPlayerButton onClick={handleToggleShuffle}>
                    <ShuffleIcon
                      sx={{
                        fontSize: "20px",
                        color: (theme) =>
                          playbackState?.shuffle === true
                            ? theme.palette.primary.main
                            : theme.palette.grey[300],
                        "&:hover": {
                          color: (theme) =>
                            playbackState?.shuffle === true
                              ? theme.palette.primary.dark
                              : theme.palette.text.primary,
                        },
                      }}
                    />
                  </StyledPlayerButton>

                  <StyledPlayerButton onClick={handlePrevious}>
                    <SkipPreviousIcon
                      sx={{
                        fontSize: "26px",
                        color: (theme) => theme.palette.grey[300],
                        "&:hover": {
                          color: (theme) => theme.palette.text.primary,
                        },
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
                        color: (theme) => theme.palette.grey[300],
                        "&:hover": {
                          color: (theme) => theme.palette.text.primary,
                        },
                      }}
                    />
                  </StyledPlayerButton>

                  <StyledPlayerButton onClick={handleToggleRepeatMode}>
                    {(playbackState?.repeat_mode === 0 ||
                      playbackState?.repeat_mode === 1) && (
                      <RepeatIcon
                        sx={{
                          fontSize: "20px",
                          color: (theme) =>
                            playbackState?.repeat_mode === 0
                              ? theme.palette.grey[300]
                              : theme.palette.primary.main,
                          "&:hover": {
                            color: (theme) =>
                              playbackState?.repeat_mode === 0
                                ? theme.palette.text.primary
                                : theme.palette.primary.dark,
                          },
                        }}
                      />
                    )}
                    {playbackState?.repeat_mode === 2 && (
                      <RepeatOneIcon
                        sx={{
                          fontSize: "20px",
                          color: (theme) => theme.palette.primary.main,
                          "&:hover": {
                            color: (theme) => theme.palette.primary.dark,
                          },
                        }}
                      />
                    )}
                  </StyledPlayerButton>
                </Stack>
                <PlayerTrackPosition
                  playbackState={playbackState}
                  track={item}
                  onSeek={handleSeek}
                />
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack
                mt={2}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                height="100%"
              >
                <PlayerVolume volume={100} onVolumeChange={() => void 0} />
              </Stack>
            </Grid>
          </Grid>
        )}
      </StyledPlayerContainer>
    </StyledPlayerWrapper>
  );
};

export default Player;
