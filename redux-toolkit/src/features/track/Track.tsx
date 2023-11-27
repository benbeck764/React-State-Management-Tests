import { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  SimplifiedSpotifyAlbum,
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyTrack,
} from "../../state/queries/models/spotify.models";
import { useGetTrackQuery } from "../../state/queries/track.api";
import {
  useGetArtistAlbumsQuery,
  useGetArtistsQuery,
} from "../../state/queries/artist.api";
import { getAlbumUrl, getArtistUrl } from "../../routing/common/url";
import TrackHeader from "./components/TrackHeader";
import TrackButtons from "./components/TrackButtons";
import TrackLyrics from "./components/TrackLyrics";
import TrackRecommendations from "./components/TrackRecommendations";
import TrackTopArtistTracks from "./components/TrackTopArtistTracks";
import TrackPopularItems from "./components/TrackPopularItems";
import { useGetMultipleAlbumsQuery } from "../../state/queries/album.api";
import TrackArtists from "./components/TrackArtists";

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

  const { data: artistAlbumsResponse, isFetching: loadingArtistAlbums } =
    useGetArtistAlbumsQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      { id: artistsResponse?.artists?.[0]?.id!, limit: 50 }, // Max 50 per API spec
      { skip: !artistsResponse }
    );
  const popularAlbums = artistAlbumsResponse?.items?.slice(0, 6);

  const { data: artistSinglesResponse, isFetching: loadingArtistSingles } =
    useGetArtistAlbumsQuery(
      {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */
        id: artistsResponse?.artists?.[0]?.id!,
        limit: 50,
        include_groups: "single",
      }, // Max 50 per API spec
      { skip: !artistsResponse }
    );
  const popularSingles = artistSinglesResponse?.items?.slice(0, 6);

  const { data: albums, isFetching: loadingPopularAlbums } =
    useGetMultipleAlbumsQuery(
      {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */
        ids: artistAlbumsResponse?.items?.map(
          (a: SimplifiedSpotifyAlbum) => a.id
        )!,
      },
      { skip: !artistAlbumsResponse || loadingArtistAlbums }
    );

  let popularReleases = albums ? [...albums] : undefined;
  if (popularReleases) {
    popularReleases = popularReleases.sort(
      (a: SpotifyAlbum, b: SpotifyAlbum) => b.popularity - a.popularity
    );
    popularReleases = popularReleases.slice(0, 6);
  }

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
        artist={artistsResponse?.artists?.[0]}
      />
      <Box my={2}>
        <TrackButtons loading={loadingTrack} track={track} />
      </Box>
      <TrackLyrics track={track} />
      <Box my={1.5}>
        <TrackArtists
          artists={artistsResponse?.artists}
          loading={loadingTrack || loadingArtists}
          onArtistSelected={handleArtistSelected}
        />
      </Box>
      <Box my={1.5}>
        <TrackRecommendations track={track} />
      </Box>
      <Box my={1.5}>
        <TrackTopArtistTracks artists={artistsResponse?.artists} />
      </Box>
      <Box my={1.5}>
        <TrackPopularItems
          albums={popularReleases}
          loading={loadingPopularAlbums || !popularReleases}
          variant="releases"
          artist={artistsResponse?.artists?.[0]}
          onAlbumSelected={handleAlbumSelected}
        />
      </Box>
      <Box my={1.5}>
        <TrackPopularItems
          albums={popularAlbums as SpotifyAlbum[] | undefined}
          loading={loadingPopularAlbums}
          variant="albums"
          artist={artistsResponse?.artists?.[0]}
          onAlbumSelected={handleAlbumSelected}
        />
      </Box>
      <Box my={1.5}>
        <TrackPopularItems
          albums={popularSingles as SpotifyAlbum[] | undefined}
          loading={loadingArtistSingles}
          variant="singles"
          artist={artistsResponse?.artists?.[0]}
          onAlbumSelected={handleAlbumSelected}
        />
      </Box>
    </Stack>
  );
};

export default Track;
