export const SubjectType = {
  /** 书籍 */
  Book: 1,
  /** 动画 */
  Anime: 2,
  /** 音乐 */
  Music: 3,
  /** 游戏 */
  Game: 4,
  /** 三次元 */
  Real: 6,
} as const;

export type SubjectType = (typeof SubjectType)[keyof typeof SubjectType];

export const SubjectBookCategory = {
  /** 其他 */
  Other: 0,
  /** 漫画 */
  Manga: 1001,
  /** 小说 */
  Novel: 1002,
  /** 画集 */
  Art: 1003,
} as const;

export type SubjectBookCategory =
  (typeof SubjectBookCategory)[keyof typeof SubjectBookCategory];

export const SubjectAnimeCategory = {
  /** 其他 */
  Other: 0,
  /** TV */
  TV: 1,
  /** OVA */
  OVA: 2,
  /** Movie */
  Movie: 3,
  /** WEB */
  Web: 5,
} as const;

export type SubjectAnimeCategory =
  (typeof SubjectAnimeCategory)[keyof typeof SubjectAnimeCategory];

export const SubjectGameCategory = {
  /** 其他 */
  Other: 0,
  /** 游戏 */
  Game: 4001,
  /** 软件 */
  Software: 4002,
  /** 扩展包 */
  Expansion: 4003,
  /** 桌游 */
  BoardGame: 4005,
} as const;

export type SubjectGameCategory =
  (typeof SubjectGameCategory)[keyof typeof SubjectGameCategory];


export const SubjectRealCategory = {
  /** 其他 */
  Other: 0,
  /** 日剧 */
  JapaneseDrama: 1,
  /** 欧美剧 */
  WesternDrama: 2,
  /** 华语剧 */
  ChineseDrama: 3,
  /** 电视剧 */
  TVDrama: 6001,
  /** 电影 */
  Movie: 6002,
  /** 演出 */
  Performance: 6003,
  /** 综艺 */
  VarietyShow: 6004,
} as const;

export type SubjectRealCategory =
  (typeof SubjectRealCategory)[keyof typeof SubjectRealCategory];
