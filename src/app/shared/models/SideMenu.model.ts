export type SideMenu = {
  child?: SideMenuItem[];
} & SideMenuItem;

export type SideMenuItem = {
  routerLink?: string;
  shape: string;
  displayName: string;
  permission: string[];
};
