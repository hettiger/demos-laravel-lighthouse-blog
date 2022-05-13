export type RouterLinkCommands = any[] | string | null | undefined;

export interface Link {
  label: string;
  icon: string;
  routerLink: RouterLinkCommands;
}

export interface MessageBag {
  [key: string]: string[];
}

export interface PaginatorInfoResource {
  total: number;
  perPage: number;
  currentPage: number;
}

export interface PaginatorInfo {
  pageSize: number;
  pageIndex: number;
  length: number;
}
