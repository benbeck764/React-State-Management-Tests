import { Routes, Route, RouteProps } from "react-router-dom";
import { getSiteRoutes } from "./features/SiteRouting";

export const AppRouting = (): JSX.Element => {
  const allRoutes = [...getSiteRoutes()];

  return (
    <Routes>
      {allRoutes.map((props: RouteProps) => (
        <Route key={props.path} {...props} />
      ))}
    </Routes>
  );
};
