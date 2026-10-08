import { fetchApi } from '@/fetch';
import { transformPaginationParams, type Pagination } from '@/utils/pagination';
import {
  CharacterRevisionResponse,
  CharacterRevisionsResponse,
  EpisodeRevisionResponse,
  EpisodeRevisionsResponse,
  PersonRevisionResponse,
  PersonRevisionsResponse,
  SubjectRevisionResponse,
  SubjectRevisionsResponse,
} from './types';

/** 获取人物编辑历史 */
export async function getPersonRevisions(
  personId: number,
  params: Pagination = { page: 1, pageSize: 30 }
): Promise<PersonRevisionsResponse> {
  return fetchApi<PersonRevisionsResponse>(`/v0/revisions/persons`, 'GET', {
    query: {
      person_id: personId,
      ...transformPaginationParams(params),
    },
  });
}

/**
 * 根据历史版本ID获取人物编辑详情
 * @param revisionId 历史版本ID
 */
export async function getPersonRevisionById(revisionId: number): Promise<PersonRevisionResponse> {
  return fetchApi<PersonRevisionResponse>(`/v0/revisions/persons/${revisionId}`, 'GET');
}

/** 获取角色编辑历史 */
export async function getCharacterRevisions(
  characterId: number,
  params: Pagination = { page: 1, pageSize: 30 }
): Promise<CharacterRevisionsResponse> {
  return fetchApi<CharacterRevisionsResponse>(`/v0/revisions/characters`, 'GET', {
    query: {
      character_id: characterId,
      ...transformPaginationParams(params),
    },
  });
}

/**
 * 根据历史版本ID获取角色编辑详情
 * @param revisionId 历史版本ID
 */
export async function getCharacterRevisionById(
  revisionId: number
): Promise<CharacterRevisionResponse> {
  return fetchApi<CharacterRevisionResponse>(`/v0/revisions/characters/${revisionId}`, 'GET');
}

/** 获取条目编辑历史 */
export async function getSubjectRevisions(
  subjectId: number,
  params: Pagination = { page: 1, pageSize: 30 }
): Promise<SubjectRevisionsResponse> {
  return fetchApi<SubjectRevisionsResponse>(`/v0/revisions/subjects`, 'GET', {
    query: {
      subject_id: subjectId,
      ...transformPaginationParams(params),
    },
  });
}

/**
 * 根据历史版本ID获取条目编辑详情
 * @param revisionId 历史版本ID
 */
export async function getSubjectRevisionById(revisionId: number): Promise<SubjectRevisionResponse> {
  return fetchApi<SubjectRevisionResponse>(`/v0/revisions/subjects/${revisionId}`, 'GET');
}

/** 获取章节编辑历史 */
export async function getEpisodeRevisions(
  episodeId: number,
  params: Pagination = { page: 1, pageSize: 30 }
): Promise<EpisodeRevisionsResponse> {
  return fetchApi<EpisodeRevisionsResponse>(`/v0/revisions/episodes`, 'GET', {
    query: {
      episode_id: episodeId,
      ...transformPaginationParams(params),
    },
  });
}

/**
 * 根据历史版本ID获取章节编辑详情
 * @param revisionId 历史版本ID
 */
export async function getEpisodeRevisionById(revisionId: number): Promise<EpisodeRevisionResponse> {
  return fetchApi<EpisodeRevisionResponse>(`/v0/revisions/episodes/${revisionId}`, 'GET');
}
