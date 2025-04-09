import { ArtistsGridProps } from '@/components/artist/ArtistsGrid/ArtistGrid.props';
import ArtistCardLarge from '@/components/artist/ArtistsGrid/cards/ArtistCard.large';
import ArtistCardSmall from '@/components/artist/ArtistsGrid/cards/ArtistCard.small';
import ArtistCardTrack from '@/components/artist/ArtistsGrid/cards/ArtistCard.track';
import { SpotifyArtist } from '@spotify-examples/spotify-models';
import { FC } from 'react';

export type ArtistCardProps = Pick<ArtistsGridProps, 'variant' | 'playButtonProps' | 'renderLink'> &
  (
    | {
        artist: SpotifyArtist;
        loadingPlaceholder?: boolean;
      }
    | {
        artist?: SpotifyArtist;
        loadingPlaceholder: true;
      }
  );

const ArtistCard: FC<ArtistCardProps> = (props: ArtistCardProps) => {
  const { variant: cardVariant } = props;

  if (cardVariant === 'small') return <ArtistCardSmall {...props} />;
  if (cardVariant === 'large') return <ArtistCardLarge {...props} />;
  if (cardVariant === 'track') return <ArtistCardTrack {...props} />;
};

export default ArtistCard;
