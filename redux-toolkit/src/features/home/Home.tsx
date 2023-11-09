import { FC } from "react";
import { useGetTopArtistsQuery } from "../../state/queries/spotify.api";
import TopArtistsGrid from "./TopArtistsGrid/TopArtistsGrid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Home: FC = () => {
  const { data, isLoading } = useGetTopArtistsQuery({});

  return (
    <Stack>
      <Typography variant="h1">Good afternoon</Typography>
      <TopArtistsGrid data={data} loading={isLoading} />
    </Stack>
  );
};

export default Home;
