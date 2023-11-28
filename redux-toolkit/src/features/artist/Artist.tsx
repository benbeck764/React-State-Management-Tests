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
import HeadsetIcon from "@mui/icons-material/Headset";
import {
  useGetArtistQuery,
  useGetArtistTopTracksQuery,
} from "../../state/queries/artist.api";
import TracksGrid from "../common/TracksGrid/TracksGrid";
import { StyledTopTracksHeader } from "./Artist.styles";
import { getAlbumUrl } from "../../routing/common/url";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import PlayButton from "../player/PlayButton";
import ArtistDiscography from "./components/ArtistDiscography";

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

  const { data: topTracksData, isFetching: isLoadingTopTracks } =
    useGetArtistTopTracksQuery(
      { id: artistId!, market: "US" },
      { skip: !artistId }
    );

  const handleAlbumSelected = (album: SpotifyAlbum): void => {
    navigate(getAlbumUrl(album.id), { state: album });
  };

  return (
    <Stack gap={1}>
      {!artist ? (
        <TypographySkeleton variant="h1" charCount={15} charCountVariance={7} />
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h1">{artist.name}</Typography>
          <PlayButton
            type="artist"
            variant="action-button"
            size="large"
            dataUri={artist.uri}
          />
        </Stack>
      )}
      <Stack gap={2}>
        <Stack direction="row" gap={2}>
          <Stack>
            {!artist ? (
              <Skeleton variant="rounded" width={300} height={300}></Skeleton>
            ) : (
              <>
                {artist.images.length > 1 ? (
                  <Box
                    component="img"
                    src={artist.images[0].url}
                    width={300}
                    height={300}
                    sx={{ borderRadius: 2 }}
                  />
                ) : (
                  <Box
                    width={300}
                    height={300}
                    sx={{
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: (theme) => theme.palette.coolGrey[900],
                    }}
                  >
                    <HeadsetIcon
                      sx={{
                        fontSize: "100px",
                        color: (theme) => theme.palette.grey[500],
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Stack>
          <Box width="100%">
            <StyledTopTracksHeader>
              <Typography variant="h4">Popular</Typography>
            </StyledTopTracksHeader>
            <Box maxHeight="250px" sx={{ overflowY: "scroll" }}>
              <TracksGrid
                data={topTracksData?.tracks ?? []}
                cardType="top-track"
                loading={isLoadingTopTracks}
                playType="track"
              />
            </Box>
          </Box>
        </Stack>
        <Box my={1}>
          <ArtistDiscography
            artist={artist}
            onAlbumSelected={handleAlbumSelected}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Artist;
