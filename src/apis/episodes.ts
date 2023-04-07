import type { AxiosInstance } from 'axios';
import type { BGMEpisode, BGMEpisodeParams, Query } from 'bgm-types';

export function useEpisodes(axios: AxiosInstance) {
  const prefix = '/v0/episodes';

  return {
    /**
     * get episodes
     * @param params 参数 subject_id, type, limit, offset
     */
    get: async (params: Query<BGMEpisodeParams.Episodes>) => {
      const { data } = await axios.get<BGMEpisode.Episodes>(`${prefix}`, {
        params,
      });
      return data;
    },

    /**
     * get episode
     * @param episode_id episode id
     */
    episode: async (episode_id: number) => {
      const { data } = await axios.get<BGMEpisode.EpisodeItem>(
        `/v0/episodes/${episode_id}`
      );
      return data;
    },
  };
}
