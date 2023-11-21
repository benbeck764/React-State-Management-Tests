import { FC } from "react";
import AppGrid, {
  AppGridProps,
  AppGridData,
  AppGridVirtualizedProps,
} from "@benbeck764/react-components-grid/Grid";
import Typography from "@mui/material/Typography";
import { createCardViewDefinitions } from "./TracksGrid.card";
import { SpotifyTrack } from "../../../state/queries/models/spotify.models";
import { PlayButtonPlayType } from "../../player/PlayButton";

type TracksGridProps = {
  data: SpotifyTrack[];
  loading: boolean;
  playType: PlayButtonPlayType;
  virtualization?: AppGridVirtualizedProps;
  pageSize?: number;
};

const TracksGrid: FC<TracksGridProps> = (props: TracksGridProps) => {
  const { data, loading, playType, virtualization, pageSize } = props;

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
    totalItemCount: data.length ?? pageSize ?? 10,
    totalPageCount: 1,
    pagingMode: "none",
  };

  const gridProps: AppGridProps<SpotifyTrack> = {
    data: gridData,
    cardView: createCardViewDefinitions(playType, virtualization),
    displayMode: "card",
    cursorStyle: "pointer",
    noItemsMessage: (
      <Typography variant="paragraph">No tracks found.</Typography>
    ),
  };
  return <AppGrid {...gridProps} />;
};

export default TracksGrid;
