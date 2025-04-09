import { FC } from 'react';
import AppGrid, { AppGridProps, AppGridData } from '@benbeck764/react-components-grid/Grid';
import Typography from '@mui/material/Typography';
import { SpotifyTrack } from '@spotify-examples/spotify-models';
import { TracksGridProps } from '@/components/track/TracksGrid/TracksGrid.props';
import { createCardViewDefinitions } from '@/components/track/TracksGrid/TracksGrid.card';

const TracksGrid: FC<TracksGridProps> = (props: TracksGridProps) => {
  const {
    data,
    cardType,
    playType,
    playButtonProps,
    loading,
    virtualization,
    pageSize,
    sx,
    renderTrackLink,
    renderArtistLink
  } = props;

  const gridData: AppGridData<SpotifyTrack> = {
    pages:
      !data || loading
        ? [{ items: [], pageIndex: 0, pageSize: pageSize ?? 10, isLoading: true }]
        : [{ items: data, pageIndex: 0, pageSize: data.length, isLoading: false }],
    totalItemCount: data?.length ?? pageSize ?? 10,
    totalPageCount: 1,
    pagingMode: 'none'
  };

  const gridProps: AppGridProps<SpotifyTrack> = {
    data: gridData,
    cardView: createCardViewDefinitions({
      cardType,
      playType,
      playButtonProps,
      virtualization,
      sx,
      renderTrackLink,
      renderArtistLink
    }),
    displayMode: 'card',
    cursorStyle: 'pointer',
    noItemsMessage: <Typography variant="paragraph">No tracks found.</Typography>
  };

  return <AppGrid {...gridProps} />;
};

export default TracksGrid;
