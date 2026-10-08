import { fetchApi } from '@/fetch';
import { EpisodeResponse, EpisodesResponse, GetEpisodesParams } from './types';
import { transformPaginationParams } from '@/utils/pagination';

/** 获取指定条目的章节 */
export async function getEpisodesBySubjectId(
  subjectId: number,
  params: GetEpisodesParams = {}
): Promise<EpisodesResponse> {
  return fetchApi<EpisodesResponse>(`/v0/episodes`, 'GET', {
    query: {
      subject_id: subjectId,
      ...transformPaginationParams(params),
    },
  });
}

/** 获取指定条目的章节 */
export async function getEpisodeById(episodeId: number): Promise<EpisodeResponse> {
  return fetchApi<EpisodeResponse>(`/v0/episodes/${episodeId}`, 'GET');
}
