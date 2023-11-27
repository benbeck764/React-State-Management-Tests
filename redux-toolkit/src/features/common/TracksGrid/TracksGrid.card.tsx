import { SxProps, Theme } from "@mui/material/styles";
import {
  AppGridCardViewDefinitions,
  AppGridVirtualizedProps,
} from "@benbeck764/react-components-grid/Grid";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import TrackCard, { TrackCardType } from "./cards/TrackCard";
import { PlayButtonPlayType } from "../../player/PlayButton";

export const createCardViewDefinitions = (
  cardType: TrackCardType,
  playType: PlayButtonPlayType,
  virtualization?: AppGridVirtualizedProps,
  sx?: SxProps<Theme>
): AppGridCardViewDefinitions<SpotifyTrack> => ({
  xs: {
    virtualizedProps: virtualization,
    getContent: function Card(item: SpotifyTrack, index: number) {
      return (
        <TrackCard
          index={index}
          type={cardType}
          track={item}
          playType={playType}
        />
      );
    },
    loadingPlaceholder: <TrackCard type={cardType} loadingPlaceholder />,
    columnCount: 1,
    gridProps: { sx: { width: "100%" } },
    cardSx: { borderRadius: "16px", ...sx },
  },
  lg: {
    virtualizedProps: virtualization,
    getContent: function Card(item: SpotifyTrack, index: number) {
      return (
        <TrackCard
          index={index}
          type={cardType}
          track={item}
          playType={playType}
        />
      );
    },
    loadingPlaceholder: <TrackCard type={cardType} loadingPlaceholder />,
    columnCount: 1,
    gridProps: { sx: { width: "100%" } },
    cardSx: { borderRadius: "16px", ...sx },
  },
  xl: {
    virtualizedProps: virtualization,
    getContent: function Card(item: SpotifyTrack, index: number) {
      return (
        <TrackCard
          index={index}
          type={cardType}
          track={item}
          playType={playType}
        />
      );
    },
    loadingPlaceholder: <TrackCard type={cardType} loadingPlaceholder />,
    columnCount: 1,
    rowSpacing: 0,
    gridProps: { sx: { width: "100%" } },
    cardSx: { borderRadius: "0px", ...sx },
  },
});
