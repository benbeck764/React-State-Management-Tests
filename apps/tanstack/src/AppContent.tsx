import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { SpotifyHeader, SpotifyLayout } from '@spotify-examples/components';
import SpotifyWhiteLogo from './assets/Spotify_Logo_RGB_White.png';
import { debounce } from '@spotify-examples/utilities';
import { useGetUserProfileQuery } from '@/queries/user.queries';
import Player from '@/features/player/Player';

const AppContent: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: spotifyUser } = useGetUserProfileQuery();

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleLogoClick = async (): Promise<void> => {
    await navigate({ to: '/', replace: true });
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (searchTerm: string) => {
          // [TODO]
          //navigate({to: ''});
        },
        200,
        { leading: true, trailing: true }
      ),
    []
  );

  const handleOnSearch = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
    if (searchTerm) debouncedSearch(searchTerm);
  };

  const handleOnSearchClear = async (): Promise<void> => {
    setSearchTerm('');
    await navigate({ to: '/', replace: true });
  };

  // Navigating away from search page should clear search input
  useEffect(() => {
    const originalString = /^\/search\/([^/]+)$/;
    const isMatch = originalString.test(pathname);
    if (!isMatch) setSearchTerm('');
  }, [pathname]);

  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  const HeaderComponent = (
    <SpotifyHeader
      logoImage={SpotifyWhiteLogo}
      user={spotifyUser}
      searchTerm={searchTerm}
      onLogoClick={handleLogoClick}
      onSearch={handleOnSearch}
      onSearchClear={handleOnSearchClear}
    />
  );

  // [TODO]:
  const PlayerComponent = <Player />;

  return (
    <SpotifyLayout HeaderComponent={HeaderComponent} PlayerComponent={PlayerComponent}>
      <Outlet />
    </SpotifyLayout>
  );
};

export default AppContent;
