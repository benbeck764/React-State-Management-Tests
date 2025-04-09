export type Interceptor = (config: RequestInit) => RequestInit | Promise<RequestInit>;

type InterceptorEntry = {
  id: number;
  interceptor: Interceptor;
};

const interceptors: InterceptorEntry[] = [];
let nextId = 0;

/**
 * Adds an interceptor function to the shared interceptors array.
 * Interceptors are executed in the order they are added.
 *
 * @param interceptor The function to add as an interceptor.
 */
export const addInterceptor = (interceptor: Interceptor): number => {
  const id = nextId++;
  interceptors.push({ id, interceptor });
  return id;
};

/**
 * Removes an interceptor function from the shared interceptors array.
 *
 * @param id The unique identifier of the interceptor to remove.
 */
export const removeInterceptor = (id: number): void => {
  const index = interceptors.findIndex((entry) => entry.id === id);
  if (index > -1) interceptors.splice(index, 1);
};

/**
 * Executes all registered interceptors sequentially on the provided request configuration.
 *
 * @param config The in itial request configuration.
 * @returns A promise that resolves with the final, intercepted configuration.
 */
export const applyInterceptors = (config: RequestInit): Promise<RequestInit> => {
  let p = Promise.resolve(config);

  for (const entry of interceptors) {
    p = p.then(entry.interceptor);
  }

  return p;
};
