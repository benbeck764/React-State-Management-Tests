import AppButton from "@benbeck764/react-components/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const StyledNavigationLink = styled(Link)(() => ({
  textDecoration: "none",
}));

export const StyledNavigationLinkTypography = styled(Typography)(
  ({ theme }) => ({
    "&.MuiTypography-root": {
      color: theme.palette.common.black,
      "&: hover": {
        backgroundColor: theme.palette.coolGrey[100],
        boxRadius: 8,
      },
    },
  })
);

export const StyledNavigationButton = styled(AppButton)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    color: theme.palette.common.white,
    "&:focus": {
      color: theme.palette.primary.dark,
    },
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
}));
