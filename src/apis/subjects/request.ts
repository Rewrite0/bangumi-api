import { BASEURL } from '@/config';
import { fetchApi } from '@/fetch';
import type {
  CalendarResponse,
  SearchSubjectsParams,
  SearchSubjectsResponse,
  SubjectImageType,
  SubjectRelatedCharactersResponse,
  SubjectRelatedPersonsResponse,
  SubjectRelatedSubjectsResponse,
  SubjectResponse,
  SubjectsParams,
  SubjectsResponse,
} from './types';
import { transformPaginationParams } from '@/utils/pagination';

/** 获取每日条目 */
export async function getCalendar(): Promise<CalendarResponse> {
  return fetchApi<CalendarResponse>('/calendar', 'GET');
}

/**
 * 条目搜索 - 实验性 API
 * @description
 * 目前支持的筛选条件包括:
 * type: 条目类型，参照 SubjectType enum， 或。
 * tag: 标签，可以多次出现。且 关系。
 * air_date: 播出日期/发售日期。且 关系。
 * rating: 用于搜索指定评分的条目。且 关系。
 * rating_count: 用于按照评分人数筛选条目。且 关系。
 * rank: 用于搜索指定排名的条目。且 关系。
 * nsfw: 使用 include 包含NSFW搜索结果。默认排除搜索NSFW条目。无权限情况下忽略此选项，不会返回NSFW条目。
 * 不同筛选条件之间为 `且`
 */
export async function searchSubjects({
  keyword,
  filter,
  sort,
  page,
  pageSize,
}: SearchSubjectsParams): Promise<SearchSubjectsResponse> {
  return fetchApi<SearchSubjectsResponse>('/v0/search/subjects', 'POST', {
    data: {
      keyword,
      filter,
      sort,
    },
    query: transformPaginationParams({ page, pageSize }),
  });
}

/** 浏览条目 */
export async function getSubjects(params: SubjectsParams): Promise<SubjectsResponse> {
  return fetchApi<SubjectsResponse>('/v0/subjects', 'GET', {
    query: transformPaginationParams(params),
  });
}

/** 获取条目信息 */
export async function getSubjectById(subjectId: number): Promise<SubjectResponse> {
  return fetchApi<SubjectResponse>(`/v0/subjects/${subjectId}`, 'GET');
}

/** 获取条目图片url */
export function buildSubjectImageUrl(subjectId: number, type: SubjectImageType): string {
  const url = new URL(`/v0/subjects/${encodeURIComponent(String(subjectId))}/image`, BASEURL);
  url.searchParams.set('type', type);
  return url.toString();
}

/** 获取条目相关人物 */
export async function getSubjectRelatedPersons(subjectId: number): Promise<SubjectRelatedPersonsResponse> {
  return fetchApi<SubjectRelatedPersonsResponse>(`/v0/subjects/${subjectId}/persons`, 'GET');
}

/** 获取条目角色 */
export async function getSubjectRelatedCharacters(subjectId: number): Promise<SubjectRelatedCharactersResponse> {
  return fetchApi<SubjectRelatedCharactersResponse>(`/v0/subjects/${subjectId}/characters`, 'GET');
}

/** 获取条目关联条目 */
export async function getSubjectRelatedSubjects(subjectId: number): Promise<SubjectRelatedSubjectsResponse> {
  return fetchApi<SubjectRelatedSubjectsResponse>(`/v0/subjects/${subjectId}/subjects`, 'GET');
}
