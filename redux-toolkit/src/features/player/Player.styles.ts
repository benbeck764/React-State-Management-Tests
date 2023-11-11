import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledPlayerWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    paddingTop: theme.playerHeights["xs"],
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.playerHeights["sm"],
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.playerHeights["md"],
  },
  [theme.breakpoints.up("lg")]: {
    paddingTop: theme.playerHeights["lg"],
  },
  [theme.breakpoints.up("xl")]: {
    paddingTop: theme.playerHeights["xl"],
  },
}));

export const StyledPlayerContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#000000",
  paddingLeft: theme.spacing(2),

  [theme.breakpoints.up("xs")]: {
    maxHeight: theme.playerHeights["xs"],
    height: theme.playerHeights["xs"],
  },
  [theme.breakpoints.up("sm")]: {
    maxHeight: theme.playerHeights["sm"],
    height: theme.playerHeights["sm"],
  },
  [theme.breakpoints.up("md")]: {
    maxHeight: theme.playerHeights["md"],
    height: theme.playerHeights["md"],
  },
  [theme.breakpoints.up("lg")]: {
    maxHeight: theme.playerHeights["lg"],
    height: theme.playerHeights["lg"],
  },
  [theme.breakpoints.up("xl")]: {
    maxHeight: theme.playerHeights["xl"],
    height: theme.playerHeights["xl"],
  },
}));
