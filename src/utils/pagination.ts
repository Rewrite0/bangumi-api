export type Pagination = {
  /** 分页页码 @default 1 */
  page?: number;
  /** 每页数量 @default 20 */
  pageSize?: number;
};

export function transformPaginationParams<T extends Pagination>(params: T) {
  const { page = 1, pageSize = 20, ...rest } = params;
  return {
    ...rest,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };
}
