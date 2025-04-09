import { SpotifyTracksGrid, SpotifyTracksGridProps } from '@spotify-examples/components';
import { FC } from 'react';

type TracksGridProps = Pick<SpotifyTracksGridProps, 'cardType' | 'data' | 'loading' | 'playType'>;

const TracksGrid: FC<TracksGridProps> = (props: TracksGridProps) => {
  const { cardType, data, loading, playType } = props;

  return (
    <SpotifyTracksGrid cardType={cardType} data={data} loading={loading} playType={playType} />
  );
};

export default TracksGrid;
