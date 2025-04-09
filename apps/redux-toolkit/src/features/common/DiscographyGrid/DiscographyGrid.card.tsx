import { AppGridCardViewDefinitions } from "@benbeck764/react-components-grid/Grid";
import { SpotifyAlbum } from "../../../state/queries/models/spotify.models";
import DiscographyCard from "./DiscographyCard";

export const createCardViewDefinitions =
  (): AppGridCardViewDefinitions<SpotifyAlbum> => ({
    xs: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyAlbum) {
        return <DiscographyCard album={item} />;
      },
      loadingPlaceholder: <DiscographyCard loadingPlaceholder />,
      columnCount: 1,
    },
    lg: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyAlbum) {
        return <DiscographyCard album={item} />;
      },
      loadingPlaceholder: <DiscographyCard loadingPlaceholder />,
      columnCount: 1,
    },
    xl: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyAlbum) {
        return <DiscographyCard album={item} />;
      },
      loadingPlaceholder: <DiscographyCard loadingPlaceholder />,
      columnCount: 1,
    },
  });
