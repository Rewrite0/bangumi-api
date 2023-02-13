export type SearchParams = {
  type?: number;
  /** small, medium, large, 默认 small */
  responseGroup?: string;
  start?: number;
  max_resulte?: number;
};

export type ExperimentalSearchParams = {
  offset?: number;
  limit?: number;
  filter?: {
    type?: number[];
    tag?: string[];
    air_date?: string[];
    rating?: string[];
    rank?: string[];
    nsfw?: boolean;
  };
};

export type GetEpisodesParams = {
  type?: number;
  limit?: number;
  offset?: number;
};

export type GetUserCollectionsParams = {
  /** 参考 enum SubjectType */
  subject_type?: number;
  /** 参考 enum CollectionType */
  type?: number;
  limit?: number;
  offset?: number;
};

export type PatchUserCollectionParams = {
  type?: number;
  rate?: number;
  ep_status?: number;
  vol_status?: number;
  comment?: string;
  private?: boolean;
  tags?: string[];
};

export type GetUserCollectionEpisodesParams = {
  offset?: number;
  limit?: number;
  /** 参考 enum EpType - 0, 1, 2, 3, 4, 5, 6 */
  episode_type?: number;
};

export type PatchUserCollectionEpisodesParams = {
  episode_id?: number[];
  type?: number;
};
