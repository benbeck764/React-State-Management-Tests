import TrackCardSearch from '@/components/track/TracksGrid/cards/TrackCard.search';
import TrackCardTopTracks from '@/components/track/TracksGrid/cards/TrackCard.top';
import { TracksGridProps } from '@/components/track/TracksGrid/TracksGrid.props';
import { SpotifyTrack } from '@spotify-examples/spotify-models';

export type TrackCardBaseProps = Pick<
  TracksGridProps,
  | 'cardType'
  | 'playType'
  | 'playButtonProps'
  | 'virtualization'
  | 'sx'
  | 'renderTrackLink'
  | 'renderArtistLink'
>;

export type TrackCardProps = TrackCardBaseProps &
  (
    | {
        track: SpotifyTrack;
        index: number;
        loadingPlaceholder?: never;
      }
    | {
        track?: never;
        index?: never;
        loadingPlaceholder: true;
      }
  );

const TrackCard = (props: TrackCardProps) => {
  const { cardType } = props;

  if (cardType === 'top-track') return <TrackCardTopTracks {...props} />;
  if (cardType === 'search') return <TrackCardSearch {...props} />;
};

export default TrackCard;
