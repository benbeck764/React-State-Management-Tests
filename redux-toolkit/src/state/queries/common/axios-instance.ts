import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  SPOTIFY_ACCESS_TOKEN,
  SpotifyAccessToken,
} from "../models/spotify.models";
import { endpoints } from "./endpoints";

let axiosInstance: AxiosInstance;

export const getAxiosInstance = (): AxiosInstance => {
  if (axiosInstance) return axiosInstance;
  axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => {
      const tokenString = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
      if (!tokenString) return request;

      const { access_token: accessToken } = JSON.parse(
        tokenString
      ) as SpotifyAccessToken;

      if (accessToken) {
        request.headers.Accept = "application/json";
        request.headers["Content-Type"] = "application/json";
        request.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return request;
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<unknown>) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const tokenString = localStorage.getItem(SPOTIFY_ACCESS_TOKEN);
        if (!tokenString) return error.response;

        const { refresh_token: refreshToken } = JSON.parse(
          tokenString
        ) as SpotifyAccessToken;

        const headers = new AxiosHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );

        if (refreshToken && clientId) {
          const response = await axios.post<SpotifyAccessToken>(
            endpoints.spotify.token,
            new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: refreshToken,
              client_id: clientId,
            }),
            { headers }
          );

          localStorage.setItem(
            SPOTIFY_ACCESS_TOKEN,
            JSON.stringify(response.data)
          );
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
