import { AppGridCardViewDefinitions } from "@benbeck764/react-components-grid/Grid";
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import ArtistCard from "./ArtistCard";

export const createCardViewDefinitions =
  (): AppGridCardViewDefinitions<SpotifyArtist> => ({
    xs: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyArtist) {
        return <ArtistCard artist={item} />;
      },
      loadingPlaceholder: <ArtistCard loadingPlaceholder />,
      columnCount: 1,
      cardSx: { borderRadius: "16px" },
    },
    lg: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyArtist) {
        return <ArtistCard artist={item} />;
      },
      loadingPlaceholder: <ArtistCard loadingPlaceholder />,
      columnCount: 4,
      cardSx: { borderRadius: "16px" },
    },
    xl: {
      virtualizedProps: {
        enabled: true,
        useWindowScroll: true,
      },
      getContent: function Card(item: SpotifyArtist) {
        return <ArtistCard artist={item} />;
      },
      loadingPlaceholder: <ArtistCard loadingPlaceholder />,
      columnCount: 6,
      cardSx: { borderRadius: "16px" },
    },
  });
