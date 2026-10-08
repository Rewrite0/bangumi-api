import { BASEURL, UserAgent, getConfig } from './config';
import type { MethodType } from './adapters';
import type { ApiEndpoint } from './types/utils';

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

function cleanObject(obj?: Record<string, any>): Record<string, any> {
  if (!obj) return {};
  const cleaned: Record<string, any> = {};
  for (const key in obj) {
    const value = obj[key];
    if (value !== void 0 && value !== null) {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

export async function fetchResponse(
  endpoint: ApiEndpoint,
  method: MethodType,
  options: {
    data?: Record<string, any>;
    query?: Record<string, any>;
  } = {}
): Promise<Response> {
  const { accessToken, requestAdapter: request } = getConfig();

  let headers: Record<string, string> = {};

  if (!isBrowser) {
    headers['User-Agent'] = UserAgent;
  }

  if (accessToken !== '') {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const url = new URL(BASEURL + endpoint);
  const queryStr = new URLSearchParams(cleanObject(options.query)).toString();
  if (queryStr) {
    url.search = queryStr;
  }

  const data =
    method === 'GET' || options.data === undefined
      ? undefined
      : cleanObject(options.data);

  const response = await request({
    url: url.toString(),
    method,
    headers,
    ...(data === undefined ? {} : { data }),
  });

  if (!response.ok) {
    throw response;
  }

  return response;
}

export async function fetchApi<T = unknown>(
  endpoint: ApiEndpoint,
  method: MethodType,
  options: {
    data?: Record<string, any>;
    query?: Record<string, any>;
  } = {}
): Promise<T> {
  const response = await fetchResponse(endpoint, method, options);

  if (response.status === 204 || response.status === 205) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
