import { FC } from "react";
import {
  GetArtistTopTracksResponse,
  SpotifyTrack,
} from "../../../state/queries/models/spotify.models";
import AppGrid, {
  AppGridProps,
  AppGridData,
} from "@benbeck764/react-components-grid/Grid";
import Typography from "@mui/material/Typography";
import { createTableViewDefinitions } from "./TracksGrid.table";

type TracksGridProps = {
  data: GetArtistTopTracksResponse | undefined;
  loading: boolean;
};

const TracksGrid: FC<TracksGridProps> = (props: TracksGridProps) => {
  const { data: dataRequest, loading } = props;

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
    tableView: createTableViewDefinitions(),
    displayMode: "table",
    cursorStyle: "pointer",
    noItemsMessage: (
      <Typography variant="paragraph">No tracks found.</Typography>
    ),
  };
  return <AppGrid {...gridProps} />;
};

export default TracksGrid;
