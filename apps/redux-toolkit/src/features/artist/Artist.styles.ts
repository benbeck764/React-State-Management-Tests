import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledTopTracksHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
  backgroundColor: theme.palette.coolGrey[900],
  position: "sticky",
}));
