import { endpoints } from '../endpoints';
import { RequestType } from './api.types';
import { applyInterceptors } from './inteceptor.manager';

const baseUrl = endpoints.spotify.base;

//#region Helpers

const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  // Apply all interceptors before making the request
  const finalOptions = await applyInterceptors(options);

  const response = await fetch(`${baseUrl}${url}`, finalOptions);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json() as Promise<T>;
  }

  return response as unknown as Promise<T>;
};

const handleBodyRequest = <T>(
  method: string,
  url: string,
  body?: unknown,
  requestType: RequestType = 'body'
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  let fullUrl = url;

  if (requestType === 'body') {
    options.body = JSON.stringify(body);
  } else {
    const queryString = createQueryString(body as Record<string, unknown>);
    if (queryString) {
      fullUrl = `${url}?${queryString}`;
    }
  }

  return request<T>(fullUrl, options);
};

const createQueryString = (params?: Record<string, unknown>): string => {
  if (!params) return '';

  const stringifiedParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      acc[key] = String(value);
      return acc;
    },
    {} as Record<string, string>
  );

  return new URLSearchParams(stringifiedParams).toString();
};

//#endregion

export const get = <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
  const queryString = createQueryString(params);
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  return request<T>(fullUrl);
};

export const post = <T>(
  url: string,
  body?: unknown,
  requestType: RequestType = 'body'
): Promise<T> => {
  return handleBodyRequest<T>('POST', url, body, requestType);
};

export const put = <T>(
  url: string,
  body?: unknown,
  requestType: RequestType = 'body'
): Promise<T> => {
  return handleBodyRequest<T>('PUT', url, body, requestType);
};

export const del = <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
  const fullUrl = params
    ? `${url}?${new URLSearchParams(params as Record<string, string>).toString()}`
    : url;

  return request<T>(fullUrl, { method: 'DELETE' });
};
