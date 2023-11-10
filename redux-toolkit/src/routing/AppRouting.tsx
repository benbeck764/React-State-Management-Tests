import { Routes, Route, RouteProps } from "react-router-dom";
import { getSiteRoutes } from "./features/SiteRouting";
import { getArtistRoutes } from "./features/ArtistRouting";

export const AppRouting = (): JSX.Element => {
  const allRoutes = [...getSiteRoutes(), ...getArtistRoutes()];

  return (
    <Routes>
      {allRoutes.map((props: RouteProps) => (
        <Route key={props.path} {...props} />
      ))}
    </Routes>
  );
};
