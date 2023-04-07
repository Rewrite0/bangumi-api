import type { AxiosInstance } from 'axios';
import type { SubjectImageType } from '../types';
import type { BGMSubject } from 'bgm-types';
import { URL } from '../config';

export function useSubject(axios: AxiosInstance, subject_id: number) {
  const prefix = '/v0/subjects';

  return {
    /**
     * get subject detail
     */
    get: async () => {
      const { data } = await axios.get<BGMSubject.Information>(`${prefix}/${subject_id}`);
      return data;
    },

    /**
     * get subject image
     * @param type 图片类型 - 默认 'small'
     */
    image: (type: SubjectImageType = 'small') => {
      return `${URL}/${prefix}/${subject_id}/image?type=${type}`;
    },

    /**
     * get subject persons
     */
    persons: async () => {
      const { data } = await axios.get<BGMSubject.Persons>(
        `${prefix}/${subject_id}/persons`
      );
      return data;
    },

    /**
     * get subject characters
     */
    characters: async () => {
      const { data } = await axios.get<BGMSubject.Characters>(
        `${prefix}/${subject_id}/characters`
      );
      return data;
    },

    /**
     * get subject relations
     */
    relations: async () => {
      const { data } = await axios.get<BGMSubject.Subjects>(
        `${prefix}/${subject_id}/subjects`
      );
      return data;
    },
  };
}
