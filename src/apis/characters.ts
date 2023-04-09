import type { AxiosInstance } from 'axios';
import type { ImageType } from '../types';
import type { BGMCharacter } from 'bgm-types';
import { URL } from '../config';

export type CharactersFunctions = {
  /**
   * 获取角色详情
   */
  get: () => Promise<BGMCharacter.Information>;
  /**
   * 获取角色图片
   * @param type 图片类型 - small|grid|large|medium, 默认 small
   * @returns 拼接好的 url
   */
  image: (type: ImageType) => string;
  /**
   * 获取与角色相关的条目
   */
  subjects: () => Promise<BGMCharacter.Subjects>;
  /**
   * 获取与角色相关的人物
   */
  persons: () => Promise<BGMCharacter.Persons>;
};

export function useCharacters(
  axios: AxiosInstance,
  character_id: number
): CharactersFunctions {
  const prefix = '/v0/characters';

  return {
    get: async () => {
      const { data } = await axios.get<BGMCharacter.Information>(
        `${prefix}/${character_id}`
      );
      return data;
    },

    image: (type: ImageType = 'small') => {
      return `${URL}/${prefix}/${character_id}/image?type=${type}`;
    },

    subjects: async () => {
      const { data } = await axios.get<BGMCharacter.Subjects>(
        `${prefix}/${character_id}/subjects`
      );
      return data;
    },

    persons: async () => {
      const { data } = await axios.get<BGMCharacter.Persons>(
        `${prefix}/${character_id}/persons`
      );
      return data;
    },
  };
}
