import {
  PlayButtonPlayType,
  PlayButtonProps
} from '@/components/common/PlayButton/PlayButton.props';
import { AppGridVirtualizedProps } from '@benbeck764/react-components-grid';
import { SxProps, Theme } from '@mui/material/styles';
import { SpotifyArtist, SpotifyTrack } from '@spotify-examples/spotify-models';

export type TrackCardType = 'top-track' | 'search';

type TracksGridPlayButtonProps = Pick<
  PlayButtonProps,
  'playbackState' | 'deviceId' | 'onPause' | 'onResume' | 'onPlay'
>;

export type TracksGridProps = {
  /**
   * The type of card to display for each track.
   */
  cardType: TrackCardType;
  /**
   * The data for the track cards.
   */
  data: SpotifyTrack[] | undefined;
  /**
   * Whether the track grid is loading data.
   */
  loading: boolean;
  /**
   * The type of play button to display for each track.
   */
  playType: PlayButtonPlayType;
  /**
   * Props for the play button.
   */
  playButtonProps?: TracksGridPlayButtonProps;
  /**
   * The virtualization options for the grid.
   */
  virtualization?: AppGridVirtualizedProps;
  /**
   * The number of items to display per page.
   */
  pageSize?: number;
  /**
   * The styles to apply to the grid.
   */
  sx?: SxProps<Theme>;
  /**
   * This is necessary to allow for flexible routing.
   *
   * @param {SpotifyTrack} track The Spotify Track.
   * @returns {React.ElementType} A Link Component.
   */
  renderTrackLink: (track: SpotifyTrack) => React.ElementType;
  /**
   * This is necessary to allow for flexible routing.
   *
   * @param {SpotifyArtist} artist The Spotify Artist.
   * @returns {React.ElementType} A Link Component.
   */
  renderArtistLink: (artist: SpotifyArtist, index: number) => React.ElementType;
};
