import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

//#region Types

const PREFIX_SYMBOL: unique symbol = Symbol('prefix');
type PREFIX_SYMBOL = typeof PREFIX_SYMBOL;

type QueryOptionsFunction<TParams extends any[] = [], TResult = any, TError = Error> = (
  ...args: TParams
) => UseQueryOptions<TResult, TError, TResult, QueryKey>;

type QueryOptionsEntry = UseQueryOptions<any> | QueryOptionsFunction<any[]>;

type QueryOptionsMap = { [key: string]: QueryOptionsEntry };

type PrefixedQueryOptions<T extends QueryOptionsMap, Prefix extends string> = {
  [K in keyof T]: T[K];
} & { readonly [PREFIX_SYMBOL]: Prefix };

type OmitPrefix<T extends PrefixedQueryOptions<any, string>> = Omit<T, PREFIX_SYMBOL>;

type MergedQueryOptions<T extends PrefixedQueryOptions<any, string>[]> = {
  [K in T[number][PREFIX_SYMBOL]]: OmitPrefix<Extract<T[number], { [PREFIX_SYMBOL]: K }>>;
};

//#endregion

//#region Factory Functions

/**
 * Creates a query key by combining a base key with optional parameters and intentionally filtering `undefined` values.
 * This allows keys to be invalidated/removed/update from a more generic or specific context.
 *
 * @param {string} baseKey The base key for the query.
 * @param {unknown[]} params Optional parameters to include in the query key.
 * @returns {QueryKey} The constructed query key.
 */
const createQueryKey = (baseKey: string, ...params: unknown[]): QueryKey =>
  [baseKey, ...params].filter((val) => val !== undefined);

/**
 * Creates a set of query options with a specific prefix.
 *
 * @param {Prefix} prefix The prefix to apply to the query options.
 * @param {QueryOptionsMap} options The query options to prefix.
 * @returns {PrefixedQueryOptions<T, Prefix>} The prefixed query options.
 */
const createQueryOptions = <Prefix extends string, T extends QueryOptionsMap>(
  prefix: Prefix,
  options: T
): PrefixedQueryOptions<T, Prefix> => ({ ...options, [PREFIX_SYMBOL]: prefix });

/**
 * Merges multiple query option objects into a single object, combining their properties.
 *
 * @param {PrefixedQueryOptions<any, string>[]} features The query option objects to merge.
 * @returns {MergedQueryOptions<T>} The merged query options.
 */
const mergeQueryOptions = <T extends PrefixedQueryOptions<any, string>[]>(
  ...features: T
): MergedQueryOptions<T> =>
  features.reduce((options: MergedQueryOptions<T>, feature: PrefixedQueryOptions<any, string>) => {
    const { [PREFIX_SYMBOL]: prefix, ...rest } = feature;
    return { ...options, [prefix]: rest };
  }, {} as MergedQueryOptions<T>);

//#endregion

export { createQueryKey, createQueryOptions, mergeQueryOptions, type PREFIX_SYMBOL };
