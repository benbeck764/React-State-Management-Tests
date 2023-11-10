import Link from "@mui/material/Link";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { FC, PropsWithChildren } from "react";

type AppLinkProps = PropsWithChildren<RouterLinkProps>;

export const AppLink: FC<AppLinkProps> = (props: AppLinkProps) => {
  const { children, ...linkProps } = props;

  return (
    <Link
      component={RouterLink}
      sx={{ color: (theme) => theme.palette.text.primary }}
      {...linkProps}
    >
      {children}
    </Link>
  );
};
