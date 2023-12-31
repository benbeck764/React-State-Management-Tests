import { FC } from "react";
import { StyledHeaderContainer } from "./Header.styles";
import { AppRoutes, RouteName } from "../../../routing/common/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreakpoint } from "@benbeck764/react-components";
import AppButton from "@benbeck764/react-components/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import SpotifyWhiteLogo from "../../../assets/Spotify_Logo_RGB_White.png";
import { useSpotifyAuth } from "../../../auth/useSpotifyAuth";
import { useGetUserProfileQuery } from "../../../state/queries/user.api";
import { StyledPageContainer, StyledPageContent } from "../../../App.styles";
import SearchInput from "./SearchInput/SearchInput";

export const Header: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { breakpoint } = useBreakpoint();

  const { isAuthenticated } = useSpotifyAuth();
  const { data: spotifyUser } = useGetUserProfileQuery(null, {
    skip: !isAuthenticated,
  });

  return (
    <>
      <StyledHeaderContainer>
        <AppBar color="primary" elevation={0}>
          <Toolbar
            variant="dense"
            sx={{
              px: breakpoint === "xl" ? 3 : `8px !important`,
            }}
          >
            <StyledPageContainer
              container
              direction="column"
              width="100vw"
              sx={{ backgroundColor: (theme) => theme.palette.primary.main }}
            >
              <StyledPageContent sx={{ margin: 0 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={1.5}
                  >
                    <AppButton>
                      <Box
                        component="img"
                        src={SpotifyWhiteLogo}
                        sx={{
                          py: 1,
                          height: (theme) => theme.headerHeights?.[breakpoint],
                        }}
                        onClick={() => {
                          if (pathname !== AppRoutes[RouteName.Site].path) {
                            navigate(AppRoutes[RouteName.Site].path);
                          }
                        }}
                      ></Box>
                    </AppButton>
                    <SearchInput />
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={1.5}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: (theme) => theme.palette.text.primary }}
                    >{`Welcome, ${spotifyUser?.display_name}!`}</Typography>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: (theme) => theme.palette.text.primary,
                      }}
                      {...(spotifyUser?.images[0].url && {
                        src: spotifyUser?.images[0].url,
                      })}
                    >
                      {!spotifyUser?.images[0].url && (
                        <PersonIcon
                          sx={{
                            color: (theme) => theme.palette.primary.light,
                            fontSize: 40,
                          }}
                        />
                      )}
                    </Avatar>
                  </Stack>
                </Stack>
              </StyledPageContent>
            </StyledPageContainer>
          </Toolbar>
        </AppBar>
      </StyledHeaderContainer>
    </>
  );
};
