import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetTopArtistsQuery } from "../../state/queries/spotify.api";
import { SpotifyArtist } from "../../state/queries/models/spotify.models";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  useGetArtistAlbumsQuery,
  useGetArtistTopTracksQuery,
} from "../../state/queries/artist.api";
import AlbumsGrid from "../common/AlbumsGrid/AlbumsGrid";
import TracksGrid from "../common/TracksGrid/TracksGrid";
import { StyledTopTracksHeader } from "./Artist.styles";
import { getArtistDiscographyUrl } from "../../routing/common/url";
import { AppLink } from "../common/AppLink";

const Artist: FC = () => {
  const params = useParams();
  const artistId = params["artistId"];

  const { artist } = useGetTopArtistsQuery(
    {},
    {
      selectFromResult: (res) => ({
        artist: res.data?.items.find((a: SpotifyArtist) => a.id === artistId),
      }),
    }
  );

  const { data: albumsData, isFetching: isLoadingAlbums } =
    useGetArtistAlbumsQuery({ id: artistId!, limit: 12 }, { skip: !artistId });

  const { data: topTracksData, isFetching: isLoadingTopTracks } =
    useGetArtistTopTracksQuery(
      { id: artistId!, market: "ES" },
      { skip: !artistId }
    );

  return (
    <Stack gap={1}>
      <Typography variant="h1">{artist?.name}</Typography>
      <Stack gap={2}>
        <Stack direction="row" gap={2}>
          <Stack>
            <Box
              component="img"
              src={artist?.images[1].url}
              width={300}
              height={300}
              sx={{ borderRadius: 2 }}
            ></Box>
          </Stack>
          <Box width="100%">
            <StyledTopTracksHeader>
              <Typography variant="h2">Popular</Typography>
            </StyledTopTracksHeader>
            <Box maxHeight="250px" sx={{ overflowY: "scroll" }}>
              <TracksGrid data={topTracksData} loading={isLoadingTopTracks} />
            </Box>
          </Box>
        </Stack>
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h2">Discography</Typography>
            {artistId && (
              <AppLink to={getArtistDiscographyUrl(artistId)}>
                <Typography
                  variant="paragraphLink"
                  sx={{ color: (theme) => theme.palette.grey[400] }}
                >
                  Show all
                </Typography>
              </AppLink>
            )}
          </Stack>
          <AlbumsGrid
            data={albumsData}
            loading={isLoadingAlbums}
            onAlbumSelected={() => void 0}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Artist;
