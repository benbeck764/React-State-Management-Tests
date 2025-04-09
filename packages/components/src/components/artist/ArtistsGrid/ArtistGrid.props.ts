import { PlayButtonProps } from '@/components/common/PlayButton/PlayButton.props';
import { SpotifyArtist } from '@spotify-examples/spotify-models';

export type ArtistCardVariant = 'small' | 'large' | 'track';

type ArtistsGridPlayButtonProps = Pick<
  PlayButtonProps,
  'playbackState' | 'deviceId' | 'onPause' | 'onResume' | 'onPlay'
>;

export type ArtistsGridProps = {
  /**
   * The variant of the artist card.
   */
  variant: ArtistCardVariant;
  /**
   * The data for the artist cards.
   */
  data: SpotifyArtist[] | undefined;
  /**
   * Whether the artist grid is loading.
   */
  loading: boolean;
  /**
   * The number of items to display per page.
   */
  pageSize?: number;
  /**
   * Props for the play button.
   */
  playButtonProps?: ArtistsGridPlayButtonProps;
  /**
   * Callback function called when an artist is selected.
   * @param artist The selected Spotify Artist.
   * @returns void
   */
  onArtistSelected?: (artist: SpotifyArtist) => void;
  /**
   * This is necessary to allow for flexible routing when using `variant='track'`.
   *
   * @param {SpotifyArtist} artist The Spotify Artist.
   * @returns {React.ElementType} A Link Component.
   */
  renderLink?: (artist: SpotifyArtist) => React.ElementType;
};
