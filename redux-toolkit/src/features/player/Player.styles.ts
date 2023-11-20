import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

export const StyledPlayerWrapper = styled(Box)(({ theme }) => ({
  zIndex: 1051,
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
  paddingRight: theme.spacing(2),

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

export const StyledPlayerButton = styled(IconButton)(() => ({
  padding: 0,
}));

export const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.common.white,
  height: 4,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  "&:hover": {
    "& .MuiSlider-track": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiSlider-thumb": {
    width: 8,
    height: 8,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.grey[300],
  },
  "& .MuiSlider-track": {
    color: theme.palette.common.white,
  },
}));
