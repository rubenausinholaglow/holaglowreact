'use client';

import { useGlobalPersistedStore } from 'app/stores/globalStore';

const useRoutes = () => {
  const { storedBoxId, storedClinicId, user, isCallCenter } =
    useGlobalPersistedStore(state => state);

  return {
    home: '/',
    treatments: '/tratamientos',
    checkout: {
      clinics: '/checkout/clinicas',
      type: '/checkout/tipo-cita',
      treatments: '/checkout/treatments',
      schedule: '/checkout/agenda',
      contactForm: '/checkout/contactform',
      confirmation: '/checkout/confirmation',
    },
    clinics: '/clinicas',
    aboutUs: '/quienes-somos',
    blog: '/blog',
    dashboard: {
      crisalix: '/dashboard/crisalix',
      schedule: `/dashboard/schedule?flowwwToken=${
        user?.flowwwToken != undefined ? user?.flowwwToken : ''
      } `,
      menu: '/dashboard/menu',
      budgets: '/dashboard/budgets',
      home: isCallCenter
        ? `/dashboard?isCallCenter=true&ignoreMessages=true`
        : `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=false`,
      checkOut: '/dashboard/checkout',
      checkIn: {
        root: `/dashboard/checkin?clinicId=${storedClinicId}`,
        treatments: '/dashboard/checkin/treatments',
        agenda: '/dashboard/checkin/agenda',
        thankYou: '/dashboard/checkin/welcome',
        contactForm: '/dashboard/checkin/treatments',
        badRequest: '/dashboard/checkin/badRequest',
        confirmation: '/dashboard/checkin/confirmation',
      },
    },
    crm: {
      authentication: '/crm',
      menu: '/crm/menu',
    },
  };
};

export default useRoutes;
