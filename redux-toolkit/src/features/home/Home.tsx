import { FC } from "react";
import { useGetTopArtistsQuery } from "../../state/queries/spotify.api";
import ArtistsGrid from "../common/ArtistsGrid/ArtistsGrid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SpotifyArtist } from "../../state/queries/models/spotify.models";
import { useNavigate } from "react-router-dom";
import { getArtistUrl } from "../../routing/common/url";
import Greeting from "./Greeting";

const Home: FC = () => {
  const navigate = useNavigate();

  const { data, isFetching } = useGetTopArtistsQuery({
    limit: 16,
  });

  const handleArtistSelected = (artist: SpotifyArtist) => {
    navigate(getArtistUrl(artist.id), { state: artist });
  };

  return (
    <Stack gap={5}>
      <Greeting />
      <Box>
        <Typography variant="h4">Favorite Artists</Typography>
        <ArtistsGrid
          data={data?.items}
          loading={isFetching}
          onArtistSelected={handleArtistSelected}
          cardVariant="small"
        />
      </Box>
    </Stack>
  );
};

export default Home;
