import { fetchApi, fetchResponse } from '@/fetch';
import type {
  GetUserCollectionsParams,
  UserCollectionsResponse,
  UserCollectionResponse,
  UpsertCollectionSubjectParams,
  GetMyCollectionSubjectEpisodesParams,
  UpdateMyCollectionSubjectEpisodesParams,
  UserCollectionEpisodeResponse,
  UserCollectionSubjectEpisodesResponse,
  UserCollectionCharactersResponse,
  UserCollectionCharacterResponse,
  UserCollectionPersonsResponse,
  UserCollectionPersonResponse,
} from './types';
import { transformPaginationParams } from '@/utils/pagination';
import type { EpisodeCollectionType } from './enum';

/**
 * 获取对应用户的收藏
 * @description 获取对应用户的收藏，查看私有收藏需要 access token
 */
export async function getUserCollections(
  username: string,
  params: GetUserCollectionsParams = {}
): Promise<UserCollectionsResponse> {
  return fetchApi<UserCollectionsResponse>(`/v0/users/${encodeURIComponent(username)}/collections`, 'GET', {
    query: transformPaginationParams(params),
  });
}

/**
 * 获取对应用户指定条目收藏
 * @description 获取对应用户的收藏，查看私有收藏需要 access token
 */
export async function getUserCollectionBySubjectId(
  username: string,
  subjectId: number
): Promise<UserCollectionResponse> {
  return fetchApi<UserCollectionResponse>(
    `/v0/users/${encodeURIComponent(username)}/collections/${subjectId}`,
    'GET'
  );
}

/**
 * 新增或修改当前用户单个条目收藏
 * @description 修改条目收藏状态, 如果不存在则创建，如果存在则修改
 * 由于直接修改剧集条目的完成度可能会引起意料之外效果，只能用于修改书籍类条目的完成度。
 * 方法的所有请求体字段均可选
 */
export async function upsertMyCollectionSubject(
  subjectId: number,
  params?: UpsertCollectionSubjectParams
): Promise<void> {
  await fetchResponse(`/v0/users/-/collections/${subjectId}`, 'POST', {
    data: params,
  });
}

/**
 * 修改当前用户单个条目收藏
 * @description 修改条目收藏状态
 * 由于直接修改剧集条目的完成度可能会引起意料之外效果，只能用于修改书籍类条目的完成度。
 * PATCH 方法的所有请求体字段均可选
 */
export async function updateMyCollectionSubject(
  subjectId: number,
  params?: UpsertCollectionSubjectParams
): Promise<void> {
  await fetchResponse(`/v0/users/-/collections/${subjectId}`, 'PATCH', {
    data: params,
  });
}

/**
 * 获取当前用户收藏的条目章节信息
 */
export async function getMyCollectionSubjectEpisodes(
  subjectId: number,
  params: GetMyCollectionSubjectEpisodesParams = {}
): Promise<UserCollectionSubjectEpisodesResponse> {
  return fetchApi<UserCollectionSubjectEpisodesResponse>(
    `/v0/users/-/collections/${subjectId}/episodes`,
    'GET',
    {
      query: transformPaginationParams(params),
    }
  );
}

/**
 * 修改当前用户收藏的条目章节信息
 * @description 同时会重新计算条目的完成度
 */
export async function updateMyCollectionSubjectEpisodes(
  subjectId: number,
  params: UpdateMyCollectionSubjectEpisodesParams
): Promise<void> {
  await fetchResponse(`/v0/users/-/collections/${subjectId}/episodes`, 'PATCH', {
    data: params,
  });
}

/**
 * 获取当前用户收藏的指定章节信息
 */
export async function getMyCollectionEpisodeById(
  episodeId: number
): Promise<UserCollectionEpisodeResponse> {
  return fetchApi<UserCollectionEpisodeResponse>(
    `/v0/users/-/collections/-/episodes/${episodeId}`,
    'GET'
  );
}

/** 更新当前用户收藏的指定章节信息 */
export async function updateMyCollectionEpisode(
  episodeId: number,
  type: EpisodeCollectionType
): Promise<void> {
  await fetchResponse(`/v0/users/-/collections/-/episodes/${episodeId}`, 'PUT', {
    data: { type },
  });
}

/** 获取对应用户角色收藏列表 */
export async function getUserCollectionCharacters(username: string): Promise<UserCollectionCharactersResponse> {
  return fetchApi<UserCollectionCharactersResponse>(
    `/v0/users/${encodeURIComponent(username)}/collections/-/characters`,
    'GET'
  );
}

/** 获取对应用户单个角色收藏信息 */
export async function getUserCollectionCharacterById(
  username: string,
  characterId: number
): Promise<UserCollectionCharacterResponse> {
  return fetchApi<UserCollectionCharacterResponse>(
    `/v0/users/${encodeURIComponent(username)}/collections/-/characters/${characterId}`,
    'GET'
  );
}

/** 获取对应用户人物收藏列表 */
export async function getUserCollectionPersons(username: string): Promise<UserCollectionPersonsResponse> {
  return fetchApi<UserCollectionPersonsResponse>(`/v0/users/${encodeURIComponent(username)}/collections/-/persons`, 'GET');
}

/** 获取对应用户单个人物收藏信息 */
export async function getUserCollectionPersonById(
  username: string,
  personId: number
): Promise<UserCollectionPersonResponse> {
  return fetchApi<UserCollectionPersonResponse>(
    `/v0/users/${encodeURIComponent(username)}/collections/-/persons/${personId}`,
    'GET'
  );
}
