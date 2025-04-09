import axios, { AxiosInstance } from 'axios';

let axiosInstance: AxiosInstance;

export const getSpotifyAxiosInstance = (): AxiosInstance => {
  if (axiosInstance) return axiosInstance;
  axiosInstance = axios.create({
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
  });
  return axiosInstance;
};
