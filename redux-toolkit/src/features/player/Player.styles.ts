import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export const StyledPlayerWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "playingOnOtherDevice",
})<{ playingOnOtherDevice: boolean }>(({ theme, playingOnOtherDevice }) => ({
  zIndex: 1051,
  [theme.breakpoints.up("xs")]: {
    paddingTop: theme.playerHeights["xs"] + (playingOnOtherDevice ? 32 : 0),
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: theme.playerHeights["sm"] + (playingOnOtherDevice ? 32 : 0),
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.playerHeights["md"] + (playingOnOtherDevice ? 32 : 0),
  },
  [theme.breakpoints.up("lg")]: {
    paddingTop: theme.playerHeights["lg"] + (playingOnOtherDevice ? 32 : 0),
  },
  [theme.breakpoints.up("xl")]: {
    paddingTop: theme.playerHeights["xl"] + (playingOnOtherDevice ? 32 : 0),
  },
}));

export const StyledPlayerContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "playingOnOtherDevice",
})<{ playingOnOtherDevice: boolean }>(({ theme, playingOnOtherDevice }) => ({
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
    marginBottom: playingOnOtherDevice ? 24 : 0,
  },
  [theme.breakpoints.up("sm")]: {
    maxHeight: theme.playerHeights["sm"],
    height: theme.playerHeights["sm"],
    marginBottom: playingOnOtherDevice ? 24 : 0,
  },
  [theme.breakpoints.up("md")]: {
    maxHeight: theme.playerHeights["md"],
    height: theme.playerHeights["md"],
    marginBottom: playingOnOtherDevice ? 24 : 0,
  },
  [theme.breakpoints.up("lg")]: {
    maxHeight: theme.playerHeights["lg"],
    height: theme.playerHeights["lg"],
    marginBottom: playingOnOtherDevice ? 24 : 0,
  },
  [theme.breakpoints.up("xl")]: {
    maxHeight: theme.playerHeights["xl"],
    height: theme.playerHeights["xl"],
    marginBottom: playingOnOtherDevice ? 24 : 0,
  },
}));

export const StyledPlayingOnOtherDeviceWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  borderRadius: theme.shape.borderRadius * 2,
  height: "24px",
  width: "100%",
  position: "fixed",
  bottom: 0,
  right: 0,
  zIndex: 1051,
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  paddingLeft: theme.spacing(7),
  paddingRight: theme.spacing(7),
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing(0.5),
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
