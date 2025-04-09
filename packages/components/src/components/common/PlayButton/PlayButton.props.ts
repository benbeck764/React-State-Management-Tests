import { SxProps, Theme } from '@mui/material/styles';
import { SpotifyPlaybackState } from '@spotify-examples/spotify-models';

export type PlayButtonPlayType = 'artist' | 'album' | 'track' | 'playlist';
type PlayButtonVariant = 'action-button' | 'button';
type PlayButtonSize = 'small' | 'medium' | 'large';

export type PlayButtonProps = {
  type: PlayButtonPlayType;
  variant: PlayButtonVariant;
  size?: PlayButtonSize;

  dataUri: string;
  playbackState: SpotifyPlaybackState | undefined;
  deviceId: string | undefined;
  offsetUri?: string;
  onPause?: (deviceId: string) => void;
  onResume?: (deviceId: string) => void;
  onPlay?: ({
    deviceId,
    contextUri,
    uris,
    offset
  }: {
    deviceId: string;
    contextUri?: string;
    uris?: string[];
    offset?: { uri: string };
  }) => void;

  sx?: SxProps<Theme>;
  stopPropagation?: boolean;
  tooltipText?: string;
};
