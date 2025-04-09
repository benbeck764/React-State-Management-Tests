import Link, { LinkProps } from "@mui/material/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { FC, PropsWithChildren } from "react";
import { SxProps, Theme } from "@mui/material/styles";

type AppLinkProps = PropsWithChildren<LinkProps & RouterLinkProps>;

export const AppLink: FC<AppLinkProps> = (props: AppLinkProps) => {
  const { children, sx, ...linkProps } = props;

  const augmentedSx: SxProps<Theme> = {
    textDecoration: "none",
    color: (theme) => theme.palette.text.primary,
    "&:hover": {
      textDecoration: "underline",
      color: (theme) => theme.palette.text.primary,
    },
    ...sx,
  };

  return (
    <Link component={RouterLink} sx={augmentedSx} {...linkProps}>
      {children}
    </Link>
  );
};
