import { type paths } from '@/types/openapi';
import { Pretty } from '@/types/utils';
import { Pagination } from '@/utils/pagination';

export type SearchCharactersParams = Pretty<
  Pagination &
    Exclude<
      paths['/v0/search/characters']['post']['requestBody'],
      undefined
    >['content']['application/json']
>;
export type SearchCharactersResponse =
  paths['/v0/search/characters']['post']['responses']['200']['content']['application/json'];

export type CharacterResponse =
  paths['/v0/characters/{character_id}']['get']['responses']['200']['content']['application/json'];

export type CharacterRelatedSubjectsResponse =
  paths['/v0/characters/{character_id}/subjects']['get']['responses']['200']['content']['application/json'];

export type CharacterRelatedPersonsResponse =
  paths['/v0/characters/{character_id}/persons']['get']['responses']['200']['content']['application/json'];
