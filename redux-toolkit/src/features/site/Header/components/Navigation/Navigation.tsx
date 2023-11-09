import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  NavMenuOptions,
  NavMenuConfig,
  NavigationProps,
} from "./Navigation.props";
import { NavigationBar } from "./NavigationBar/NavigationBar";
import { NavigationDrawer } from "./NavigationDrawer/NavigationDrawer";

export const Navigation: FC<NavigationProps> = (props: NavigationProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClickOption = ({
    navigationAction,
    navigationRoute,
  }: NavMenuOptions) => {
    if (pathname !== navigationRoute) {
      if (navigationRoute) navigate(navigationRoute);
      else {
        if (navigationAction) navigationAction();
      }
    }
  };

  const navigationConfiguration: NavMenuConfig[] = [];

  if (props.variant === "bar") {
    return (
      <NavigationBar
        navigationConfig={navigationConfiguration}
        onClickOption={handleClickOption}
      />
    );
  } else {
    return (
      <NavigationDrawer
        navigationConfig={navigationConfiguration}
        onClickOption={handleClickOption}
      />
    );
  }
};
