export const CollectionType = {
  /** 想看 */
  Wish: 1,
  /** 看过 */
  Completed: 2,
  /** 在看 */
  Doing: 3,
  /** 搁置 */
  OnHold: 4,
  /** 抛弃 */
  Dropped: 5,
} as const;

export type CollectionType = (typeof CollectionType)[keyof typeof CollectionType];

export const EpisodeCollectionType = {
  /** 未收藏 */
  None: 0,
  /** 想看 */
  Wish: 1,
  /** 看过 */
  Completed: 2,
  /** 抛弃 */
  Dropped: 3,
} as const;

export type EpisodeCollectionType =
  (typeof EpisodeCollectionType)[keyof typeof EpisodeCollectionType];
