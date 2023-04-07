import type { AxiosInstance } from 'axios';
import type { BGMSubject, BGMUser } from 'bgm-types';

import { createAxios } from './axios';
import {
  useSearch,
  useSubject,
  useEpisodes,
  useCharacters,
  usePersons,
  useUsers,
  useCollections,
  useRevisions,
  useThisRevisions,
  type ThisRevisionsFunctions,
  type RevisionsFunctions,
  useIndices,
  useCreateIndices,
  type IndicesFunctions,
} from './apis';

export class BangumiApi {
  private AccessToken: string;
  private axios: AxiosInstance;

  /**
   * 初始化axios实例
   * @param opts 配置项
   */
  constructor(opts?: {
    /** 可在 https://next.bgm.tv/demo/access-token 生成 */
    AccessToken?: string;
  }) {
    this.AccessToken = opts?.AccessToken ?? '';

    this.axios = createAxios(this.AccessToken);
  }

  /** 每日放送 */
  async calendar() {
    const { data } = await this.axios.get<BGMSubject.Calendar>('/calendar');
    return data;
  }

  /**
   * 返回当前 Access Token 对应的用户信息
   */
  async getMe() {
    const { data } = await this.axios.get<BGMUser.Me>('/v0/me');
    return data;
  }

  /**
   * 条目搜索
   * @param keyword 关键词
   */
  search(keyword: string) {
    return useSearch(this.axios, keyword);
  }

  /**
   * 条目
   * @param subject_id subject id
   */
  subjects(subject_id: number) {
    return useSubject(this.axios, subject_id);
  }

  /**
   * 章节
   */
  episodes() {
    return useEpisodes(this.axios);
  }

  /**
   * 角色
   * @param character_id character id
   */
  characters(character_id: number) {
    return useCharacters(this.axios, character_id);
  }

  /**
   * 人物
   * @param person_id person id
   */
  persons(person_id: number) {
    return usePersons(this.axios, person_id);
  }

  /**
   * 用户
   * @param username 用户名或UID, 设置了用户名之后无法使用 UID
   */
  users(username: string) {
    return useUsers(this.axios, username);
  }

  /**
   * 收藏
   */
  collections() {
    return useCollections(this.axios);
  }

  /**
   * 编辑历史
   */
  revisions(): RevisionsFunctions;
  /**
   * 编辑历史 - 指定历史版本
   * @param revision_id 历史版本 id
   */
  revisions(revision_id: number): ThisRevisionsFunctions;
  revisions(revision_id?: number) {
    if (revision_id) {
      return useThisRevisions(this.axios, revision_id);
    } else {
      return useRevisions(this.axios);
    }
  }

  /**
   * 目录
   * @param index_id 目录 id
   */
  indices(index_id: number): Omit<IndicesFunctions, 'create'>;
  /**
   * 目录
   * @description 没有传入目录 id 时, 使用 create 方法创建目录
   */
  indices(): Pick<IndicesFunctions, 'create'>;
  indices(index_id?: number) {
    if (index_id) {
      return useIndices(this.axios, index_id);
    } else {
      return useCreateIndices(this.axios);
    }
  }
}
