import { AppGridCardViewDefinitions } from "@benbeck764/react-components-grid/Grid";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import TrackCard from "./TrackCard";

export const createCardViewDefinitions =
  (): AppGridCardViewDefinitions<SpotifyTrack> => ({
    xs: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyTrack, index: number) {
        return <TrackCard index={index} track={item} />;
      },
      loadingPlaceholder: <TrackCard loadingPlaceholder />,
      columnCount: 1,
      cardSx: { borderRadius: "16px" },
    },
    lg: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyTrack, index: number) {
        return <TrackCard index={index} track={item} />;
      },
      loadingPlaceholder: <TrackCard loadingPlaceholder />,
      columnCount: 1,
      cardSx: { borderRadius: "16px" },
    },
    xl: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyTrack, index: number) {
        return <TrackCard index={index} track={item} />;
      },
      loadingPlaceholder: <TrackCard loadingPlaceholder />,
      columnCount: 1,
      rowSpacing: 0,
      cardSx: { borderRadius: "0px" },
    },
  });
