import { AppGridCardViewDefinitions } from "@benbeck764/react-components-grid/Grid";
import { SpotifyAlbum } from "../../../state/queries/models/spotify.models";
import AlbumCard, { AlbumCardType } from "./AlbumCard";

export const createCardViewDefinitions = (
  cardType: AlbumCardType
): AppGridCardViewDefinitions<SpotifyAlbum> => ({
  xs: {
    virtualizedProps: {
      enabled: true,
      useWindowScroll: true,
    },
    getContent: function Card(item: SpotifyAlbum) {
      return <AlbumCard album={item} type={cardType} />;
    },
    loadingPlaceholder: <AlbumCard loadingPlaceholder />,
    columnCount: 1,
    cardSx: { borderRadius: "16px" },
  },
  lg: {
    virtualizedProps: {
      enabled: true,
      useWindowScroll: true,
    },
    getContent: function Card(item: SpotifyAlbum) {
      return <AlbumCard album={item} type={cardType} />;
    },
    loadingPlaceholder: <AlbumCard loadingPlaceholder />,
    columnCount: 4,
    cardSx: { borderRadius: "16px" },
  },
  xl: {
    virtualizedProps: {
      enabled: true,
      useWindowScroll: true,
    },
    getContent: function Card(item: SpotifyAlbum) {
      return <AlbumCard album={item} type={cardType} />;
    },
    loadingPlaceholder: <AlbumCard loadingPlaceholder />,
    columnCount: 6,
    cardSx: { borderRadius: "16px" },
  },
});
