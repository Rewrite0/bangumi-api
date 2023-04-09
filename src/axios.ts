import Axios from 'axios';
import { URL, UserAgent } from './config';

export function createAxios(AccessToken: string = '') {
  let headers: { 'User-Agent'?: string; Authorization?: string } = {};

  // 不是浏览器环境时添加 User-Agent
  if (typeof global !== 'undefined') {
    headers['User-Agent'] = UserAgent;
  }

  if (AccessToken !== '') {
    headers.Authorization = `Bearer ${AccessToken}`;
  }

  const axios = Axios.create({
    baseURL: URL,
    headers,
  });

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      const { status, statusText, data } = err.response;

      return {
        status,
        statusText,
        data,
      };
    }
  );

  return axios;
}
