import { FC } from "react";
import { useGetTopArtistsQuery } from "../../state/queries/spotify.api";
import ArtistsGrid from "../common/ArtistsGrid/ArtistsGrid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SpotifyArtist } from "../../state/queries/models/spotify.models";
import { useNavigate } from "react-router-dom";
import { getArtistUrl } from "../../routing/common/url";

const Home: FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetTopArtistsQuery({ limit: 24 });

  const handleArtistSelected = (artist: SpotifyArtist) => {
    navigate(getArtistUrl(artist.id), { state: artist });
  };

  return (
    <Stack>
      <Typography variant="h1">Good afternoon</Typography>
      <ArtistsGrid
        data={data}
        loading={isLoading}
        onArtistSelected={handleArtistSelected}
        pagination
      />
    </Stack>
  );
};

export default Home;
