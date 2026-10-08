import { fetchApi, fetchResponse } from '@/fetch';
import type {
  PersonResponse,
  PersonRelatedCharactersResponse,
  PersonRelatedSubjectsResponse,
  SearchPersonsParams,
  SearchPersonsResponse,
} from './types';
import { transformPaginationParams } from '@/utils/pagination';
import { BASEURL } from '@/config';
import { ImageType } from '@/types';

/**
 * 搜索人物
 * @description
 * 实验性 API， 本 schema 和实际的 API 行为都可能随时发生改动
 * 目前支持的筛选条件包括:
 * career: 职业，可以多次出现。且 关系。
 * 不同筛选条件之间为 且
 */
export async function searchPersons({
  page,
  pageSize,
  keyword,
  filter,
}: SearchPersonsParams): Promise<SearchPersonsResponse> {
  return fetchApi<SearchPersonsResponse>('/v0/search/persons', 'POST', {
    data: {
      keyword,
      filter,
    },
    query: transformPaginationParams({ page, pageSize }),
  });
}

/** 获取人物信息 */
export async function getPersonById(personId: number): Promise<PersonResponse> {
  return fetchApi<PersonResponse>(`/v0/persons/${personId}`, 'GET');
}

/** 获取人物图片url */
export function buildPersonImageUrl(personId: number, type: ImageType): string {
  const url = new URL(`/v0/persons/${encodeURIComponent(String(personId))}/image`, BASEURL);
  url.searchParams.set('type', type);
  return url.toString();
}

/** 获取人物关联条目列表 */
export async function getPersonRelatedSubjects(personId: number): Promise<PersonRelatedSubjectsResponse> {
  return fetchApi<PersonRelatedSubjectsResponse>(`/v0/persons/${personId}/subjects`, 'GET');
}

/** 获取人物关联角色列表 */
export async function getPersonRelatedCharacters(
  personId: number
): Promise<PersonRelatedCharactersResponse> {
  return fetchApi<PersonRelatedCharactersResponse>(`/v0/persons/${personId}/characters`, 'GET');
}

/** 为当前用户收藏人物 */
export async function collectPerson(personId: number): Promise<void> {
  await fetchResponse(`/v0/persons/${personId}/collect`, 'POST');
}

/** 为当前用户取消收藏人物 */
export async function uncollectPerson(personId: number): Promise<void> {
  await fetchResponse(`/v0/persons/${personId}/collect`, 'DELETE');
}
