export enum ImageType {
  small = 'small',
  grid = 'grid',
  large = 'large',
  medium = 'medium',
}

export enum UserAvatarType {
  small = 'small',
  large = 'large',
  medium = 'medium',
}

export enum SubjectImageType {
  small = 'small',
  grid = 'grid',
  large = 'large',
  medium = 'medium',
  common = 'common',
}

export enum CollectionType {
  /** 想看 */
  wantToWatch = 1,
  /** 看过 */
  finished = 2,
  /** 在看 */
  watching = 3,
  /** 搁置 */
  shelve = 4,
  /** 抛弃 */
  abandon = 5,
}

export enum SubjectType {
  /** 书籍 */
  book = 1,
  /** 动画 */
  animation = 2,
  /** 音乐 */
  music = 3,
  /** 游戏 */
  game = 4,
  /** 三次元 */
  reality = 6,
}

export enum EpType {
  /** 本篇 */
  main = 0,
  /** 特别篇 */
  special = 1,
  /** OP */
  op = 2,
  /** ED */
  ed = 3,
  /** 预告/宣传/广告 */
  ad = 4,
  /** MAD */
  mad = 5,
  /** 其他 */
  other = 6,
}
