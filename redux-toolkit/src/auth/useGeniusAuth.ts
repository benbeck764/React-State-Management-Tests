import { useEffect, useState } from "react";
import { GENIUS_CLIENT_ACCESS_TOKEN } from "../state/queries/models/genius.models";

type GeniusAuthContext = {
  isAuthenticated: boolean;
};

export const useGeniusAuth = (): GeniusAuthContext => {
  const token = localStorage.getItem(GENIUS_CLIENT_ACCESS_TOKEN);
  const [isAuthenticated] = useState<boolean>(token !== null);

  useEffect(() => {
    if (!token) configureAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const configureAccessToken = (): void => {
    const token = process.env.REACT_APP_GENIUS_CLIENT_ACCESS_TOKEN;
    if (!token) throw new Error("Error: Missing Genius Client Access Token!");

    localStorage.setItem(GENIUS_CLIENT_ACCESS_TOKEN, token);
  };

  return { isAuthenticated };
};
