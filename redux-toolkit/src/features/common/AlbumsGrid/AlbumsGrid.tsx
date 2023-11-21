import { FC } from "react";
import { SpotifyAlbum } from "../../../state/queries/models/spotify.models";
import Box from "@mui/material/Box";
import AppGrid, {
  AppGridProps,
  AppGridData,
} from "@benbeck764/react-components-grid/Grid";
import Typography from "@mui/material/Typography";
import { createCardViewDefinitions } from "./AlbumsGrid.card";
import { AlbumCardType } from "./AlbumCard";

type AlbumsGridProps = {
  data: SpotifyAlbum[] | undefined;
  cardType?: AlbumCardType;
  loading: boolean;
  pageSize?: number;
  onAlbumSelected?: (album: SpotifyAlbum) => void;
};

const AlbumsGrid: FC<AlbumsGridProps> = (props: AlbumsGridProps) => {
  const {
    data,
    cardType = "minimal",
    loading,
    pageSize,
    onAlbumSelected,
  } = props;

  const gridData: AppGridData<SpotifyAlbum> = {
    pages:
      !data || loading
        ? [
            {
              items: [],
              pageIndex: 0,
              pageSize: pageSize ?? 12,
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
    totalItemCount: data?.length ?? pageSize ?? 16,
    totalPageCount: 1,
    pagingMode: "none",
  };

  const gridProps: AppGridProps<SpotifyAlbum> = {
    data: gridData,
    cardView: createCardViewDefinitions(cardType),
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
