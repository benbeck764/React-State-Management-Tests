import { FC, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchForItemQuery } from "../../state/queries/spotify.api";
import TracksGrid from "../common/TracksGrid/TracksGrid";
import { getAlbumUrl, getArtistUrl } from "../../routing/common/url";
import ArtistsGrid from "../common/ArtistsGrid/ArtistsGrid";
import {
  SpotifyAlbum,
  SpotifyArtist,
} from "../../state/queries/models/spotify.models";
import AlbumsGrid from "../common/AlbumsGrid/AlbumsGrid";
import TopResultCard from "./components/TopResultCard";
import { useAppDispatch } from "../../state/store";
import { search } from "../../state/slices/search.slice";

const Search: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useAppDispatch();
  const searchQuery = params["query"];

  const { data: searchResult, isFetching: fetching } = useSearchForItemQuery(
    { q: searchQuery!, type: ["artist", "album", "track"], market: "US" },
    { skip: !searchQuery }
  );

  const topTracks = searchResult
    ? [...searchResult.tracks.items].splice(0, 4)
    : [];
  const topArtists = searchResult
    ? [...searchResult.artists.items].splice(0, 6)
    : [];
  const topAlbums = searchResult
    ? [...searchResult.albums.items].splice(0, 6)
    : [];

  const handleArtistSelected = (artist: SpotifyArtist) => {
    navigate(getArtistUrl(artist.id), { state: artist });
  };

  const handleAlbumSelected = (album: SpotifyAlbum): void => {
    navigate(getAlbumUrl(album.id), { state: album });
  };

  useEffect(() => {
    if (searchQuery) dispatch(search(searchQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  if (fetching || !searchResult) {
    return (
      <Stack gap={6}>
        <Grid container columnSpacing={2}>
          <Grid item xs={4}>
            <Stack gap={2} height="100%">
              <TopResultCard loading={true} />
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <Stack gap={2}>
              <Typography variant="h5">Songs</Typography>
              <TracksGrid
                data={undefined}
                cardType="search"
                loading={true}
                pageSize={4}
                playType="track"
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack>
          <Typography variant="h5">Artists</Typography>
          <ArtistsGrid
            data={undefined}
            cardVariant="large"
            pageSize={6}
            loading={true}
          />
        </Stack>
        <Stack>
          <Typography variant="h5">Albums</Typography>
          <AlbumsGrid data={undefined} pageSize={6} loading={true} />
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack gap={6}>
        <Grid container columnSpacing={2}>
          <Grid item xs={4}>
            <Stack gap={2} height="100%">
              <TopResultCard
                searchResult={searchResult}
                searchTerm={searchQuery}
                loading={fetching}
              />
            </Stack>
          </Grid>
          <Grid item xs={8}>
            <Stack gap={2}>
              <Typography variant="h5">Songs</Typography>
              {topTracks && (
                <TracksGrid
                  data={topTracks}
                  cardType="search"
                  loading={fetching}
                  pageSize={4}
                  playType="track"
                />
              )}
            </Stack>
          </Grid>
        </Grid>
        <Stack>
          {topArtists.length > 0 && (
            <>
              <Typography variant="h5">Artists</Typography>
              <ArtistsGrid
                data={topArtists}
                cardVariant="large"
                pageSize={6}
                loading={fetching}
                onArtistSelected={handleArtistSelected}
              />
            </>
          )}
        </Stack>
        <Stack>
          {topAlbums.length > 0 && (
            <>
              <Typography variant="h5">Albums</Typography>
              <AlbumsGrid
                data={topAlbums}
                cardType="detailed"
                pageSize={6}
                loading={fetching}
                onAlbumSelected={handleAlbumSelected}
              />
            </>
          )}
        </Stack>
      </Stack>
    );
  }
};

export default Search;
