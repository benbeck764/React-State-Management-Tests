import { SxProps, Theme } from "@mui/material/styles";
import { AppGridCardViewDefinitions } from "@benbeck764/react-components-grid/Grid";
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import ArtistCard from "./cards/ArtistCard";
import { ArtistCardVariant } from "./ArtistsGrid";

type ArtistCardVariantDefinition = {
  columnCount: 1 | 2 | 3 | 4 | 6 | 12;
  rowSpacing: number | undefined;
  sx: SxProps<Theme>;
};

export const createCardViewDefinitions = (
  variant: ArtistCardVariant
): AppGridCardViewDefinitions<SpotifyArtist> => {
  const getCardVariantDefinition = (
    variant: ArtistCardVariant
  ): ArtistCardVariantDefinition => {
    let columnCount: 1 | 2 | 3 | 4 | 6 | 12 = 1;
    let rowSpacing;
    let sx: SxProps<Theme>;
    switch (variant) {
      case "small":
        columnCount = 4;
        sx = { borderRadius: "4px" };

        break;
      case "large":
        columnCount = 6;
        sx = { borderRadius: "16px" };
        break;
      case "track":
        columnCount = 1;
        rowSpacing = 0;
        sx = {
          borderRadius: "4px",
          backgroundColor: (theme) => theme.palette.background.default,
        };
        break;
    }

    return { columnCount, rowSpacing, sx };
  };

  const artistCardDefinition = getCardVariantDefinition(variant);

  return {
    xs: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyArtist) {
        return <ArtistCard variant={variant} artist={item} />;
      },
      loadingPlaceholder: <ArtistCard variant={variant} loadingPlaceholder />,
      columnCount: 1,
      cardSx: { borderRadius: variant === "small" ? "4px" : "16px" },
    },
    lg: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyArtist) {
        return <ArtistCard variant={variant} artist={item} />;
      },
      loadingPlaceholder: <ArtistCard variant={variant} loadingPlaceholder />,
      columnCount: 4,
      cardSx: { borderRadius: variant === "small" ? "4px" : "16px" },
    },
    xl: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyArtist) {
        return <ArtistCard variant={variant} artist={item} />;
      },
      loadingPlaceholder: <ArtistCard variant={variant} loadingPlaceholder />,
      rowSpacing: artistCardDefinition.rowSpacing,
      columnCount: artistCardDefinition.columnCount,
      cardSx: artistCardDefinition.sx,
    },
  };
};
