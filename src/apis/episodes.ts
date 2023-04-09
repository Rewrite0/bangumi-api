import type { AxiosInstance } from 'axios';
import type { BGMEpisode, BGMEpisodeParams, Query } from 'bgm-types';

export type EpisodesFunctions = {
  /**
   * get episodes
   * @param params 参数 subject_id, type, limit, offset
   */
  get: (params: Query<BGMEpisodeParams.Episodes>) => Promise<BGMEpisode.Episodes>;
  /**
   * get episode
   * @param episode_id episode id
   */
  episode: (episode_id: number) => Promise<BGMEpisode.EpisodeItem>;
};

export function useEpisodes(axios: AxiosInstance): EpisodesFunctions {
  const prefix = '/v0/episodes';

  return {
    get: async (params: Query<BGMEpisodeParams.Episodes>) => {
      const { data } = await axios.get<BGMEpisode.Episodes>(`${prefix}`, {
        params,
      });
      return data;
    },

    episode: async (episode_id: number) => {
      const { data } = await axios.get<BGMEpisode.EpisodeItem>(
        `/v0/episodes/${episode_id}`
      );
      return data;
    },
  };
}
