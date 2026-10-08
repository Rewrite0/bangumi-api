import type { RequestAdapter } from './types';

export function fetchAdapter(): RequestAdapter {
  const adapter: RequestAdapter = async (opts) => {
    const { url, headers, method, data } = opts;

    const response = await globalThis.fetch(url, {
      headers: {
        ...(data === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: data === undefined ? undefined : JSON.stringify(data),
      method,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  };
  return adapter;
}
