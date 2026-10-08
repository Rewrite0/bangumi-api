export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type Arg = Record<string, any>;

export interface RequestOptions {
  readonly url: string;
  readonly method: MethodType;
  readonly headers: Arg;
  readonly data?: Arg;
}
export type RequestAdapter = (
  options: RequestOptions
) => Promise<Response>;
