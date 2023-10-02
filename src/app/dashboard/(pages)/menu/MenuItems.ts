const newCrisalix = localStorage.getItem('newCrisalix');
let crisalixUrl = 'https://sso.crisalix.com/users/sign_in';
let target = '_blank';
if (newCrisalix) {
  crisalixUrl = '/dashboard/crisalix';
  target = '';
}
export const menuItems = [
  {
    iconSrc: '/images/dashboard/menu-icons/3d_simulator.png',
    altText: 'Simulador 3D',
    title: 'Simulador 3D',
    link: crisalixUrl,
    target: target,
  },
  {
    iconSrc: '/images/dashboard/menu-icons/budgets.png',
    altText: 'Presupuestos',
    title: 'Presupuestos',
    link: '/dashboard/budgets',
    target: '',
  },
  {
    iconSrc: '/images/dashboard/menu-icons/agenda.png',
    altText: 'Agenda',
    title: 'Agenda',
    link: 'https://agenda.holaglow.com/schedule?mode=dashboard&token=flowwwToken',
    target: '_blank',
  },
];
