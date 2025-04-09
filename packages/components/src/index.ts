// Default Theme & Overrides
export { default as ThemeProvider } from '@benbeck764/react-components/theme';
export * from './theme/overrides.theme';
export { default as getDefaultTheme } from './theme/theme';

// Layout
export { default as SpotifyLayout } from './components/common/layout/Layout';
export { default as SpotifyHeader } from './components/common/layout/Header/Header';

// Common Components
export { default as SpotifyGreeting } from './components/common/Greeting';
export { default as SpotifyEqualizer } from './components/common/Equalizer/Equalizer';
export { default as SpotifyPlayButton } from './components/common/PlayButton/PlayButton';
export { default as SpotifyScrollingContainer } from './components/common/ScrollingContainer/ScrollingContainer';

// Artist
export { default as SpotifyArtistsGrid } from './components/artist/ArtistsGrid/ArtistsGrid';

// Track
export { default as SpotifyTracksGrid } from './components/track/TracksGrid/TracksGrid';
export { type TracksGridProps as SpotifyTracksGridProps } from './components/track/TracksGrid/TracksGrid.props';
