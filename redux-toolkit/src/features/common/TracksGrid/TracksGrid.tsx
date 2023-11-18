import { FC } from "react";
import AppGrid, {
  AppGridProps,
  AppGridData,
  AppGridVirtualizedProps,
} from "@benbeck764/react-components-grid/Grid";
import Typography from "@mui/material/Typography";
import { createCardViewDefinitions } from "./TracksGrid.card";
import {
  GetArtistTopTracksResponse,
  SpotifyTrack,
} from "../../../state/queries/models/spotify.models";
import { PlayButtonPlayType } from "../../player/PlayButton";

type TracksGridProps = {
  data: GetArtistTopTracksResponse | undefined;
  loading: boolean;
  playType: PlayButtonPlayType;
  virtualization?: AppGridVirtualizedProps;
};

const TracksGrid: FC<TracksGridProps> = (props: TracksGridProps) => {
  const { data: dataRequest, loading, playType, virtualization } = props;

  const gridData: AppGridData<SpotifyTrack> = {
    pages:
      !dataRequest || loading
        ? [
            {
              items: [],
              pageIndex: 0,
              pageSize: 10,
              isLoading: true,
            },
          ]
        : [
            {
              items: dataRequest.tracks,
              pageIndex: 0,
              pageSize: dataRequest?.tracks?.length,
              isLoading: false,
            },
          ],
    totalItemCount: dataRequest?.tracks?.length ?? 10,
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
