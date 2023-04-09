import type { AxiosInstance } from 'axios';
import type { BGMPerson } from 'bgm-types';
import type { ImageType } from '../types';
import { URL } from '../config';

export type PersonsFunctions = {
  /**
   * 获取人物
   */
  get: () => Promise<BGMPerson.Information>;
  /**
   * 获取人物图片
   * @param type 图片类型 - small|grid|large|medium
   * @returns 拼接好的 url
   */
  image: (type: ImageType) => string;
  /**
   * 获取与人物相关的条目
   */
  subjects: () => Promise<BGMPerson.Subjects>;
  /*
   * 获取与人物相关的角色
   */
  characters: () => Promise<BGMPerson.Characters>;
};

export function usePersons(axios: AxiosInstance, person_id: number): PersonsFunctions {
  const prefix = '/v0/persons';

  return {
    get: async () => {
      const { data } = await axios.get<BGMPerson.Information>(`${prefix}/${person_id}`);
      return data;
    },

    image: (type: ImageType) => {
      return `${URL}/${person_id}/image?type=${type}`;
    },

    subjects: async () => {
      const { data } = await axios.get<BGMPerson.Subjects>(
        `${prefix}/${person_id}/subjects`
      );
      return data;
    },

    characters: async () => {
      const { data } = await axios.get<BGMPerson.Characters>(
        `${prefix}/${person_id}/characters`
      );
      return data;
    },
  };
}
