import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SpotifyTrack } from "../../state/queries/models/spotify.models";
import { useGetTrackQuery } from "../../state/queries/track.api";
import {
  useGeniusSearchQuery,
  useGetGeniusSongQuery,
} from "../../state/queries/genius.api";

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

  const { data: geniusSearchResult, isFetching: loadingGeniusSearch } =
    useGeniusSearchQuery(`${track?.name} ${track?.artists?.[0]?.name}`, {
      skip: !track,
    });

  const geniusSearchSong = geniusSearchResult?.response?.hits?.[0]?.result;

  const { data: geniusSong, isFetching: loadingGeniusSong } =
    useGetGeniusSongQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      { id: geniusSearchSong?.id! },
      {
        skip: !geniusSearchSong?.id,
      }
    );

  const loading = loadingTrack || loadingGeniusSearch || loadingGeniusSong;

  if (geniusSong) console.log(geniusSong);

  if (loading || !track) {
    return <></>;
  } else {
    return <></>;
  }
};

export default Track;
