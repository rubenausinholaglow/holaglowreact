import { SideNavItem } from '../types/SideNavItem';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Dashboard',
    path: '/crm/menu',
  },
  {
    title: 'Contactos',
    path: '/crm/contacts',
  },
  {
    title: 'Tareas',
    path: '/crm/tasks',
  },
  {
    title: 'Test Sumbenu',
    path: '/crm/tasks',
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