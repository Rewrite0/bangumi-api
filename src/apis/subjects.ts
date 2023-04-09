import type { AxiosInstance } from 'axios';
import type { SubjectImageType } from '../types';
import type { BGMSubject } from 'bgm-types';
import { URL } from '../config';

export type SubjectFunctions = {
  /**
   * 获取条目
   */
  get: () => Promise<BGMSubject.Information>;
  /**
   * 获取条目图片
   * @param type 图片类型 - 默认 'small'
   * @returns 拼接好的 url
   */
  image: (type: SubjectImageType) => string;
  /**
   * 获取条目人物
   */
  persons: () => Promise<BGMSubject.Persons>;
  /**
   * 获取条目角色
   */
  characters: () => Promise<BGMSubject.Characters>;
  /**
   * 获取相关条目
   */
  relations: () => Promise<BGMSubject.Subjects>;
};

export function useSubject(axios: AxiosInstance, subject_id: number): SubjectFunctions {
  const prefix = '/v0/subjects';

  return {
    get: async () => {
      const { data } = await axios.get<BGMSubject.Information>(`${prefix}/${subject_id}`);
      return data;
    },

    image: (type: SubjectImageType = 'small') => {
      return `${URL}/${prefix}/${subject_id}/image?type=${type}`;
    },

    persons: async () => {
      const { data } = await axios.get<BGMSubject.Persons>(
        `${prefix}/${subject_id}/persons`
      );
      return data;
    },

    characters: async () => {
      const { data } = await axios.get<BGMSubject.Characters>(
        `${prefix}/${subject_id}/characters`
      );
      return data;
    },

    relations: async () => {
      const { data } = await axios.get<BGMSubject.Subjects>(
        `${prefix}/${subject_id}/subjects`
      );
      return data;
    },
  };
}
