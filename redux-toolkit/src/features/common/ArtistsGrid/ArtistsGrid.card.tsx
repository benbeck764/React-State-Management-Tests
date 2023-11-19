import { AppGridCardViewDefinitions } from "@benbeck764/react-components-grid/Grid";
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import ArtistCard from "./cards/ArtistCard";
import { ArtistCardVariant } from "./ArtistsGrid";

export const createCardViewDefinitions = (
  variant: ArtistCardVariant
): AppGridCardViewDefinitions<SpotifyArtist> => ({
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
    columnCount: variant === "small" ? 4 : 6,
    cardSx: { borderRadius: variant === "small" ? "4px" : "16px" },
  },
});
