import { FC } from "react";
import {
  GetUserTopArtistsResponse,
  SpotifyArtist,
} from "../../../state/queries/models/spotify.models";
import Box from "@mui/material/Box";
import AppGrid, {
  AppGridProps,
  AppGridData,
} from "@benbeck764/react-components-grid/Grid";
import Typography from "@mui/material/Typography";
import { createCardViewDefinitions } from "./ArtistsGrid.card";

type ArtistsGridProps = {
  data: GetUserTopArtistsResponse | undefined;
  loading: boolean;
  pagination?: boolean;
  onArtistSelected: (artist: SpotifyArtist) => void;
};

const ArtistsGrid: FC<ArtistsGridProps> = (props: ArtistsGridProps) => {
  const { data: dataRequest, loading, pagination, onArtistSelected } = props;

  const gridData: AppGridData<SpotifyArtist> = {
    pages:
      !dataRequest || loading
        ? [
            {
              items: [],
              pageIndex: 0,
              pageSize: 24,
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
    pagingMode: pagination ? "pagination" : "none",
  };

  const gridProps: AppGridProps<SpotifyArtist> = {
    data: gridData,
    cardView: createCardViewDefinitions(),
    displayMode: "card",
    cursorStyle: "pointer",
    //onDataRequested: onDataRequested,
    onItemClicked: onArtistSelected,
    noItemsMessage: (
      <Typography variant="paragraph">No artists found.</Typography>
    ),
  };
  return (
    <Box sx={{ mt: 2 }}>
      <AppGrid {...gridProps} />
    </Box>
  );
};

export default ArtistsGrid;
