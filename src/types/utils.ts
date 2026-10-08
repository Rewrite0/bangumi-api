import type { paths } from './openapi';

export type Pretty<T> = { [K in keyof T]: T[K] }

type ReplacePathParams<Path extends string> = Path extends `${infer Prefix}{${string}}${infer Suffix}`
  ? `${Prefix}${string}${ReplacePathParams<Suffix>}`
  : Path;

/** OpenAPI paths with path parameters replaced by concrete string segments. */
export type ApiEndpoint = ReplacePathParams<keyof paths>;
