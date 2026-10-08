import type { components, paths } from '@/types/openapi';
import type { Pagination } from '@/utils/pagination';
import type { SubjectType } from '../subjects/enum';

export type IndexResponse = components['schemas']['Index'];

export type UpdateIndexParams = Exclude<
  paths['/v0/indices/{index_id}']['put']['requestBody'],
  undefined
>['content']['application/json'];

export type IndexSubjectsResponse = components['schemas']['Paged_IndexSubject'];

export type GetIndexSubjectsParams = Pagination & {
  type?: SubjectType;
};

export type AddSubjectToIndexParams = Exclude<
  paths['/v0/indices/{index_id}/subjects']['post']['requestBody'],
  undefined
>['content']['application/json'];

export type UpdateIndexSubjectParams = Exclude<
  paths['/v0/indices/{index_id}/subjects/{subject_id}']['put']['requestBody'],
  undefined
>['content']['application/json'];
