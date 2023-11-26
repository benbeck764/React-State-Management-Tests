import { FC } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  SpotifyArtist,
  SpotifyTrack,
} from "../../state/queries/models/spotify.models";
import {
  useGetRecommendationsQuery,
  useGetTrackQuery,
} from "../../state/queries/track.api";
import {
  useGeniusSearchQuery,
  useGetGeniusLyricsQuery,
} from "../../state/queries/genius.api";
import {
  useGetArtistTopTracksQuery,
  useGetArtistsQuery,
} from "../../state/queries/artist.api";
import { getArtistUrl } from "../../routing/common/url";
import TrackHeader from "./components/TrackHeader";
import TrackButtons from "./components/TrackButtons";
import TrackLyrics from "./components/TrackLyrics";
import ArtistsGrid from "../common/ArtistsGrid/ArtistsGrid";
import TrackRecommendations from "./components/TrackRecommendations";
import TrackTopArtistTracks from "./components/TrackTopArtistTracks";

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

  const { data: topTracksData, isFetching: loadingTopTracks } =
    useGetArtistTopTracksQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      { id: artistsResponse?.artists?.[0]?.id!, market: "US" },
      { skip: !artistsResponse }
    );

  const { data: recommendationsResponse, isFetching: loadingRecommendations } =
    useGetRecommendationsQuery(
      {
        limit: 5,
        //seed_artists: track?.artists.map((a: SpotifyArtist) => a.id).join(","),
        //seed_artists: track?.artists?.[0].id,
        //seed_genres: track?.artists?.[0].genres?.join(","),
        seed_tracks: track?.id,
        //target_popularity: track?.popularity,
      },
      { skip: !track }
    );

  const getTitle = (title: string, artists: SpotifyArtist[]) => {
    const artist = artists?.[0]?.name;
    const searchQuery = `${title} ${artist}`;

    return searchQuery
      .toLowerCase()
      .replace(/ *\([^)]*\) */g, "")
      .replace(/ *\[[^\]]*]/, "")
      .replace(/feat.|ft./g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*-\s*\d{4}\s*(Remaster|Remastered)\s*/i, "")
      .trim();
  };

  const { data: geniusSearchResult, isFetching: loadingGeniusSearch } =
    useGeniusSearchQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      getTitle(track?.name!, track?.artists!),
      { skip: !track }
    );

  const geniusSearchSong = geniusSearchResult?.response?.hits?.[0]?.result;

  const { data: geniusLyrics, isFetching: loadingGeniusLyrics } =
    useGetGeniusLyricsQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      geniusSearchSong?.url!,
      {
        skip: !geniusSearchSong?.id,
      }
    );

  const handleArtistSelected = (artist: SpotifyArtist) => {
    navigate(getArtistUrl(artist.id), { state: artist });
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
      <TrackLyrics
        loading={loadingGeniusSearch || loadingGeniusLyrics}
        lyrics={geniusLyrics}
      />
      <ArtistsGrid
        data={artistsResponse?.artists}
        loading={loadingTrack || loadingArtists}
        pageSize={loadingTrack || loadingArtists ? 3 : undefined}
        onArtistSelected={handleArtistSelected}
        cardVariant="track"
      />
      <Box my={1.5}>
        <TrackRecommendations
          tracks={recommendationsResponse?.tracks}
          loading={loadingRecommendations}
        />
      </Box>
      <Box my={1.5}>
        <TrackTopArtistTracks
          tracks={topTracksData?.tracks}
          loading={loadingTopTracks}
          artist={artistsResponse?.artists?.[0]}
        />
      </Box>
    </Stack>
  );
};

export default Track;
