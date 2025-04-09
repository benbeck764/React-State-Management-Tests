import { SxProps, Theme } from '@mui/material/styles';
import {
  AppGridCardViewDefinitions,
  AppGridVirtualizedProps
} from '@benbeck764/react-components-grid/Grid';
import { SpotifyArtist } from '@spotify-examples/spotify-models';
import {
  ArtistCardVariant,
  ArtistsGridProps
} from '@/components/artist/ArtistsGrid/ArtistGrid.props';
import ArtistCard from '@/components/artist/ArtistsGrid/cards/ArtistCard';

type ArtistCardVariantDefinition = {
  columnCount: 1 | 2 | 3 | 4 | 6 | 12;
  rowSpacing?: number;
  sx: SxProps<Theme>;
};

const cardVariantDefinitions: Record<ArtistCardVariant, ArtistCardVariantDefinition> = {
  small: {
    columnCount: 4,
    sx: { borderRadius: '4px' }
  },
  large: {
    columnCount: 6,
    sx: { borderRadius: '16px' }
  },
  track: {
    columnCount: 1,
    rowSpacing: 0,
    sx: { borderRadius: '4px', backgroundColor: (theme) => theme.palette.background.default }
  }
};

const commonVirtualizedProps: AppGridVirtualizedProps = {
  enabled: true,
  useWindowScroll: true
};

const getCardContent = (
  props: Pick<ArtistsGridProps, 'variant' | 'playButtonProps' | 'renderLink'>
) => ({
  getContent: (item: SpotifyArtist) => <ArtistCard artist={item} {...props} />,
  loadingPlaceholder: <ArtistCard variant={props.variant} loadingPlaceholder />
});

export const createCardViewDefinitions = (
  props: Pick<ArtistsGridProps, 'variant' | 'playButtonProps' | 'renderLink'>
): AppGridCardViewDefinitions<SpotifyArtist> => {
  const artistCardDefinition = cardVariantDefinitions[props.variant];
  const commonCardContent = getCardContent(props);

  return {
    xs: {
      ...commonVirtualizedProps,
      ...commonCardContent,
      columnCount: 1,
      cardSx: artistCardDefinition.sx
    },
    lg: {
      ...commonVirtualizedProps,
      ...commonCardContent,
      columnCount: 4,
      cardSx: artistCardDefinition.sx
    },
    xl: {
      ...commonVirtualizedProps,
      ...commonCardContent,
      ...artistCardDefinition,
      cardSx: artistCardDefinition.sx
    }
  };
};
