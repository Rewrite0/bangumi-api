import type { AxiosInstance } from 'axios';
import type { BGMIndicesParams, BGMIndices, Query, RequestBody } from 'bgm-types';

export type IndicesFunctions = {
  /**
   * 创建目录
   */
  create: () => Promise<BGMIndices.Create>;
  /**
   * 获取目录
   */
  get: () => Promise<BGMIndices.Information>;
  /**
   * 编辑目录信息
   * @param params 参数 title, description
   */
  edit: (params?: RequestBody<BGMIndicesParams.PutIndices>) => Promise<BGMIndices.Edit>;
  /**
   * 获取目录中的条目
   * @param params 参数 type, limit, offset
   * @description
   * 条目类型 type
   * 1: 书籍 2: 动画 3: 音乐 4: 游戏 6: 三次元
   */
  subjects: (params?: Query<BGMIndicesParams.Subjects>) => Promise<BGMIndices.Subjects>;
  /**
   * 添加条目到目录
   * @param params 参数 subject_id, sort, comment
   */
  addSubject: (params?: RequestBody<BGMIndicesParams.AddSubjects>) => Promise<unknown>;
  /**
   * 编辑目录中的条目信息
   * @description 如果条目不存在于目录，会创建该条目
   * @param subject_id 条目id
   * @param params 参数 sort, comment
   */
  putSubject: (
    subject_id: BGMIndicesParams.PutSubject['path']['subject_id'],
    params?: RequestBody<BGMIndicesParams.PutSubject>
  ) => Promise<unknown>;
  /**
   * 删除目录中的条目
   * @param subject_id 条目id
   */
  deleteSubject: (
    subject_id: BGMIndicesParams.DeleteSubject['path']['subject_id']
  ) => Promise<BGMIndices.DeleteSubject>;
  /**
   * 为当前用户收藏一条目录
   */
  collect: () => Promise<BGMIndices.Collect>;
  /**
   * 为当前用户收藏一条目录
   */
  deleteCollect: () => Promise<BGMIndices.DeleteCollect>;
};

const prefix = '/v0/indices';

export function useIndices(
  axios: AxiosInstance,
  index_id?: number
): Omit<IndicesFunctions, 'create'> {
  return {
    get: async () => {
      const { data } = await axios.get<BGMIndices.Information>(`${prefix}/${index_id}`);
      return data;
    },

    edit: async (params?: RequestBody<BGMIndicesParams.PutIndices>) => {
      const { data } = await axios.put<BGMIndices.Edit>(`${prefix}/${index_id}`, params);
      return data;
    },

    subjects: async (params?: Query<BGMIndicesParams.Subjects>) => {
      const { data } = await axios.get<BGMIndices.Subjects>(
        `${prefix}/${index_id}/subjects`,
        {
          params,
        }
      );
      return data;
    },

    addSubject: async (params?: RequestBody<BGMIndicesParams.AddSubjects>) => {
      const { data } = await axios.post(`${prefix}/${index_id}/subjects`, params);
      return data;
    },

    putSubject: async (
      subject_id: BGMIndicesParams.PutSubject['path']['subject_id'],
      params?: RequestBody<BGMIndicesParams.PutSubject>
    ) => {
      const { data } = await axios.put(
        `${prefix}/${index_id}/subjects/${subject_id}`,
        params
      );
      return data;
    },

    deleteSubject: async (
      subject_id: BGMIndicesParams.DeleteSubject['path']['subject_id']
    ) => {
      const { data } = await axios.delete(`${prefix}/${index_id}/subjects/${subject_id}`);
      return data;
    },

    collect: async () => {
      const { data } = await axios.post<BGMIndices.Collect>(
        `${prefix}/${index_id}/collect`
      );
      return data;
    },

    deleteCollect: async () => {
      const { data } = await axios.delete<BGMIndices.DeleteCollect>(
        `${prefix}/${index_id}/collect`
      );
      return data;
    },
  };
}

export function useCreateIndices(axios: AxiosInstance): Pick<IndicesFunctions, 'create'> {
  return {
    create: async () => {
      const { data } = await axios.post<BGMIndices.Create>(`${prefix}`);
      return data;
    },
  };
}
