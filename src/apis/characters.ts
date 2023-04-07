import type { AxiosInstance } from 'axios';
import type { ImageType } from '../types';
import type { BGMCharacter } from 'bgm-types';
import { URL } from '../config';

export function useCharacters(axios: AxiosInstance, character_id: number) {
  const prefix = '/v0/characters';

  return {
    /**
     * get character detail
     */
    get: async () => {
      const { data } = await axios.get<BGMCharacter.Information>(
        `${prefix}/${character_id}`
      );
      return data;
    },

    /**
     * get character image
     * @param type 图片类型 - small|grid|large|medium, 默认 small
     * @returns 拼接好的 url
     */
    image: (type: ImageType = 'small') => {
      return `${URL}/${prefix}/${character_id}/image?type=${type}`;
    },

    /**
     * get character related subjects
     */
    subjects: async () => {
      const { data } = await axios.get<BGMCharacter.Subjects>(
        `${prefix}/${character_id}/subjects`
      );
      return data;
    },

    /**
     * get character related persons
     */
    persons: async () => {
      const { data } = await axios.get<BGMCharacter.Persons>(
        `${prefix}/${character_id}/persons`
      );
      return data;
    },
  };
}
