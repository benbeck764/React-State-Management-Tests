import { AxiosResponse } from "axios";

export type ServiceResult<T> = Promise<AwaitedServiceResult<T>>;
export type AwaitedServiceResult<T> = AxiosResponse<T>;
