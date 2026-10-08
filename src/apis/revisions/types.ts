import type { paths } from '@/types/openapi';

export type PersonRevisionsResponse =
  paths['/v0/revisions/persons']['get']['responses']['200']['content']['application/json'];
export type PersonRevisionResponse =
  paths['/v0/revisions/persons/{revision_id}']['get']['responses']['200']['content']['application/json'];

export type CharacterRevisionsResponse =
  paths['/v0/revisions/characters']['get']['responses']['200']['content']['application/json'];
export type CharacterRevisionResponse =
  paths['/v0/revisions/characters/{revision_id}']['get']['responses']['200']['content']['application/json'];

export type SubjectRevisionsResponse =
  paths['/v0/revisions/subjects']['get']['responses']['200']['content']['application/json'];
export type SubjectRevisionResponse =
  paths['/v0/revisions/subjects/{revision_id}']['get']['responses']['200']['content']['application/json'];

export type EpisodeRevisionsResponse =
  paths['/v0/revisions/episodes']['get']['responses']['200']['content']['application/json'];
export type EpisodeRevisionResponse =
  paths['/v0/revisions/episodes/{revision_id}']['get']['responses']['200']['content']['application/json'];
