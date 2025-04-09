import { FC, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGeniusAuth } from './auth/useGeniusAuth';
import { SpotifyHeader, SpotifyLayout } from '@spotify-examples/components';
import SpotifyWhiteLogo from './assets/Spotify_Logo_RGB_White.png';
import { useGetUserProfileQuery } from '@/state/queries/user.api';
import { useSpotifyAuth } from '@spotify-examples/spotify-auth';
import { AppRoutes, RouteName } from '@/routing/common/routes';
import { getSearchUrl } from '@/routing/common/url';
import { AppRouting } from '@/routing/AppRouting';
import Player from '@/features/player/Player';
import { debounce } from '@spotify-examples/utilities';

const AppContent: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useGeniusAuth();

  const { isAuthenticated } = useSpotifyAuth();
  const { data: spotifyUser } = useGetUserProfileQuery(null, {
    skip: !isAuthenticated
  });

  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleLogoClick = (): void => {
    if (pathname !== AppRoutes[RouteName.Site].path) {
      navigate(AppRoutes[RouteName.Site].path);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (searchTerm: string) => {
          navigate(getSearchUrl(encodeURI(searchTerm)));
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

  const handleOnSearchClear = (): void => {
    setSearchTerm('');
    navigate(AppRoutes[RouteName.Site].path);
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

  const PlayerComponent = <Player />;

  return (
    <SpotifyLayout HeaderComponent={HeaderComponent} PlayerComponent={PlayerComponent}>
      <AppRouting />
    </SpotifyLayout>
  );
};

export default AppContent;
