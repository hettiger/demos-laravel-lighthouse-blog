export type RouterLinkCommands = any[] | string | null | undefined;

export interface Link {
  label: string;
  icon: string;
  routerLink: RouterLinkCommands;
}
