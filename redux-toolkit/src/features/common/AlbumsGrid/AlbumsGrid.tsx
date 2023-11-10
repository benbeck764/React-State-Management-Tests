import { FC } from "react";
import {
  GetArtistAlbumsResponse,
  SpotifyAlbum,
} from "../../../state/queries/models/spotify.models";
import Box from "@mui/material/Box";
import AppGrid, {
  AppGridProps,
  AppGridData,
} from "@benbeck764/react-components-grid/Grid";
import Typography from "@mui/material/Typography";
import { createCardViewDefinitions } from "./AlbumsGrid.card";

type AlbumsGridProps = {
  data: GetArtistAlbumsResponse | undefined;
  loading: boolean;
  onAlbumSelected: (artist: SpotifyAlbum) => void;
};

const AlbumsGrid: FC<AlbumsGridProps> = (props: AlbumsGridProps) => {
  const { data: dataRequest, loading, onAlbumSelected } = props;

  const gridData: AppGridData<SpotifyAlbum> = {
    pages:
      !dataRequest || loading
        ? [
            {
              items: [],
              pageIndex: 0,
              pageSize: 12,
              isLoading: true,
            },
          ]
        : [
            {
              items: dataRequest.items,
              pageIndex: Math.floor(dataRequest.offset / dataRequest.limit),
              pageSize: dataRequest.limit,
              isLoading: false,
            },
          ],
    totalItemCount: dataRequest?.total ?? 0,
    totalPageCount: dataRequest
      ? Math.floor(dataRequest.total / dataRequest.limit)
      : 0,
    pagingMode: "none",
  };

  const gridProps: AppGridProps<SpotifyAlbum> = {
    data: gridData,
    cardView: createCardViewDefinitions(),
    displayMode: "card",
    cursorStyle: "pointer",
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

export default AlbumsGrid;
