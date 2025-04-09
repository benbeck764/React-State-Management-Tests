import { AppGridCardViewDefinitions } from '@benbeck764/react-components-grid/Grid';
import { SpotifyTrack } from '@spotify-examples/spotify-models';
import TrackCard, { TrackCardBaseProps } from '@/components/track/TracksGrid/cards/TrackCard';

const trackCardBaseProps = (props: TrackCardBaseProps) => ({
  getContent: (item: SpotifyTrack, index: number) => (
    <TrackCard index={index} track={item} {...props} />
  ),
  loadingPlaceholder: <TrackCard loadingPlaceholder {...props} />,
  columnCount: 1 as const,
  gridProps: { sx: { width: '100%' } }
});

export const createCardViewDefinitions = (
  props: TrackCardBaseProps
): AppGridCardViewDefinitions<SpotifyTrack> => {
  const commonProps = trackCardBaseProps(props);

  return {
    xs: {
      ...commonProps,
      virtualizedProps: props.virtualization,
      cardSx: { borderRadius: '16px', ...props.sx }
    },
    lg: {
      ...commonProps,
      virtualizedProps: props.virtualization,
      cardSx: { borderRadius: '16px', ...props.sx }
    },
    xl: {
      ...commonProps,
      virtualizedProps: props.virtualization,
      rowSpacing: 0,
      cardSx: { borderRadius: '0px', ...props.sx }
    }
  };
};
