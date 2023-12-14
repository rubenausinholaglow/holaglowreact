'use client';

import { useGlobalPersistedStore } from 'app/stores/globalStore';

const useRoutes = () => {
  const { storedBoxId, storedClinicId, user } = useGlobalPersistedStore(
    state => state
  );

  return {
    home: '/',
    treatments: '/tratamientos',
    checkout: {
      clinics: '/checkout/clinicas',
      treatments: '/checkout/treatments',
      schedule: '/checkout/agenda',
      contactForm: '/checkout/contactform',
      thankYou: '/checkout/confirmation',
    },
    clinics: '/clinicas',
    aboutUs: '/quienes-somos',
    blog: '/blog',
    dashboard: {
      crisalix: '/dashboard/crisalix',
      agenda: `https://agenda2.holaglow.com/schedule?mode=dashboard&token=flowwwToken${user?.flowwwToken}`,
      menu: '/dashboard/menu',
      home: `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=false`,
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
  };
};

export default useRoutes;
