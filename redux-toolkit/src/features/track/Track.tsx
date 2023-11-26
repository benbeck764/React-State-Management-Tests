import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import {
  SpotifyArtist,
  SpotifyTrack,
} from "../../state/queries/models/spotify.models";
import { useGetTrackQuery } from "../../state/queries/track.api";
import {
  useGeniusSearchQuery,
  useGetGeniusLyricsQuery,
} from "../../state/queries/genius.api";
import { useGetArtistQuery } from "../../state/queries/artist.api";
import TrackHeader from "./components/TrackHeader";
import TrackLyrics from "./components/TrackLyrics";

const Track: FC = () => {
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

  const { data: artist, isFetching: loadingArtist } = useGetArtistQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    track?.artists?.[0]?.id!,
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
      //`${track?.name} ${track?.artists?.[0]?.name}`
      {
        skip: !track,
      }
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

  return (
    <Stack>
      <TrackHeader
        loading={loadingTrack || loadingArtist}
        track={track}
        artist={artist}
      />

      <TrackLyrics
        loading={loadingGeniusSearch || loadingGeniusLyrics}
        lyrics={geniusLyrics}
      />
    </Stack>
  );
};

export default Track;
