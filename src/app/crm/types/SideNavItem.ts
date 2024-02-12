export type SideNavItem = {
    title : string;
    path : string;
    submenu? : boolean;
    submenuItems?: SideNavItem[];
};