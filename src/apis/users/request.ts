import { fetchApi } from '@/fetch';
import type {
  CurrentUserResponse,
  UserAvatarType,
  UserResponse,
  UsernameOrUid,
} from './types';
import { BASEURL } from '@/config';

/**
 * 获取用户信息。
 *
 * @param usernameOrUid 用户名或 UID。
 * @remarks 如果用户已经设置用户名，则不能通过 UID 查询该用户。
 */
export async function getUserByUsernameOrUid(
  usernameOrUid: UsernameOrUid
): Promise<UserResponse> {
  return fetchApi<UserResponse>(
    `/v0/users/${encodeURIComponent(String(usernameOrUid))}`,
    'GET'
  );
}

/**
 * 获取用户头像 URL。
 *
 * @param usernameOrUid 用户名或 UID。
 * @remarks 如果用户已经设置用户名，则不能通过 UID 获取该用户头像。
 */
export function buildUserAvatarUrl(
  usernameOrUid: UsernameOrUid,
  type: UserAvatarType
): string {
  const url = new URL(
    `/v0/users/${encodeURIComponent(String(usernameOrUid))}/avatar`,
    BASEURL
  );
  url.searchParams.set('type', type);
  return url.toString();
}

/** 返回当前 Access Token 对应的用户信息 */
export async function getMe(): Promise<CurrentUserResponse> {
  return fetchApi<CurrentUserResponse>('/v0/me', 'GET');
}
