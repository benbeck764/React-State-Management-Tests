import { retry } from '@/queries/common/config/query-retry';
import { QueryCache, QueryClient } from '@tanstack/react-query';

interface QueryMeta extends Record<string, unknown> {
  onError?: (error: Error) => void;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: QueryMeta;
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => query?.meta?.onError?.(error)
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: retry({ maxRetries: 3 })
    },
    mutations: { retry: retry({ maxRetries: 3 }) }
  }
});
