import type { AxiosInstance } from 'axios';
import type { BGMUser, BGMCollectionParams, BGMCollection, Query } from 'bgm-types';
import type { UserAvatarType } from '../types';
import { URL } from '../config';

export type UsersFunctions = {
  /**
   * 获取用户信息
   */
  info: () => Promise<BGMUser.Information>;
  /**
   * 获取用户头像
   * @description 获取用户头像，302 重定向至头像地址，设置了 username 之后无法使用 UID 查询。
   * @param type 用户头像类型 - small|large|medium
   * @returns 返回拼接好的 url
   */
  avatar: (type: UserAvatarType) => string;
  /**
   * 获取对应用户的收藏，查看私有收藏需要access token
   * @param params 参数 subject_type, type, limit, offset
   */
  collections: (
    params?: Query<BGMCollectionParams.Information>
  ) => Promise<BGMCollection.Information>;
  /**
   * 获取对应用户的单个收藏条目，查看私有收藏需要access token。
   * @param subject_id 条目id
   */
  collectionsSubject: (
    subject_id: BGMCollectionParams.Subject['path']['subject_id']
  ) => Promise<BGMCollection.Subject>;
};

export function useUsers(axios: AxiosInstance, username: string): UsersFunctions {
  const prefix = '/v0/users';

  return {
    info: async () => {
      const { data } = await axios.get<BGMUser.Information>(`${prefix}/${username}`);
      return data;
    },

    avatar: (type: UserAvatarType) => {
      return `${URL}/v0/users/${username}/avatar?type=${type}`;
    },

    collections: async (params?: Query<BGMCollectionParams.Information>) => {
      const { data } = await axios.get<BGMCollection.Information>(
        `${prefix}/${username}/collections`,
        {
          params,
        }
      );
      return data;
    },

    collectionsSubject: async (
      subject_id: BGMCollectionParams.Subject['path']['subject_id']
    ) => {
      const { data } = await axios.get<BGMCollection.Subject>(
        `${prefix}/${username}/collections/${subject_id}`
      );
      return data;
    },
  };
}
