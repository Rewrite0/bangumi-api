import type { AxiosInstance } from 'axios';
import type { BGMPerson } from 'bgm-types';
import type { ImageType } from '../types';
import { URL } from '../config';

export function usePersons(axios: AxiosInstance, person_id: number) {
  const prefix = '/v0/persons';

  return {
    /**
     * get person
     */
    get: async () => {
      const { data } = await axios.get<BGMPerson.Information>(`${prefix}/${person_id}`);
      return data;
    },

    /**
     * get person image
     * @param type 图片类型 - small|grid|large|medium
     */
    image: (type: ImageType) => {
      return `${URL}/${person_id}/image?type=${type}`;
    },

    /**
     * get person related subjects
     */
    subjects: async () => {
      const { data } = await axios.get<BGMPerson.Subjects>(
        `${prefix}/${person_id}/subjects`
      );
      return data;
    },

    /**
     * get person related characters
     */
    characters: async () => {
      const { data } = await axios.get<BGMPerson.Characters>(
        `${prefix}/${person_id}/characters`
      );
      return data;
    },
  };
}
