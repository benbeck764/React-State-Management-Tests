import { FC } from "react";
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
  usePausePlaybackMutation,
  useSeekMutation,
  useSetPlaybackVolumeMutation,
  useNextMutation,
  usePreviousMutation,
} from "../../state/queries/player.api";
import { debounce } from "@mui/material/utils";
import { AppRootState, useAppSelector } from "../../state/store";
import PlayerTrackPosition from "./components/PlayerTrackPosition";
import PlayerVolume from "./components/PlayerVolume";
import { SpotifyTrack } from "../../state/queries/models/spotify.models";

const Player: FC = () => {
  // [NB]: No longer using returned Player, rather use Web API for everything...
  useSpotifyWebPlayback();

  const [previous] = usePreviousMutation();
  const [next] = useNextMutation();
  const [seek] = useSeekMutation();
  const [startOrResumePlayback] = useStartOrResumePlaybackMutation();
  const [pausePlayback] = usePausePlaybackMutation();
  const [toggleShuffe] = useToggleShuffleMutation();
  const [toggleRepeatMode] = useSetRepeatModeMutation();
  const [setVolume] = useSetPlaybackVolumeMutation();

  const { data: currentlyPlayingRes } = useGetCurrentPlayingStateQuery();
  const { data: recentlyPlayedRes } = useGetRecentlyPlayedQuery({ limit: 1 });

  const playerState = useAppSelector((s: AppRootState) => s.player);
  const { playbackState, deviceId } = playerState;

  // [TODO]: Do this for now, implement Episodes laer?t
  const item =
    (playbackState?.item as SpotifyTrack) ??
    (((currentlyPlayingRes?.item as unknown) ??
      recentlyPlayedRes?.items?.[0]?.track) as SpotifyTrack);

  const handlePrevious = async (): Promise<void> => {
    if (deviceId) await previous({ deviceId });
  };

  const handleNext = async (): Promise<void> => {
    if (deviceId) await next({ deviceId });
  };

  const handleResume = debounce(async (): Promise<void> => {
    if (playbackState && deviceId) {
      startOrResumePlayback({
        device_id: deviceId,
      });
    }
  }, 150);

  const handlePause = debounce(async (): Promise<void> => {
    if (deviceId) await pausePlayback(deviceId);
  }, 150);

  const handleSeek = debounce(async (ms: number | number[]): Promise<void> => {
    if (playbackState && deviceId) {
      seek({
        deviceId,
        position: ms as number,
      });
    }
  }, 150);

  const handleToggleShuffle = debounce(async (): Promise<void> => {
    if (deviceId && playbackState)
      await toggleShuffe({ deviceId, state: !playbackState.shuffle_state });
  }, 150);

  const handleToggleRepeatMode = debounce(async (): Promise<void> => {
    if (deviceId && playbackState) {
      if (playbackState.repeat_state === "off") {
        await toggleRepeatMode({ deviceId, state: "context" });
      } else if (playbackState.repeat_state === "context") {
        await toggleRepeatMode({ deviceId, state: "track" });
      } else if (playbackState.repeat_state === "track") {
        await toggleRepeatMode({ deviceId, state: "off" });
      }
    }
  }, 150);

  const handleVolumeChange = debounce(async (volume: number): Promise<void> => {
    if (deviceId) await setVolume({ volumePercent: volume, deviceId });
  }, 100);

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
                          variant="paragraphExtraSmall"
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
                          playbackState?.shuffle_state === true
                            ? theme.palette.primary.main
                            : theme.palette.grey[300],
                        "&:hover": {
                          color: (theme) =>
                            playbackState?.shuffle_state === true
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

                  {playbackState?.is_playing ? (
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
                    {(playbackState?.repeat_state === "off" ||
                      playbackState?.repeat_state === "context") && (
                      <RepeatIcon
                        sx={{
                          fontSize: "20px",
                          color: (theme) =>
                            playbackState?.repeat_state === "off"
                              ? theme.palette.grey[300]
                              : theme.palette.primary.main,
                          "&:hover": {
                            color: (theme) =>
                              playbackState?.repeat_state === "off"
                                ? theme.palette.text.primary
                                : theme.palette.primary.dark,
                          },
                        }}
                      />
                    )}
                    {playbackState?.repeat_state === "track" && (
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
                <PlayerVolume
                  playerVolume={playbackState?.device?.volume_percent ?? 100}
                  onVolumeChange={async (volume: number | number[]) =>
                    handleVolumeChange(volume as number)
                  }
                />
              </Stack>
            </Grid>
          </Grid>
        )}
      </StyledPlayerContainer>
    </StyledPlayerWrapper>
  );
};

export default Player;
