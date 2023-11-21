import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppGrid, {
  AppGridProps,
  AppGridData,
} from "@benbeck764/react-components-grid/Grid";
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import { createCardViewDefinitions } from "./ArtistsGrid.card";

export type ArtistCardVariant = "small" | "large";
type ArtistsGridProps = {
  data: SpotifyArtist[] | undefined;
  loading: boolean;
  pageSize?: number;
  cardVariant: ArtistCardVariant;
  onArtistSelected?: (artist: SpotifyArtist) => void;
};

const ArtistsGrid: FC<ArtistsGridProps> = (props: ArtistsGridProps) => {
  const { data, loading, pageSize, cardVariant, onArtistSelected } = props;

  const gridData: AppGridData<SpotifyArtist> = {
    pages:
      !data || loading
        ? [
            {
              items: [],
              pageIndex: 0,
              pageSize: pageSize ?? 16,
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

  const gridProps: AppGridProps<SpotifyArtist> = {
    data: gridData,
    cardView: createCardViewDefinitions(cardVariant),
    displayMode: "card",
    cursorStyle: "pointer",
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
