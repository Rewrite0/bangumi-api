import { version } from '../package.json';
import { RequestAdapter, fetchAdapter } from './adapters';

export const BASEURL = 'https://api.bgm.tv';
export const UserAgent = `Rewrite0/BangumiApi/${version} (https://github.com/Rewrite0/BangumiApi)`;

export type Config = {
  /** 设置访问令牌 - https://next.bgm.tv/demo/access-token */
  accessToken: string;
  /** 请求适配器, 默认使用 fetch */
  requestAdapter: RequestAdapter;
};

let config: Config = {
  accessToken: '',
  requestAdapter: fetchAdapter(),
};

export const getConfig = () => config;

export function configure(opts: Partial<Config>) {
  config.accessToken = opts.accessToken ?? '';

  if (opts.requestAdapter) {
    config.requestAdapter = opts.requestAdapter;
  }
}
