import { fetchApi, fetchResponse } from '@/fetch';
import type {
  AddSubjectToIndexParams,
  GetIndexSubjectsParams,
  IndexResponse,
  IndexSubjectsResponse,
  UpdateIndexParams,
  UpdateIndexSubjectParams,
} from './types';
import { transformPaginationParams } from '@/utils/pagination';

/** 创建一个新index */
export async function createIndex(): Promise<IndexResponse> {
  return fetchApi<IndexResponse>(`/v0/indices`, 'POST');
}

/** 获取ID获取index */
export async function getIndexById(indexId: number): Promise<IndexResponse> {
  return fetchApi<IndexResponse>(`/v0/indices/${indexId}`, 'GET');
}

/** 更新指定ID的index */
export async function updateIndexById(
  indexId: number,
  params?: UpdateIndexParams
): Promise<IndexResponse> {
  return fetchApi<IndexResponse>(`/v0/indices/${indexId}`, 'PUT', {
    data: params,
  });
}

/** 向目录添加条目 */
export async function addSubjectToIndex(
  indexId: number,
  params?: AddSubjectToIndexParams
): Promise<void> {
  await fetchResponse(`/v0/indices/${indexId}/subjects`, 'POST', {
    data: params,
  });
}

/** 更新目录中的条目 */
export async function updateIndexSubject(
  indexId: number,
  subjectId: number,
  params?: UpdateIndexSubjectParams
): Promise<void> {
  await fetchResponse(`/v0/indices/${indexId}/subjects/${subjectId}`, 'PUT', {
    data: params,
  });
}

/** 从目录中删除条目 */
export async function removeSubjectFromIndex(indexId: number, subjectId: number): Promise<void> {
  await fetchResponse(`/v0/indices/${indexId}/subjects/${subjectId}`, 'DELETE');
}

/** 为当前用户收藏目录 */
export async function collectIndex(indexId: number): Promise<void> {
  await fetchResponse(`/v0/indices/${indexId}/collect`, 'POST');
}

/** 取消当前用户收藏目录 */
export async function uncollectIndex(indexId: number): Promise<void> {
  await fetchResponse(`/v0/indices/${indexId}/collect`, 'DELETE');
}

export async function getIndexSubjects(
  indexId: number,
  params: GetIndexSubjectsParams = { page: 1, pageSize: 30 }
): Promise<IndexSubjectsResponse> {
  return fetchApi<IndexSubjectsResponse>(`/v0/indices/${indexId}/subjects`, 'GET', {
    query: transformPaginationParams(params),
  });
}
