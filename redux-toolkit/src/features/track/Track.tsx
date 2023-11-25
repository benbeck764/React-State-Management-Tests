import { FC } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SpotifyTrack } from "../../state/queries/models/spotify.models";
import { useGetTrackQuery } from "../../state/queries/track.api";

const Track: FC = () => {
  const location = useLocation();
  const params = useParams();

  const trackId = params["trackId"];
  const state = location.state as SpotifyTrack | null;

  const skipQuery = !trackId;

  const { data: queriedAlbum, isFetching: loading } = useGetTrackQuery(
    { id: trackId! },
    { skip: skipQuery }
  );

  const track = skipQuery ? state : queriedAlbum;

  if (loading || !track) {
    return <></>;
  } else {
    return <></>;
  }
};

export default Track;
