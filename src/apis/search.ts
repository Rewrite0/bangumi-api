import type { AxiosInstance } from 'axios';
import type {
  BGMSearch,
  BGMSearchParams,
  BGMSubjectParams,
  BGMSubject,
  Query,
  RequestBody,
} from 'bgm-types';

export function useSearch(axios: AxiosInstance, keyword: string) {
  return {
    /**
     * 条目搜索
     * @param params 参数 type, responseGroup, start, max_resulte
     * @description
     * 条目类型 type
     * 1: 书籍 2: 动画 3: 音乐 4: 游戏 6: 三次元
     */
    get: async (params?: Query<BGMSearchParams.Search>) => {
      const url = encodeURI(`/search/subject/${keyword}`);
      const { data } = await axios.get<BGMSearch.Search>(url, {
        params,
      });
      return data;
    },

    /**
     * 实验性条目搜索
     * @param params 参数 sort, filter
     * @param query 分页参数 limit, offset
     */
    experimentalSearch: async (
      params?: Omit<RequestBody<BGMSubjectParams.Search>, 'keyword'>,
      query?: Query<BGMSubjectParams.Search>
    ) => {
      const { data } = await axios.post<BGMSubject.Search>(
        '/v0/search/subjects',
        { keyword, ...params },
        { params: query }
      );
      return data;
    },
  };
}
