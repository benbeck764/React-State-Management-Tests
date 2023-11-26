import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SpotifyTrack } from "../../state/queries/models/spotify.models";
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

  const { data: geniusSearchResult, isFetching: loadingGeniusSearch } =
    useGeniusSearchQuery(`${track?.name} ${track?.artists?.[0]?.name}`, {
      skip: !track,
    });

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
