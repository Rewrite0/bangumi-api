import { type paths } from '@/types/openapi';
import { Pretty } from '@/types/utils';
import { Pagination } from '@/utils/pagination';
import type { EpisodeType } from './enum';

export type GetEpisodesParams = Pretty<
  Pagination & {
    type?: EpisodeType;
  }
>;

export type EpisodesResponse =
  paths['/v0/episodes']['get']['responses']['200']['content']['application/json'];

export type EpisodeResponse =
  paths['/v0/episodes/{episode_id}']['get']['responses']['200']['content']['application/json'];
