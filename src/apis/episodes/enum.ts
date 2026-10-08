export const EpisodeType = {
  /** 本篇 */
  Main: 0,
  /** 特别篇 */
  Special: 1,
  /** OP */
  OP: 2,
  /** ED */
  ED: 3,
  /** 预告/宣传/广告 */
  Preview: 4,
  /** MAD */
  MAD: 5,
  /** 其他 */
  Other: 6,
} as const;

export type EpisodeType = (typeof EpisodeType)[keyof typeof EpisodeType];
