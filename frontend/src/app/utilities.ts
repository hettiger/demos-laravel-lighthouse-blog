import { PaginatorInfo, PaginatorInfoResource } from './entities';

export function paginatorInfo(resource?: PaginatorInfoResource): PaginatorInfo {
  return {
    pageSize: resource?.perPage ?? 0,
    pageIndex: (resource?.currentPage ?? 1) - 1,
    length: resource?.total ?? 0,
  };
}
