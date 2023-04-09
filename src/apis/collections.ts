import type { AxiosInstance } from 'axios';
import type {
  BGMCollection,
  BGMCollectionParams,
  Path,
  Query,
  RequestBody,
} from 'bgm-types';

export type CollectionsFunctions = {
  /**
   * 修改指定收藏条目的收藏状态
   * @description 由于直接修改剧集条目的完成度可能会引起意料之外效果，只能用于修改书籍类条目的完成度。
   * PATCH 方法的所有请求体字段均可选
   * @param subject_id 条目id
   * @param params 参数 type, rate, ep_status, vol_status, comment, private, tags
   */
  patchSubject: (
    subject_id: Path<BGMCollectionParams.PatchSubject>,
    params?: RequestBody<BGMCollectionParams.PatchSubject>
  ) => Promise<unknown>;
  /**
   * 获取指定收藏条目的章节信息
   * @param subject_id 条目id
   * @param params 参数 episode_type, offset, limit
   */
  episodesInSubject: (
    subject_id: Path<BGMCollectionParams.EpisodesInSubject>,
    params?: Query<BGMCollectionParams.EpisodesInSubject>
  ) => Promise<BGMCollection.EpisodesInSubject>;
  /**
   * 修改指定收藏条目的章节信息
   * @description 同时会重新计算条目的完成度, 暂时不能生成时间线
   * @param subject_id 条目id
   * @param params 参数 episode_id, type
   */
  patchEpisodesInSubject: (
    subject_id: Path<BGMCollectionParams.PatchEpisodesInSubject>,
    params: RequestBody<BGMCollectionParams.PatchEpisodesInSubject>
  ) => Promise<unknown>;
  /**
   * 获取指定收藏章节信息
   * @param episode_id 章节id
   */
  getEpisodeInEpisodes: (
    episode_id: Path<BGMCollectionParams.EpisodesInEpisodes>
  ) => Promise<BGMCollection.EpisodesInEpisodes>;
  /**
   * 更新指定收藏章节信息
   * @param episode_id 章节id
   * @param type 章节收藏类型, 1: 想看, 2: 看过, 3: 抛弃
   */
  putEpisodeInEpisodes: (
    episode_id: Path<BGMCollectionParams.PutEpisodesInEpisodes>,
    type: RequestBody<BGMCollectionParams.PutEpisodesInEpisodes>['type']
  ) => Promise<unknown>;
};

export function useCollections(axios: AxiosInstance): CollectionsFunctions {
  const prefix = '/v0/users/-/collections';

  return {
    patchSubject: async (
      subject_id: Path<BGMCollectionParams.PatchSubject>,
      params?: RequestBody<BGMCollectionParams.PatchSubject>
    ) => {
      const { data } = await axios.patch(`${prefix}/${subject_id}`, params);
      return data;
    },

    episodesInSubject: async (
      subject_id: Path<BGMCollectionParams.EpisodesInSubject>,
      params?: Query<BGMCollectionParams.EpisodesInSubject>
    ) => {
      const { data } = await axios.get<BGMCollection.EpisodesInSubject>(
        `${prefix}/${subject_id}/episodes`,
        {
          params,
        }
      );
      return data;
    },

    patchEpisodesInSubject: async (
      subject_id: Path<BGMCollectionParams.PatchEpisodesInSubject>,
      params: RequestBody<BGMCollectionParams.PatchEpisodesInSubject>
    ) => {
      const { data } = await axios.patch(`${prefix}/${subject_id}/episodes`, params);
      return data;
    },

    getEpisodeInEpisodes: async (
      episode_id: Path<BGMCollectionParams.EpisodesInEpisodes>
    ) => {
      const { data } = await axios.get<BGMCollection.EpisodesInEpisodes>(
        `${prefix}/-/episodes/${episode_id}`
      );
      return data;
    },

    putEpisodeInEpisodes: async (
      episode_id: Path<BGMCollectionParams.PutEpisodesInEpisodes>,
      type: RequestBody<BGMCollectionParams.PutEpisodesInEpisodes>['type']
    ) => {
      const { data } = await axios.put(`${prefix}/-/episodes/${episode_id}`, {
        type,
      });
      return data;
    },
  };
}
