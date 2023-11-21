import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  StyledEllipsingTextContainer,
  TypographySkeleton,
} from "@benbeck764/react-components/common";
import { useParams } from "react-router-dom";
import { useSearchForItemQuery } from "../../state/queries/spotify.api";
import { StyledCard } from "../common/common.styles";
import TracksGrid from "../common/TracksGrid/TracksGrid";
import { getArtistUrl } from "../../routing/common/url";
import { AppLink } from "../common/AppLink";
import Box from "@mui/material/Box";
import ArtistsGrid from "../common/ArtistsGrid/ArtistsGrid";

const Search: FC = () => {
  const params = useParams();
  const theme = useTheme();
  const searchQuery = params["query"];

  const { data: searchResult, isFetching: fetching } = useSearchForItemQuery(
    { q: searchQuery!, type: ["artist", "album", "track"], market: "US" },
    { skip: !searchQuery }
  );

  const topArtist = searchResult?.artists?.items?.[0];
  const topTracks = searchResult
    ? [...searchResult.tracks.items].splice(0, 4)
    : [];
  const topArtists = searchResult
    ? [...searchResult.artists.items].splice(0, 6)
    : [];

  if (fetching || !searchResult) {
    return (
      <Stack>
        <Grid container>
          <Grid item xs={3}>
            <Stack gap={2}>
              <Typography variant="h5">Top result</Typography>
              <StyledCard>
                <Stack gap={2}>
                  <Skeleton variant="circular" width={100} height={100} />
                  <TypographySkeleton
                    variant="h4"
                    charCount={12}
                    charCountVariance={6}
                    lines={1}
                  />
                </Stack>
              </StyledCard>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack gap={2}>
              <Typography variant="h5">Songs</Typography>
              <TracksGrid
                data={[]}
                loading={true}
                pageSize={4}
                playType="track"
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  } else {
    return (
      <Stack>
        <Grid container columnSpacing={2}>
          <Grid item xs={3}>
            <Stack gap={2}>
              <Typography variant="h5">Top result</Typography>
              {topArtist && (
                <AppLink to={getArtistUrl(topArtist.id)}>
                  <StyledCard>
                    <Stack gap={2}>
                      <Avatar
                        sx={{ width: 100, height: 100 }}
                        src={topArtist.images?.[0]?.url}
                      />
                      <StyledEllipsingTextContainer
                        lines={1}
                        reserveHeight={
                          +(
                            theme.typography.h4.lineHeight
                              ?.toString()
                              .replace("px", "") || 0
                          )
                        }
                      >
                        <Typography variant="h4">{topArtist.name}</Typography>
                      </StyledEllipsingTextContainer>
                    </Stack>
                  </StyledCard>
                </AppLink>
              )}
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <Stack gap={2}>
              <Typography variant="h5">Songs</Typography>
              {topTracks && (
                <TracksGrid
                  data={topTracks}
                  loading={fetching}
                  playType="track"
                />
              )}
            </Stack>
          </Grid>
        </Grid>
        <Box>
          <ArtistsGrid />
        </Box>
      </Stack>
    );
  }
};

export default Search;
