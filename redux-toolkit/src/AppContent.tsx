import { FC, useEffect } from "react";
import { AppRouting } from "./routing/AppRouting";
import { useSpotifyAuth } from "./auth/useSpotifyAuth";
import AppPageLoader from "@benbeck764/react-components/PageLoader";
import Stack from "@mui/material/Stack";
import {
  StyledStickyHeaderContainer,
  StyledPageContainer,
  StyledPageContent,
} from "./App.styles";
import { Header } from "./features/site/Header/Header";
import Player from "./features/player/Player";

const AppContent: FC = () => {
  const { isAuthenticated, loginWithRedirect } = useSpotifyAuth();

  useEffect(() => {
    (async (loginWithRedirect) => {
      if (!isAuthenticated) {
        await loginWithRedirect();
      }
    })(loginWithRedirect);
  }, [isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) return <AppPageLoader />;

  return (
    <Stack>
      <StyledStickyHeaderContainer>
        <Header />
      </StyledStickyHeaderContainer>

      <StyledPageContainer container direction="column">
        <StyledPageContent>
          <AppRouting />
        </StyledPageContent>
        <Player />
      </StyledPageContainer>
    </Stack>
  );
};

export default AppContent;
