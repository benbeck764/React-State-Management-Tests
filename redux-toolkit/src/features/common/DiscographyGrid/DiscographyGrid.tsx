import { FC } from "react";
import {
  GetAlbumsResponse,
  SpotifyAlbum,
} from "../../../state/queries/models/spotify.models";
import Box from "@mui/material/Box";
import AppGrid, {
  AppGridProps,
  AppGridData,
} from "@benbeck764/react-components-grid/Grid";
import Typography from "@mui/material/Typography";
import { createCardViewDefinitions } from "./DiscographyGrid.card";

type DiscographyGridProps = {
  data: GetAlbumsResponse | undefined;
  loading: boolean;
  onAlbumSelected: (artist: SpotifyAlbum) => void;
};

const DiscographyGrid: FC<DiscographyGridProps> = (
  props: DiscographyGridProps
) => {
  const { data: dataRequest, loading, onAlbumSelected } = props;

  const gridData: AppGridData<SpotifyAlbum> = {
    pages: !dataRequest
      ? [
          {
            items: [],
            pageIndex: 0,
            pageSize: 15,
            isLoading: true,
          },
        ]
      : !loading
      ? [
          {
            items: dataRequest.albums,
            pageIndex: 0,
            pageSize: dataRequest.albums.length,
            isLoading: false,
          },
        ]
      : [
          {
            items: dataRequest.albums,
            pageIndex: 0,
            pageSize: dataRequest.albums.length,
            isLoading: false,
          },
        ].concat([
          {
            items: [],
            pageIndex: 0,
            pageSize: 15,
            isLoading: true,
          },
        ]),
    totalItemCount: dataRequest?.albums?.length ?? 15,
    totalPageCount: 1,
    pagingMode: "none",
  };

  const gridProps: AppGridProps<SpotifyAlbum> = {
    data: gridData,
    cardView: createCardViewDefinitions(),
    displayMode: "card",
    cursorStyle: "default",
    onItemClicked: onAlbumSelected,
    noItemsMessage: (
      <Typography variant="paragraph">No albums found.</Typography>
    ),
  };
  return (
    <Box sx={{ mt: 2 }}>
      <AppGrid {...gridProps} />
    </Box>
  );
};

export default DiscographyGrid;
