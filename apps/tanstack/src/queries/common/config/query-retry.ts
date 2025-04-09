export const retry =
  <TError>({ maxRetries }: { maxRetries: number }) =>
  (failureCount: number, error: TError): boolean =>
    _retry(failureCount, error, maxRetries);

const _retry = <TError>(failureCount: number, _error: TError, maxRetries: number): boolean =>
  failureCount < maxRetries;
