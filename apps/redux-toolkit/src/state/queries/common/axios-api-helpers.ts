import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { getSpotifyAxiosInstance } from "./spotify-axios-instance";
import { getGeniusAxiosInstance } from "./genius-axios-instance";

type AxiosInstanceType = "spotify" | "genius";
export const axiosBaseQuery =
  ({
    instanceType,
    baseUrl,
  }: {
    instanceType: AxiosInstanceType;
    baseUrl: string;
  }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const axiosInstance =
        instanceType === "spotify"
          ? getSpotifyAxiosInstance()
          : getGeniusAxiosInstance();
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
