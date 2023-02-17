import Axios, { type AxiosInstance } from 'axios';
import type {
  SearchParams,
  ExperimentalSearchParams,
  GetEpisodesParams,
  GetUserCollectionsParams,
  PatchUserCollectionParams,
  GetUserCollectionEpisodesParams,
  PatchUserCollectionEpisodesParams,
  SubjectType,
  ImageType,
  SubjectImageType,
  UserAvatarType,
  EpisodeCollectionType,
} from './types';

export * from './types';

export class BangumiApi {
  private static URL = 'https://api.bgm.tv';
  private static VERSION = '1.0.2';
  private static UserAgent = `Rewrite0/BangumiApi/${BangumiApi.VERSION} (https://github.com/Rewrite0/BangumiApi)`;

  private AccessToken: string;
  private axios: AxiosInstance;

  /**
   * 初始化axios实例
   * @param opts 配置项
   * @param opts.AccessToken AccessToken - https://next.bgm.tv/demo/access-token
   */
  constructor(opts?: { AccessToken?: string }) {
    this.AccessToken = opts?.AccessToken ?? '';

    let headers: { 'User-Agent': string; Authorization?: string } = {
      'User-Agent': BangumiApi.UserAgent,
    };

    if (this.AccessToken !== '') {
      headers.Authorization = `Bearer ${this.AccessToken}`;
    }

    this.axios = Axios.create({
      baseURL: BangumiApi.URL,
      headers,
    });
  }

  /** 每日放送 */
  calendar() {
    return this.axios.get('/calendar');
  }

  /**
   * 条目搜索
   * @param keywords 关键词
   * @param params 参数
   * @param params.type 条目类型 - 1, 2, 3, 4, 6
   * @param params.responseGroup 返回数据大小, small, medium, large, 默认 small
   * @param params.start 开始条数
   * @param params.max_resulte 每页最多条数, 最大25
   */
  search(keywords: string, params?: SearchParams) {
    const url = encodeURI(`/search/subject/${keywords}`);
    return this.axios.get(url, {
      params,
    });
  }

  /**
   * 实验性条目搜索
   * @param keyword 关键词
   * @param params 参数 sort, filter
   * @param params.sort 排序 'match' | 'heat' | 'rank' | 'score'
   * @param params.filter type, tag, air_date, rating, rank, nsfw
   */
  experimentalSearch(keyword: string, params?: ExperimentalSearchParams) {
    return this.axios.post('/v0/search/subjects', {
      keyword,
      ...params,
    });
  }

  /**
   * 获取条目
   * @param id 条目id
   */
  getSubject(id: number) {
    return this.axios.get(`/v0/subjects/${id}`);
  }

  /**
   * 获取条目图片
   * @param id 条目id
   * @param type 图片类型 - 默认 'small'
   */
  getSubjectImage(id: number, type: SubjectImageType = 'small') {
    return this.axios.get(`/v0/subjects/${id}/image`, {
      params: {
        type,
      },
    });
  }

  /**
   * 获取条目人物
   * @param id 条目id
   */
  getSubjectPersons(id: number) {
    return this.axios.get(`/v0/subjects/${id}/persons`);
  }

  /**
   * 获取条目角色
   * @param id 条目id
   */
  getSubjectCharacters(id: number) {
    return this.axios.get(`/v0/subjects/${id}/characters`);
  }

  /**
   * 获取条目 Relations
   * @param id 条目id
   */
  getSubjectsRelations(id: number) {
    return this.axios.get(`/v0/subjects/${id}/subjects`);
  }

  /**
   * get episodes
   * @param subject_id 条目id
   * @param params 参数
   * @param params.type 章节类型 - 0, 1, 2, 3, 4, 5, 6
   * @param params.limit limit default: 100
   * @param params.offset offset default: 0
   */
  getEpisodes(subject_id: number, params?: GetEpisodesParams) {
    return this.axios.get('/v0/episodes', {
      params: {
        subject_id,
        ...params,
      },
    });
  }

  /**
   * get episode
   * @param episode_id 章节id
   */
  getEpisode(episode_id: number) {
    return this.axios.get(`/v0/episodes/${episode_id}`);
  }

  /**
   * get character detail
   * @param character_id 角色id
   */
  getCharactersDetail(character_id: number) {
    return this.axios.get(`/v0/characters/${character_id}`);
  }

  /**
   * get character image
   * @param character_id 角色id
   * @param type 图片类型 - small|grid|large|medium
   */
  getCharacterImage(character_id: number, type: ImageType) {
    return this.axios.get(`/v0/characters/${character_id}/image`, {
      params: {
        type,
      },
    });
  }

  /**
   * get character related subjects
   * @param character_id 角色id
   */
  getCharacterSubjects(character_id: number) {
    return this.axios.get(`/v0/characters/${character_id}/subjects`);
  }

  /**
   * get character related persons
   * @param character_id 角色id
   */
  getCharacterPersons(character_id: number) {
    return this.axios.get(`/v0/characters/${character_id}/persons`);
  }

  /**
   * get person
   * @param person_id 人物id
   */
  getPerson(person_id: number) {
    return this.axios.get(`/v0/persons/${person_id}`);
  }

  /**
   * get person image
   * @param person_id 人物id
   * @param type 图片类型 - small|grid|large|medium
   */
  getPersonImage(person_id: number, type: ImageType) {
    return this.axios.get(`/v0/persons/${person_id}/image`, {
      params: {
        type,
      },
    });
  }

  /**
   * get person related subjects
   * @param person_id 人物id
   */
  getPersonSubjects(person_id: number) {
    return this.axios.get(`/v0/persons/${person_id}/subjects`);
  }

  /**
   * get person related characters
   * @param person_id 人物id
   */
  getPersonCharacters(person_id: number) {
    return this.axios.get(`/v0/persons/${person_id}/characters`);
  }

  /**
   * 获取用户信息
   * @param username 用户名或UID, 设置了用户名之后无法使用 UID
   */
  getUserInfo(username: string) {
    return this.axios.get(`/v0/users/${username}`);
  }

  /**
   * 获取用户头像
   * @description 获取用户头像，302 重定向至头像地址，设置了 username 之后无法使用 UID 查询。
   * @param username 用户名或UID, 设置了用户名之后无法使用 UID
   * @param type 用户头像类型 - small|large|medium
   */
  getUserAvatar(username: string, type: UserAvatarType) {
    return this.axios.get(`/v0/users/${username}/avatar`, {
      params: {
        type,
      },
    });
  }

  /**
   * 返回当前 Access Token 对应的用户信息
   */
  getMe() {
    return this.axios.get('/v0/me');
  }

  /**
   * 获取对应用户的收藏，查看私有收藏需要access token
   * @param username 用户名或UID, 设置了用户名之后无法使用 UID
   * @param params 参数
   * @param params.subject_type 条目类型 -  1, 2, 3, 4, 6
   * @param params.type 收藏类型 -  1, 2, 3, 4, 5
   * @param params.limit default 30
   * @param params.offset default 0
   */
  getUserCollections(username: string, params: GetUserCollectionsParams) {
    return this.axios.get(`/v0/users/${username}/collections`, {
      params,
    });
  }

  /**
   * 获取对应用户的单个收藏条目，查看私有收藏需要access token。
   * @param username 用户名或UID, 设置了用户名之后无法使用 UID
   * @param subject_id 条目id
   */
  getUserCollectionsSubject(username: string, subject_id: number) {
    return this.axios.get(`/v0/users/${username}/collections/${subject_id}`);
  }

  /**
   * 修改指定收藏条目的收藏状态
   * @description 由于直接修改剧集条目的完成度可能会引起意料之外效果，只能用于修改书籍类条目的完成度。
   * PATCH 方法的所有请求体字段均可选
   * @param subject_id 条目id
   * @param params 参数
   * @param params.type 条目收藏类型 1, 2, 3, 4, 5
   * @param params.rate 评分，0 表示删除评分
   * @param params.ep_status 只能用于修改书籍条目进度
   * @param params.vol_status 只能用于修改书籍条目进度
   * @param params.comment 评价
   * @param params.private 仅自己可见
   * @param params.tags 不传或者 null 都会被忽略，传 [] 则会删除所有 tag
   */
  patchUserCollectionSubject(subject_id: number, params?: PatchUserCollectionParams) {
    return this.axios.patch(`/v0/users/-/collections/${subject_id}`, params);
  }

  /**
   * 获取指定收藏条目的章节信息
   * @param subject_id 条目id
   * @param params 参数
   * @param params.episode_type 章节类型 不传则不按照章节进行筛选 - 0, 1, 2, 3, 4, 5, 6
   * @param params.offset offset default: 0
   * @param params.limit limit default: 100
   */
  getUserCollectionsSubjectEpisodes(
    subject_id: number,
    params?: GetUserCollectionEpisodesParams
  ) {
    return this.axios.get(`/v0/users/-/collections/${subject_id}/episodes`, {
      params,
    });
  }

  /**
   * 修改指定收藏条目的章节信息
   * @description 同时会重新计算条目的完成度, 暂时不能生成时间线
   * @param subject_id 条目id
   * @param params 参数
   * @param params.episode_id 章节id数组
   * @param params.type 0, 1, 2, 3
   */
  patchUserCollectionsSubjectEpisodes(
    subject_id: number,
    params: PatchUserCollectionEpisodesParams
  ) {
    return this.axios.patch(`/v0/users/-/collections/${subject_id}/episodes`, params);
  }

  /**
   * 获取指定收藏章节信息
   * @param episode_id 章节id
   */
  getUserCollectionsEpisode(episode_id: number) {
    return this.axios.get(`/v0/users/-/collections/-/episodes/${episode_id}`);
  }

  /**
   * 更新指定收藏章节信息
   * @param episode_id 章节id
   * @param type 章节收藏类型
   */
  putUserCollectionsEpisode(episode_id: number, type: EpisodeCollectionType) {
    return this.axios.put(`/v0/users/-/collections/-/episodes/${episode_id}`, {
      type,
    });
  }

  /**
   * 获取指定人物编辑历史
   * @param person_id 人物id
   * @param params 参数
   * @param params.limit limit default 30
   * @param params.offset offset default 0
   */
  getRevisionsPersons(
    person_id: number,
    params?: {
      limit?: number;
      offset?: number;
    }
  ) {
    return this.axios.get(`/v0/revisions/persons`, {
      params: {
        person_id,
        ...params,
      },
    });
  }

  /**
   * 获取人物编辑历史, 指定历史版本
   * @param revision_id 历史版本id
   */
  getThisRevisionPersons(revision_id: number) {
    return this.axios.get(`/v0/revisions/persons/${revision_id}`);
  }

  /**
   * 获取指定角色编辑历史
   * @param character_id 角色id
   * @param params 参数
   * @param params.limit limit default 30
   * @param params.offset offset default 0
   */
  getRevisionsCharacters(
    character_id: number,
    params?: {
      limit?: number;
      offset?: number;
    }
  ) {
    return this.axios.get(`/v0/revisions/characters`, {
      params: {
        character_id,
        ...params,
      },
    });
  }

  /**
   * 获取角色编辑历史, 指定历史版本
   * @param revision_id 历史版本id
   */
  getThisRevisionCharacters(revision_id: number) {
    return this.axios.get(`/v0/revisions/characters/${revision_id}`);
  }

  /**
   * 获取指定条目编辑历史
   * @param subject_id 条目id
   * @param params 参数
   * @param params.limit limit default 30
   * @param params.offset offset default 0
   */
  getRevisionsSubjects(
    subject_id: number,
    params?: {
      limit?: number;
      offset?: number;
    }
  ) {
    return this.axios.get(`/v0/revisions/subjects`, {
      params: {
        subject_id,
        ...params,
      },
    });
  }

  /**
   * 获取条目编辑历史, 指定历史版本
   * @param revision_id 历史版本id
   */
  getThisRevisionSubjects(revision_id: number) {
    return this.axios.get(`/v0/revisions/subjects/${revision_id}`);
  }

  /**
   * 获取指定章节编辑历史
   * @param episode_id  章节id
   * @param params 参数
   * @param params.limit limit default 30
   * @param params.offset offset default 0
   */
  getRevisionsEpisodes(
    episode_id: number,
    params?: {
      limit?: number;
      offset?: number;
    }
  ) {
    return this.axios.get(`/v0/revisions/episodes`, {
      params: {
        episode_id,
        ...params,
      },
    });
  }

  /**
   * 获取条目编辑历史, 指定历史版本
   * @param episode_id 历史版本id
   */
  getThisRevisionEpisodes(revision_id: number) {
    return this.axios.get(`/v0/revisions/episodes/${revision_id}`);
  }

  /**
   * 创建目录
   */
  createIndices() {
    return this.axios.post('/v0/indices');
  }

  /**
   * 获取目录
   * @param index_id 目录id
   */
  getIndices(index_id: number) {
    return this.axios.get(`/v0/indices/${index_id}`);
  }

  /**
   * 编辑目录信息
   * @param index_id 目录id
   * @param params 参数
   * @param params.title title
   * @param params.description description
   */
  putIndices(
    index_id: number,
    params: {
      title?: string;
      description?: string;
    }
  ) {
    return this.axios.put(`/v0/indices/${index_id}`, params);
  }

  /**
   * 获取目录中的条目
   * @param index_id 目录id
   * @param params 参数
   * @param params.type 条目类型 - 1, 2, 3, 4, 6
   * @param params.limit limit default 30
   * @param params.offset offset default 0
   */
  getIndicesSubject(
    index_id: number,
    params?: {
      type?: SubjectType;
      limit?: number;
      offset?: number;
    }
  ) {
    return this.axios.get(`/v0/indices/${index_id}/subjects`, {
      params,
    });
  }

  /**
   * 添加条目到目录
   * @param index_id 目录id
   * @param subject_id 条目id
   * @param params 参数
   * @param params.sort 排序条件，越小越靠前
   * @param params.comment 评论
   */
  addIndicesSubject(
    index_id: number,
    subject_id: number,
    params?: {
      sort?: number;
      comment?: string;
    }
  ) {
    return this.axios.post(`/v0/indices/${index_id}/subjects`, {
      subject_id,
      ...params,
    });
  }

  /**
   * 编辑目录中的条目信息
   * @description 如果条目不存在于目录，会创建该条目
   * @param index_id 目录id
   * @param subject_id 条目id
   * @param params 参数
   * @param params.sort 排序条件，越小越靠前
   * @param params.comment 评论
   */
  putIndicesSubject(
    index_id: number,
    subject_id: number,
    params?: {
      sort?: number;
      comment?: number;
    }
  ) {
    return this.axios.put(`/v0/indices/${index_id}/subjects/${subject_id}`, params);
  }

  /**
   * 删除目录中的条目
   * @param index_id 目录id
   * @param subject_id 条目id
   */
  deleteIndicesSubject(index_id: number, subject_id: number) {
    return this.axios.delete(`/v0/indices/${index_id}/subjects/${subject_id}`);
  }
}
