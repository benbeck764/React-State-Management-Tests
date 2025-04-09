import { userTopArtistsQuery } from '@/queries/user.queries';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { SpotifyArtistsGrid, SpotifyGreeting } from '@spotify-examples/components';
import { useQuery } from '@tanstack/react-query';
import { createLazyRoute, useNavigate } from '@tanstack/react-router';
import { SpotifyArtist } from 'node_modules/@spotify-examples/spotify-models/src/models/artist';
import { FC } from 'react';

const Home: FC = () => {
  const navigate = useNavigate();

  const { data, isFetching } = useQuery(userTopArtistsQuery({ limit: 16 }));

  const handleArtistSelected = (artist: SpotifyArtist) => {
    navigate({
      to: `artist/${artist.id}`,
      params: { id: artist.id },
      state: { artist: { artist } }
    });
  };

  return (
    <Stack spacing={5}>
      <SpotifyGreeting />
      <Stack spacing={2}>
        <Typography variant="h4">Favorite Artists</Typography>
        <SpotifyArtistsGrid
          variant="small"
          data={data?.items}
          loading={isFetching}
          onArtistSelected={handleArtistSelected}
        />
      </Stack>
    </Stack>
  );
};

export const Route = createLazyRoute('/layout')({ component: () => <Home /> });

export default Home;
