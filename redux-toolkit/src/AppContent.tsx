import { FC, useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import AppPageLoader from "@benbeck764/react-components/PageLoader";
import { AppRouting } from "./routing/AppRouting";
import { useSpotifyAuth } from "./auth/useSpotifyAuth";
import { useGeniusAuth } from "./auth/useGeniusAuth";
import {
  StyledStickyHeaderContainer,
  StyledPageContainer,
  StyledPageContent,
} from "./App.styles";
import { Header } from "./features/site/Header/Header";
import Player from "./features/player/Player";

const AppContent: FC = () => {
  const { pathname } = useLocation();
  const { isAuthenticated, loginWithRedirect } = useSpotifyAuth();
  useGeniusAuth();

  useEffect(() => {
    (async (loginWithRedirect) => {
      if (!isAuthenticated) {
        await loginWithRedirect();
      }
    })(loginWithRedirect);
  }, [isAuthenticated, loginWithRedirect]);

  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

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
