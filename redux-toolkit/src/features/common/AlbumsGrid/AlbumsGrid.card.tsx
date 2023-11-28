import { AppGridCardViewDefinitions } from "@benbeck764/react-components-grid/Grid";
import { SpotifyAlbum } from "../../../state/queries/models/spotify.models";
import AlbumCard, { AlbumCardType } from "./AlbumCard";

export const createCardViewDefinitions = (
  cardType: AlbumCardType,
  latestRelease: boolean
): AppGridCardViewDefinitions<SpotifyAlbum> => ({
  xs: {
    virtualizedProps: {
      enabled: true,
      useWindowScroll: true,
    },
    getContent: function Card(item: SpotifyAlbum, index: number) {
      return (
        <AlbumCard
          album={item}
          type={cardType}
          latestRelease={latestRelease && index === 0}
        />
      );
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
    getContent: function Card(item: SpotifyAlbum, index: number) {
      return (
        <AlbumCard
          album={item}
          type={cardType}
          latestRelease={latestRelease && index === 0}
        />
      );
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
    getContent: function Card(item: SpotifyAlbum, index: number) {
      return (
        <AlbumCard
          album={item}
          type={cardType}
          latestRelease={latestRelease && index === 0}
        />
      );
    },
    loadingPlaceholder: <AlbumCard loadingPlaceholder />,
    columnCount: 6,
    cardSx: { borderRadius: "16px" },
  },
});
