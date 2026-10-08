import { paths } from '@/types/openapi';
import { Pretty } from '@/types/utils';
import { Pagination } from '@/utils/pagination';

export type SearchPersonsParams = Pretty<
  Pagination &
    Exclude<
      paths['/v0/search/persons']['post']['requestBody'],
      undefined
    >['content']['application/json']
>;

export type SearchPersonsResponse =
  paths['/v0/search/persons']['post']['responses'][200]['content']['application/json'];

export type PersonResponse =
  paths['/v0/persons/{person_id}']['get']['responses'][200]['content']['application/json'];

export type PersonRelatedSubjectsResponse =
  paths['/v0/persons/{person_id}/subjects']['get']['responses'][200]['content']['application/json'];

export type PersonRelatedCharactersResponse =
  paths['/v0/persons/{person_id}/characters']['get']['responses'][200]['content']['application/json'];
