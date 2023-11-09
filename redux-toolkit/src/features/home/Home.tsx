import AppCard from "@benbeck764/react-components/Card";
import { Typography } from "@mui/material";
import { FC, useEffect } from "react";
import SpotifyService from "../../services/spotify.service";

const Home: FC = () => {
  const spotifyService = SpotifyService.getInstance();
  useEffect(() => {
    (async () => {
      const res = await spotifyService.getMyTopArtists();
      console.log(res.data);
    })();
  }, []);

  return (
    <AppCard
      paperSx={{ backgroundColor: (theme) => theme.palette.coolGrey[900] }}
      sx={{ px: 2, pb: 4 }}
    >
      <Typography variant="h1">Spotify Home</Typography>
    </AppCard>
  );
};

export default Home;
