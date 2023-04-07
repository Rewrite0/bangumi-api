import type { AxiosInstance } from 'axios';
import type { BGMEditHistoryParams, BGMEditHistory, Query } from 'bgm-types';

export type ThisRevisionsFunctions = {
  /**
   * 获取指定历史版本人物编辑历史
   */
  persons: () => Promise<BGMEditHistory.PersonRevision>;
  /**
   * 获取指定历史版本角色编辑历史
   */
  characters: () => Promise<BGMEditHistory.CharacterRevision>;
  /**
   * 获取指定历史版本条目编辑历史
   */
  subjects: () => Promise<BGMEditHistory.SubjectRevision>;
  /**
   * 获取指定历史版本条目编辑历史
   */
  episodes: () => Promise<BGMEditHistory.EpisodeRevision>;
};

export type RevisionsFunctions = {
  /**
   * 获取指定人物编辑历史
   * @param person_id 人物 id
   * @param params 参数 limit, offset
   */
  persons: (
    person_id: Query<BGMEditHistoryParams.Persons>['person_id'],
    params?: Omit<Query<BGMEditHistoryParams.Persons>, 'person_id'>
  ) => Promise<BGMEditHistory.Persons>;
  /**
   * 获取指定角色编辑历史
   * @param character_id 角色 id
   * @param params 参数 limit, offset
   */
  characters: (
    character_id: Query<BGMEditHistoryParams.Characters>['character_id'],
    params?: Omit<Query<BGMEditHistoryParams.Characters>, 'character_id'>
  ) => Promise<BGMEditHistory.Characters>;
  /**
   * 获取指定条目编辑历史
   * @param subject_id 条目 id
   * @param params 参数 limit, offset
   */
  subjects: (
    subject_id: Query<BGMEditHistoryParams.Subjects>['subject_id'],
    params?: Omit<Query<BGMEditHistoryParams.Subjects>, 'subject_id'>
  ) => Promise<BGMEditHistory.Subjects>;
  /**
   * 获取指定章节编辑历史
   * @param episode_id 章节 id
   * @param params 参数 limit, offset
   */
  episodes: (
    episode_id: Query<BGMEditHistoryParams.Episodes>['episode_id'],
    params?: Omit<Query<BGMEditHistoryParams.Episodes>, 'episode_id'>
  ) => Promise<BGMEditHistory.Episodes>;
};

const prefix = '/v0/revisions';

/**
 * 指定历史版本
 * @param axios
 * @param revision_id 历史版本 ID
 */
export function useThisRevisions(
  axios: AxiosInstance,
  revision_id: number
): ThisRevisionsFunctions {
  return {
    persons: async () => {
      const { data } = await axios.get<BGMEditHistory.PersonRevision>(
        `${prefix}/persons/${revision_id}`
      );
      return data;
    },

    characters: async () => {
      const { data } = await axios.get<BGMEditHistory.CharacterRevision>(
        `${prefix}/characters/${revision_id}`
      );
      return data;
    },

    subjects: async () => {
      const { data } = await axios.get<BGMEditHistory.SubjectRevision>(
        `${prefix}/subjects/${revision_id}`
      );
      return data;
    },

    episodes: async () => {
      const { data } = await axios.get<BGMEditHistory.EpisodeRevision>(
        `${prefix}/episodes/${revision_id}`
      );
      return data;
    },
  };
}

export function useRevisions(axios: AxiosInstance): RevisionsFunctions {
  return {
    persons: async (
      person_id: Query<BGMEditHistoryParams.Persons>['person_id'],
      params?: Omit<Query<BGMEditHistoryParams.Persons>, 'person_id'>
    ) => {
      const { data } = await axios.get<BGMEditHistory.Persons>(`${prefix}/persons`, {
        params: {
          person_id,
          ...params,
        },
      });
      return data;
    },

    characters: async (
      character_id: Query<BGMEditHistoryParams.Characters>['character_id'],
      params?: Omit<Query<BGMEditHistoryParams.Characters>, 'character_id'>
    ) => {
      const { data } = await axios.get<BGMEditHistory.Characters>(
        `${prefix}/characters`,
        {
          params: {
            character_id,
            ...params,
          },
        }
      );
      return data;
    },

    subjects: async (
      subject_id: Query<BGMEditHistoryParams.Subjects>['subject_id'],
      params?: Omit<Query<BGMEditHistoryParams.Subjects>, 'subject_id'>
    ) => {
      const { data } = await axios.get<BGMEditHistory.Subjects>(`${prefix}/subjects`, {
        params: { subject_id, ...params },
      });
      return data;
    },

    episodes: async (
      episode_id: Query<BGMEditHistoryParams.Episodes>['episode_id'],
      params?: Omit<Query<BGMEditHistoryParams.Episodes>, 'episode_id'>
    ) => {
      const { data } = await axios.get<BGMEditHistory.Episodes>(`${prefix}/episodes`, {
        params: { episode_id, ...params },
      });
      return data;
    },
  };
}
