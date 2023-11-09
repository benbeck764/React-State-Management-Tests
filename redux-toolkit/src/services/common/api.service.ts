import { AxiosHeaders, AxiosInstance } from "axios";
import { ServiceResult } from "../models/api-shared.models";
import { getAxiosInstance } from "./axios-instance";

abstract class ApiService {
  protected readonly axiosInstance: AxiosInstance;
  protected readonly baseUrl: string;

  protected constructor() {
    this.baseUrl = "/api";
    this.axiosInstance = getAxiosInstance();
  }

  protected get<T>(url: string, params?: unknown): ServiceResult<T> {
    return this.axiosInstance.get(url, { params });
  }

  protected post<T>(
    url: string,
    body?: unknown,
    headers?: AxiosHeaders,
    requestType: "body" | "queryParams" = "body"
  ): ServiceResult<T> {
    return requestType === "body"
      ? this.axiosInstance.post(url, body, { headers })
      : this.axiosInstance.post(url, {}, { params: body, headers });
  }

  protected put<T>(
    url: string,
    body: unknown,
    requestType: "body" | "queryParams" = "body"
  ): ServiceResult<T> {
    return requestType === "body"
      ? this.axiosInstance.put(url, body)
      : this.axiosInstance.put(url, {}, { params: body });
  }

  protected delete<T>(url: string, body?: unknown): ServiceResult<T> {
    return this.axiosInstance.delete(url, { data: body });
  }
}

export default ApiService;
