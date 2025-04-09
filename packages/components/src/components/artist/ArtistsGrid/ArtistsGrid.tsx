import { FC } from 'react';
import Typography from '@mui/material/Typography';
import AppGrid, { AppGridProps, AppGridData } from '@benbeck764/react-components-grid/Grid';
import { SpotifyArtist } from '@spotify-examples/spotify-models';
import { createCardViewDefinitions } from './ArtistGrid.card';
import { ArtistsGridProps } from './ArtistGrid.props';

const ArtistsGrid: FC<ArtistsGridProps> = (props: ArtistsGridProps) => {
  const { data, loading, pageSize, variant, playButtonProps, onArtistSelected, renderLink } = props;

  const gridData: AppGridData<SpotifyArtist> = {
    pages:
      !data || loading
        ? [{ items: [], pageIndex: 0, pageSize: pageSize ?? 16, isLoading: true }]
        : [{ items: data, pageIndex: 0, pageSize: data.length, isLoading: false }],
    totalItemCount: data?.length ?? pageSize ?? 16,
    totalPageCount: 1,
    pagingMode: 'none'
  };

  const gridProps: AppGridProps<SpotifyArtist> = {
    data: gridData,
    cardView: createCardViewDefinitions({ variant, playButtonProps, renderLink }),
    displayMode: 'card',
    cursorStyle: 'pointer',
    onItemClicked: onArtistSelected,
    noItemsMessage: <Typography variant="paragraph">No artists found.</Typography>
  };

  return <AppGrid {...gridProps} />;
};

export default ArtistsGrid;
