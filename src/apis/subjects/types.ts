import { type paths } from '@/types/openapi';
import { type Pretty } from '@/types/utils';
import type {
  SubjectBookCategory,
  SubjectAnimeCategory,
  SubjectGameCategory,
  SubjectRealCategory,
  SubjectType,
} from './enum';
import { Pagination } from '@/utils/pagination';
import { ImageType } from '@/types';

/** 条目图片类型 */
export type SubjectImageType = ImageType | 'common';

/** 条目分类 */
export type SubjectCategory =
  | SubjectBookCategory
  | SubjectAnimeCategory
  | SubjectGameCategory
  | SubjectRealCategory;

export type CalendarResponse = paths['/calendar']['get']['responses']['200']['content']['application/json'];

type SearchSubjectRequestBody = Exclude<
  paths['/v0/search/subjects']['post']['requestBody'],
  undefined
>;
export type SearchSubjectsParams = Pretty<
  Pagination & SearchSubjectRequestBody['content']['application/json']
>;
export type SearchSubjectsResponse =
  paths['/v0/search/subjects']['post']['responses']['200']['content']['application/json'];

export type SubjectsParams = Pretty<
  Pagination &
    Omit<paths['/v0/subjects']['get']['parameters']['query'], 'type' | 'cat' | 'limit' | 'offset'> & {
      type: SubjectType;
      cat?: SubjectCategory;
    }
>;
export type SubjectsResponse =
  paths['/v0/subjects']['get']['responses']['200']['content']['application/json'];

export type SubjectResponse =
  paths['/v0/subjects/{subject_id}']['get']['responses']['200']['content']['application/json'];

export type SubjectRelatedPersonsResponse =
  paths['/v0/subjects/{subject_id}/persons']['get']['responses']['200']['content']['application/json'];

export type SubjectRelatedCharactersResponse =
  paths['/v0/subjects/{subject_id}/characters']['get']['responses']['200']['content']['application/json'];

export type SubjectRelatedSubjectsResponse =
  paths['/v0/subjects/{subject_id}/subjects']['get']['responses']['200']['content']['application/json'];
