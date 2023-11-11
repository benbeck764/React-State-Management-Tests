import { FC } from "react";
import { StyledPlayerContainer, StyledPlayerWrapper } from "./Player.styles";
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
import IconButton from "@mui/material/IconButton";
import useSpotifyWebPlayback from "./useSpotifyWebPlayback";

const Player: FC = () => {
  const { player, state } = useSpotifyWebPlayback();
  // [TODO]: Do this for now, implement Episodes later?

  const item = state?.track_window.current_track;

  const handlePrevious = async (): Promise<void> => {
    if (player) await player.previousTrack();
  };

  const handleNext = async (): Promise<void> => {
    if (player) await player.nextTrack();
  };

  const handleResume = async (): Promise<void> => {
    if (player) await player.resume();
  };

  const handlePause = async (): Promise<void> => {
    if (player) await player.pause();
  };

  return (
    <StyledPlayerWrapper>
      <StyledPlayerContainer>
        {item && (
          <Grid container>
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
                  <AppLink
                    to={getArtistUrl(item.artists[0].uri.split(":")[2])}
                    state={item.artists[0]}
                  >
                    <Typography
                      variant="paragraphExtraSmall"
                      sx={{ color: (theme) => theme.palette.grey[400] }}
                    >
                      {item.artists[0].name}
                    </Typography>
                  </AppLink>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                height="100%"
                gap={1.5}
              >
                <IconButton onClick={handlePrevious}>
                  <SkipPreviousIcon
                    sx={{
                      fontSize: "32px",
                      color: (theme) => theme.palette.text.primary,
                    }}
                  />
                </IconButton>

                {!state?.paused ? (
                  <IconButton onClick={handlePause}>
                    <PauseCircleIcon
                      sx={{
                        fontSize: "48px",
                        color: (theme) => theme.palette.text.primary,
                      }}
                    />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleResume}>
                    <PlayCircleIcon
                      sx={{
                        fontSize: "48px",
                        color: (theme) => theme.palette.text.primary,
                      }}
                    />
                  </IconButton>
                )}
                <IconButton onClick={handleNext}>
                  <SkipNextIcon
                    sx={{
                      fontSize: "32px",
                      color: (theme) => theme.palette.text.primary,
                    }}
                  />
                </IconButton>
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
