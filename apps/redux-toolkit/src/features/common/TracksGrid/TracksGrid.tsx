import { FC } from "react";
import AppGrid, {
  AppGridProps,
  AppGridData,
  AppGridVirtualizedProps,
} from "@benbeck764/react-components-grid/Grid";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import { createCardViewDefinitions } from "./TracksGrid.card";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import { PlayButtonPlayType } from "../../player/PlayButton";
import { TrackCardType } from "./cards/TrackCard";

type TracksGridProps = {
  data: SpotifyTrack[] | undefined;
  cardType: TrackCardType;
  loading: boolean;
  playType: PlayButtonPlayType;
  virtualization?: AppGridVirtualizedProps;
  pageSize?: number;
  sx?: SxProps<Theme>;
};

const TracksGrid: FC<TracksGridProps> = (props: TracksGridProps) => {
  const { data, cardType, playType, loading, virtualization, pageSize, sx } =
    props;

  const gridData: AppGridData<SpotifyTrack> = {
    pages:
      !data || loading
        ? [
            {
              items: [],
              pageIndex: 0,
              pageSize: pageSize ?? 10,
              isLoading: true,
            },
          ]
        : [
            {
              items: data,
              pageIndex: 0,
              pageSize: data.length,
              isLoading: false,
            },
          ],
    totalItemCount: data?.length ?? pageSize ?? 10,
    totalPageCount: 1,
    pagingMode: "none",
  };

  const gridProps: AppGridProps<SpotifyTrack> = {
    data: gridData,
    cardView: createCardViewDefinitions(cardType, playType, virtualization, sx),
    displayMode: "card",
    cursorStyle: "pointer",
    noItemsMessage: (
      <Typography variant="paragraph">No tracks found.</Typography>
    ),
  };
  return <AppGrid {...gridProps} />;
};

export default TracksGrid;
