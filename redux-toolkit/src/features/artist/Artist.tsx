import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetTopArtistsQuery } from "../../state/queries/spotify.api";
import { SpotifyArtist } from "../../state/queries/models/spotify.models";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetArtistAlbumsQuery } from "../../state/queries/artist.api";

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
  const { data: albumsData, isLoading: isLoadingAlbums } =
    useGetArtistAlbumsQuery({ id: artistId! }, { skip: !artistId });

  console.log(albumsData);

  return (
    <Stack gap={1}>
      <Typography variant="h1">{artist?.name}</Typography>
      <Box
        component="img"
        src={artist?.images[1].url}
        width={300}
        height={300}
      ></Box>
    </Stack>
  );
};

export default Artist;
