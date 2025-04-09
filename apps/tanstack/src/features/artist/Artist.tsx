import { TypographySkeleton } from '@benbeck764/react-components';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import { SpotifyPlayButton, SpotifyTracksGrid } from '@spotify-examples/components';
import { SpotifyAlbum } from '@spotify-examples/spotify-models';
import { useLocation, useNavigate, createLazyRoute } from '@tanstack/react-router';
import { FC } from 'react';
import HeadsetIcon from '@mui/icons-material/Headset';
import { useQuery } from '@tanstack/react-query';
import { getArtistQuery, getArtistTopTracksQuery } from '@/queries/artist.queries';
import { StyledTopTracksHeader } from '@/features/artist/Artist.styles';
import TracksGrid from '@/components/TracksGrid';

const Artist: FC = () => {
  const location = useLocation();
  const { id: artistId } = Route.useParams();

  const navigate = useNavigate();
  const state = location.state.artist?.artist;

  const skipQuery = !artistId || (state?.images !== undefined && state?.name !== undefined);

  const { data: queriedArtist } = useQuery(getArtistQuery(artistId, { enabled: !skipQuery }));

  const { data: topTracks, isFetching: fetchingTopTracks } = useQuery(
    getArtistTopTracksQuery({ id: artistId, market: 'US' }, { enabled: !skipQuery })
  );

  const artist = skipQuery ? state : queriedArtist;

  const handleAlbumSelected = (album: SpotifyAlbum): void => {
    // [TODO]: Navigate to album
    //navigate(getAlbumUrl(album.id), { state: album });
  };

  return (
    <Stack gap={1}>
      {!artist ? (
        <TypographySkeleton variant="h1" charCount={15} charCountVariance={7} />
      ) : (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h1">{artist.name}</Typography>
          <SpotifyPlayButton
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
                      borderRadius: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: (theme) => theme.palette.coolGrey[900]
                    }}
                  >
                    <HeadsetIcon
                      sx={{ fontSize: '100px', color: (theme) => theme.palette.grey[500] }}
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
            <Box maxHeight="250px" sx={{ overflowY: 'scroll' }}>
              <TracksGrid
                cardType="top-track"
                data={topTracks ?? []}
                loading={fetchingTopTracks}
                playType="track"
              />
            </Box>
          </Box>
        </Stack>
        {/* <Box my={1}>
          <ArtistDiscography artist={artist} onAlbumSelected={handleAlbumSelected} />
        </Box> */}
      </Stack>
    </Stack>
  );
};

export const Route = createLazyRoute('/layout/artist/$id')({ component: () => <Artist /> });

export default Artist;
