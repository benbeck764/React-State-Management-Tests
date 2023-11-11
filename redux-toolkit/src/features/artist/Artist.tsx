import { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  SpotifyAlbum,
  SpotifyArtist,
} from "../../state/queries/models/spotify.models";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import {
  useGetArtistAlbumsQuery,
  useGetArtistQuery,
  useGetArtistTopTracksQuery,
} from "../../state/queries/artist.api";
import AlbumsGrid from "../common/AlbumsGrid/AlbumsGrid";
import TracksGrid from "../common/TracksGrid/TracksGrid";
import { StyledTopTracksHeader } from "./Artist.styles";
import { getAlbumUrl, getArtistDiscographyUrl } from "../../routing/common/url";
import { AppLink } from "../common/AppLink";
import { TypographySkeleton } from "@benbeck764/react-components/common";

const Artist: FC = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const artistId = params["artistId"];
  const state = location.state as SpotifyArtist | null;

  const skipQuery =
    !artistId ||
    (typeof state?.images !== "undefined" &&
      typeof state?.name !== "undefined");

  const { data: queriedArtist } = useGetArtistQuery(artistId!, {
    skip: skipQuery,
  });

  const artist = skipQuery ? state : queriedArtist;

  const { data: albumsData, isFetching: isLoadingAlbums } =
    useGetArtistAlbumsQuery({ id: artistId!, limit: 12 }, { skip: !artistId });

  const { data: topTracksData, isFetching: isLoadingTopTracks } =
    useGetArtistTopTracksQuery(
      { id: artistId!, market: "US" },
      { skip: !artistId }
    );

  const handleAlbumSelected = (album: SpotifyAlbum): void => {
    navigate(getAlbumUrl(album.id));
  };

  return (
    <Stack gap={1}>
      {!artist ? (
        <TypographySkeleton variant="h1" charCount={15} charCountVariance={7} />
      ) : (
        <Typography variant="h1">{artist.name}</Typography>
      )}
      <Stack gap={2}>
        <Stack direction="row" gap={2}>
          <Stack>
            {!artist ? (
              <Skeleton variant="rounded" width={300} height={300}></Skeleton>
            ) : (
              <Box
                component="img"
                src={artist.images[1].url}
                width={300}
                height={300}
                sx={{ borderRadius: 2 }}
              ></Box>
            )}
          </Stack>
          <Box width="100%">
            <StyledTopTracksHeader>
              <Typography variant="h4">Popular</Typography>
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
            <Typography variant="h4">Discography</Typography>
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
            onAlbumSelected={handleAlbumSelected}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Artist;
