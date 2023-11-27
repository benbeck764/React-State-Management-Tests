import { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyTrack,
} from "../../state/queries/models/spotify.models";
import { useGetTrackQuery } from "../../state/queries/track.api";
import { useGetArtistsQuery } from "../../state/queries/artist.api";
import { getAlbumUrl, getArtistUrl } from "../../routing/common/url";
import TrackHeader from "./components/TrackHeader";
import TrackButtons from "./components/TrackButtons";
import TrackLyrics from "./components/TrackLyrics";
import TrackRecommendations from "./components/TrackRecommendations";
import TrackTopArtistTracks from "./components/TrackTopArtistTracks";
import TrackPopularItems from "./components/TrackPopularItems";
import TrackArtists from "./components/TrackArtists";
import TrackArtistsPopularItems from "./components/TrackArtistsPopularItems";
import TrackRelatedArtists from "./components/TrackRelatedArtists";
import TrackAlbum from "./components/TrackAlbum";
import TrackCopyrights from "./components/TrackCopyrights";

const Track: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const trackId = params["trackId"];
  const state = location.state as SpotifyTrack | null;

  const skipQuery = !trackId;

  const { data: queriedTrack, isFetching: loadingTrack } = useGetTrackQuery(
    { id: trackId! },
    { skip: skipQuery }
  );

  const track = skipQuery ? state : queriedTrack;

  const { data: artistsResponse, isFetching: loadingArtists } =
    useGetArtistsQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      { artistIds: track?.artists?.map((a: SpotifyArtist) => a.id)! },
      { skip: !track?.artists?.length }
    );
  const allArtists = artistsResponse?.artists;
  const [artist, ...otherArtists] = allArtists ?? [];

  const handleArtistSelected = (artist: SpotifyArtist) => {
    navigate(getArtistUrl(artist.id), { state: artist });
  };

  const handleAlbumSelected = (album: SpotifyAlbum) => {
    navigate(getAlbumUrl(album.id), { state: album });
  };

  return (
    <Stack>
      <TrackHeader
        loading={loadingTrack || loadingArtists}
        track={track}
        artist={artist}
      />
      <Box my={2}>
        <TrackButtons loading={loadingTrack} track={track} />
      </Box>
      <TrackLyrics track={track} />
      <Box my={1.5}>
        <TrackArtists
          artists={allArtists}
          loading={loadingTrack || loadingArtists}
          onArtistSelected={handleArtistSelected}
        />
      </Box>
      <Box my={1.5}>
        <TrackRecommendations track={track} />
      </Box>
      <Box my={1.5}>
        <TrackTopArtistTracks artists={allArtists} />
      </Box>
      <Box my={1.5}>
        <TrackPopularItems
          variant="releases"
          artists={allArtists}
          onAlbumSelected={handleAlbumSelected}
        />
      </Box>
      <Box my={1.5}>
        <TrackPopularItems
          variant="albums"
          artists={allArtists}
          onAlbumSelected={handleAlbumSelected}
        />
      </Box>
      <Box my={1.5}>
        <TrackPopularItems
          variant="singles"
          artists={allArtists}
          onAlbumSelected={handleAlbumSelected}
        />
      </Box>
      {otherArtists?.map((otherArtist: SpotifyArtist) => (
        <Box key={otherArtist.id} my={1.5}>
          <TrackArtistsPopularItems
            artist={otherArtist}
            onAlbumSelected={handleAlbumSelected}
          />
        </Box>
      ))}
      <Box my={1.5}>
        <TrackRelatedArtists
          artist={artist}
          onArtistSelected={handleArtistSelected}
        />
      </Box>
      <Box my={2.5}>
        <TrackAlbum track={track} onAlbumSelected={handleAlbumSelected} />
      </Box>
      <Box my={1.5}>
        <TrackCopyrights track={track} />
      </Box>
    </Stack>
  );
};

export default Track;
