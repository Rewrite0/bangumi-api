import { BASEURL } from '@/config';
import { fetchApi, fetchResponse } from '@/fetch';
import {
  CharacterResponse,
  CharacterRelatedPersonsResponse,
  CharacterRelatedSubjectsResponse,
  SearchCharactersParams,
  SearchCharactersResponse,
} from './types';
import { transformPaginationParams } from '@/utils/pagination';
import { ImageType } from '@/types';

/**
 * 角色搜索
 * @description
 * nsfw: 使用 include 包含NSFW搜索结果。默认排除搜索NSFW条目。无权限情况下忽略此选项，不会返回NSFW条目。
 */
export async function searchCharacters({
  keyword,
  filter,
  page,
  pageSize,
}: SearchCharactersParams): Promise<SearchCharactersResponse> {
  return fetchApi<SearchCharactersResponse>('/v0/search/characters', 'POST', {
    data: {
      keyword,
      filter,
    },
    query: transformPaginationParams({ page, pageSize }),
  });
}

/** 获取角色详情 */
export async function getCharacterById(characterId: number): Promise<CharacterResponse> {
  return fetchApi<CharacterResponse>(`/v0/characters/${characterId}`, 'GET');
}

/** 获取角色图片url */
export function buildCharacterImageUrl(characterId: number, type: ImageType): string {
  const url = new URL(
    `/v0/characters/${encodeURIComponent(String(characterId))}/image`,
    BASEURL
  );
  url.searchParams.set('type', type);
  return url.toString();
}

/** 获取角色关联条目 */
export async function getCharacterRelatedSubjects(
  characterId: number
): Promise<CharacterRelatedSubjectsResponse> {
  return fetchApi<CharacterRelatedSubjectsResponse>(`/v0/characters/${characterId}/subjects`, 'GET');
}

/** 获取角色关联人物 */
export async function getCharacterRelatedPersons(
  characterId: number
): Promise<CharacterRelatedPersonsResponse> {
  return fetchApi<CharacterRelatedPersonsResponse>(`/v0/characters/${characterId}/persons`, 'GET');
}

/** 为当前用户收藏角色 */
export async function collectCharacter(characterId: number): Promise<void> {
  await fetchResponse(`/v0/characters/${characterId}/collect`, 'POST');
}

/** 为当前用户取消收藏角色 */
export async function uncollectCharacter(characterId: number): Promise<void> {
  await fetchResponse(`/v0/characters/${characterId}/collect`, 'DELETE');
}
