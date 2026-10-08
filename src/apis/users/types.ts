import { ImageType } from '@/types';
import type { paths } from '@/types/openapi';

export type UserResponse =
  paths['/v0/users/{username}']['get']['responses']['200']['content']['application/json'];

export type UserAvatarType = Exclude<ImageType, 'grid'>;

export type UsernameOrUid = string | number;

export type CurrentUserResponse = paths['/v0/me']['get']['responses']['200']['content']['application/json'];
