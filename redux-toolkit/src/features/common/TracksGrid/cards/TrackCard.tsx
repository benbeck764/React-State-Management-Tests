import { SpotifyTrack } from "../../../../state/queries/models/spotify.models";
import { PlayButtonPlayType } from "../../../player/PlayButton";
import TrackCardTopTracks from "./TrackCard.top";
import TrackCardSearch from "./TrackCard.search";

export type TrackCardType = "top-track" | "search";
export type TrackCardProps = { type: TrackCardType } & (
  | {
      track: SpotifyTrack;

      index: number;
      playType: PlayButtonPlayType;
      loadingPlaceholder?: never;
    }
  | {
      track?: never;
      index?: never;
      playType?: never;
      loadingPlaceholder: true;
    }
);

const TrackCard = (props: TrackCardProps) => {
  const { type } = props;
  if (type === "top-track") {
    return <TrackCardTopTracks {...props} />;
  }
  if (type === "search") {
    return <TrackCardSearch {...props} />;
  }
};

export default TrackCard;
