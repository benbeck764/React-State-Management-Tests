import { FC } from 'react';
import { useBreakpoint } from '@benbeck764/react-components';
import AppButton from '@benbeck764/react-components/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SpotifyUser } from '@spotify-examples/spotify-models';
import { StyledPageContainer, StyledPageContent } from '../Layout.styles';
import { StyledHeaderContainer } from './Header.styles';
import SearchInput from './SearchInput/SearchInput';
import UserWelcome from './UserWelcome/UserWelcome';

type HeaderProps = {
  logoImage: string;
  user: SpotifyUser | undefined;
  searchTerm: string;
  onLogoClick?: () => void;
  onSearch?: (searchTerm: string) => void;
  onSearchClear?: () => void;
};

export const Header: FC<HeaderProps> = (props) => {
  const { logoImage, user, searchTerm, onLogoClick, onSearch, onSearchClear } = props;

  const { breakpoint } = useBreakpoint();

  return (
    <StyledHeaderContainer>
      <AppBar color="primary" elevation={0}>
        <Toolbar variant="dense" sx={{ px: breakpoint === 'xl' ? 3 : `8px !important` }}>
          <StyledPageContainer
            container
            direction="column"
            sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
          >
            <StyledPageContent sx={{ margin: 0 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                <Stack direction="row" alignItems="center" justifyContent="center" gap={1.5}>
                  <AppButton>
                    <Box
                      component="img"
                      src={logoImage}
                      sx={{ py: 1, height: (theme) => theme.headerHeights?.[breakpoint] }}
                      onClick={onLogoClick}
                    />
                  </AppButton>
                  <SearchInput
                    searchTerm={searchTerm}
                    onChange={onSearch}
                    onClear={onSearchClear}
                  />
                </Stack>
                <UserWelcome user={user} />
              </Stack>
            </StyledPageContent>
          </StyledPageContainer>
        </Toolbar>
      </AppBar>
    </StyledHeaderContainer>
  );
};

export default Header;
