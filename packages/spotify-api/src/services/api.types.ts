export type RequestType = 'body' | 'query-params';
export type ServiceResult<T> = Promise<T>;
export type AwaitedServiceResult<T> = Awaited<ServiceResult<T>>;
