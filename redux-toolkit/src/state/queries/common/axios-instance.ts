import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import {
  SPOTIFY_ACCESS_TOKEN,
  SpotifyAccessToken,
} from "../models/spotify.models";

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
    (error: AxiosError) => Promise.reject(error)
  );

  return axiosInstance;
};
