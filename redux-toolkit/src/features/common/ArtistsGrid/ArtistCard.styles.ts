import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "16px",
  "&:hover": {
    backgroundColor: theme.palette.coolGrey[800],
  },
}));
