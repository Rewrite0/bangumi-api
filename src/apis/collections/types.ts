import type { SubjectType } from '../subjects/enum';
import type { EpisodeType } from '../episodes/enum';
import type { CollectionType } from './enum';
import type { Pagination } from '@/utils/pagination';
import type { paths } from '@/types/openapi';

export type GetUserCollectionsParams = {
  /** 条目类型，默认为全部 */
  subject_type?: SubjectType;
  /** 收藏类型，默认为全部 */
  type?: CollectionType;
} & Pagination;

export type UserCollectionsResponse =
  paths['/v0/users/{username}/collections']['get']['responses']['200']['content']['application/json'];

export type UserCollectionResponse =
  paths['/v0/users/{username}/collections/{subject_id}']['get']['responses']['200']['content']['application/json'];

export type UpsertCollectionSubjectParams = Exclude<
  paths['/v0/users/-/collections/{subject_id}']['post']['requestBody'],
  undefined
>['content']['application/json'];

export type GetMyCollectionSubjectEpisodesParams = Pagination & {
  /** 章节类型，不传则不按照章节进行筛选 */
  episode_type?: EpisodeType;
};

export type UserCollectionSubjectEpisodesResponse =
  paths['/v0/users/-/collections/{subject_id}/episodes']['get']['responses']['200']['content']['application/json'];

export type UpdateMyCollectionSubjectEpisodesParams = Exclude<
  paths['/v0/users/-/collections/{subject_id}/episodes']['patch']['requestBody'],
  undefined
>['content']['application/json'];

export type UserCollectionEpisodeResponse =
  paths['/v0/users/-/collections/-/episodes/{episode_id}']['get']['responses']['200']['content']['application/json'];

export type UserCollectionCharactersResponse =
  paths['/v0/users/{username}/collections/-/characters']['get']['responses']['200']['content']['application/json'];

export type UserCollectionCharacterResponse =
  paths['/v0/users/{username}/collections/-/characters/{character_id}']['get']['responses']['200']['content']['application/json'];

export type UserCollectionPersonsResponse =
  paths['/v0/users/{username}/collections/-/persons']['get']['responses']['200']['content']['application/json'];

export type UserCollectionPersonResponse =
  paths['/v0/users/{username}/collections/-/persons/{person_id}']['get']['responses']['200']['content']['application/json'];
