import {
  AppGridCardViewDefinitions,
  AppGridVirtualizedProps,
} from "@benbeck764/react-components-grid/Grid";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import TrackCard from "./TrackCard";
import { PlayButtonPlayType } from "../../player/PlayButton";

export const createCardViewDefinitions = (
  playType: PlayButtonPlayType,
  virtualization?: AppGridVirtualizedProps
): AppGridCardViewDefinitions<SpotifyTrack> => ({
  xs: {
    virtualizedProps: virtualization,
    getContent: function Card(item: SpotifyTrack, index: number) {
      return <TrackCard index={index} track={item} playType={playType} />;
    },
    loadingPlaceholder: <TrackCard loadingPlaceholder />,
    columnCount: 1,
    cardSx: { borderRadius: "16px" },
  },
  lg: {
    virtualizedProps: virtualization,
    getContent: function Card(item: SpotifyTrack, index: number) {
      return <TrackCard index={index} track={item} playType={playType} />;
    },
    loadingPlaceholder: <TrackCard loadingPlaceholder />,
    columnCount: 1,
    cardSx: { borderRadius: "16px" },
  },
  xl: {
    virtualizedProps: virtualization,
    getContent: function Card(item: SpotifyTrack, index: number) {
      return <TrackCard index={index} track={item} playType={playType} />;
    },
    loadingPlaceholder: <TrackCard loadingPlaceholder />,
    columnCount: 1,
    rowSpacing: 0,
    cardSx: { borderRadius: "0px" },
  },
});