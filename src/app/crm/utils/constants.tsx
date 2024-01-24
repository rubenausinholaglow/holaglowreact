import { SideNavItem } from '../types/SideNavItem';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Contactos',
    path: '/crm/contacts',
  },
  {
    title: 'Test',
    path: '/crm/Test',
    submenu: true,
    submenuItems: [
      {
        title: 'sub1',
        path: '/',
      },
      {
        title: 'sub2',
        path: '/',
      },
    ],
  },
];
