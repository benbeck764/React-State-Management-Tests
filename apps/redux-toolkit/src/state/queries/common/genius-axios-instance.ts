import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { GENIUS_CLIENT_ACCESS_TOKEN } from "../models/genius.models";

let axiosInstance: AxiosInstance;

export const getGeniusAxiosInstance = (): AxiosInstance => {
  if (axiosInstance) return axiosInstance;
  axiosInstance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => {
      const accessToken = localStorage.getItem(GENIUS_CLIENT_ACCESS_TOKEN);
      if (!accessToken) return request;

      request.headers.Accept = "application/json";
      request.headers["Content-Type"] = "application/json";
      request.params = {
        ...request.params,
        access_token: accessToken,
      };

      return request;
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<unknown>) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        const token = process.env.REACT_APP_GENIUS_CLIENT_ACCESS_TOKEN;
        if (!token)
          throw new Error("Error: Missing Genius Client Access Token!");

        localStorage.setItem(GENIUS_CLIENT_ACCESS_TOKEN, token);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
