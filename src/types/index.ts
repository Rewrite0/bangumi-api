/**
 * 条目类型
 * @description
 * 1: 书籍 2: 动画 3: 音乐 4: 游戏 6: 三次元
 * */
export type SubjectType = 1 | 2 | 3 | 4 | 6;

/**
 * 收藏类型
 * @description
 * 1: 想看 2: 看过 3: 在看 4: 搁置 5: 抛弃
 * */
export type CollectionType = 1 | 2 | 3 | 4 | 5;

/**
 * 章节类型
 * @description
 * 0: 本篇 1: 特别篇 2: OP 3: ED 4: 预告/宣传/广告 5: MAD 6: other
 * */
export type EpType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** 图片类型 */
export type ImageType = 'small' | 'grid' | 'large' | 'medium';

/** 用户头像类型 */
export type UserAvatarType = 'small' | 'large' | 'medium';

/** 条目图片类型 */
export type SubjectImageType = 'small' | 'grid' | 'large' | 'medium' | 'common';

/**
 * 章节收藏类型
 * @description
 * 0: 未收藏 1: 想看 2: 看过 3: 抛弃
 */
export type EpisodeCollectionType = 0 | 1 | 2 | 3;

export type SearchParams = {
  type?: number;
  /** 默认 small */
  responseGroup?: 'small' | 'medium' | 'large';
  start?: number;
  max_resulte?: number;
};

export type ExperimentalSearchParams = {
  /**
   * 排序
   * @description
   * match: meilisearch 的默认排序，按照匹配程度
   * heat: 收藏人数
   * rank: 排名由高到低
   * score: 评分
   */
  sort?: 'match' | 'heat' | 'rank' | 'score';
  filter?: {
    /** 条目类型, 多值之间为 或 的关系 */
    type?: SubjectType[];
    /** 标签, 多值之间为 且 关 */
    tag?: string[];
    /** 播出日期/发售日期，日期必需为 YYYY-MM-DD 格式。多值之间为 且 关系 */
    air_date?: string[];
    /** 用于搜索指定评分的条目，多值之间为 且 关系 */
    rating?: string[];
    /** 用于搜索指定排名的条目，多值之间为 且 关系。 */
    rank?: string[];
    /**
     * 无权限的用户会直接忽略此字段，不会返回R18条目
     * 默认或者 null 会返回包含 R18 的所有搜索结果
     * */
    nsfw?: boolean;
  };
};

export type GetEpisodesParams = {
  type?: EpType;
  limit?: number;
  offset?: number;
};

export type GetUserCollectionsParams = {
  subject_type?: SubjectType;
  type?: CollectionType;
  limit?: number;
  offset?: number;
};

export type PatchUserCollectionParams = {
  type?: CollectionType;
  rate?: number;
  ep_status?: number;
  vol_status?: number;
  comment?: string;
  private?: boolean;
  tags?: string[] | null;
};

export type GetUserCollectionEpisodesParams = {
  offset?: number;
  limit?: number;
  episode_type?: EpType;
};

export type PatchUserCollectionEpisodesParams = {
  episode_id?: number[];
  type?: EpisodeCollectionType;
};
