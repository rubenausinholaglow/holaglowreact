'use client';

import { useEffect, useState } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';

const useRoutes = () => {
  const [flowwwToken, setFlowwwToken] = useState('');

  const { storedBoxId, storedClinicId } = useGlobalPersistedStore(
    state => state
  );

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      setFlowwwToken(localStorage.getItem('flowwwToken') || '');
    }
  }, []);

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
    dashboard: {
      crisalix: '/dashboard/crisalix',
      agenda: `https://agenda.holaglow.com/schedule?mode=dashboard&token=flowwwToken${flowwwToken}`,
      menu: '/dashboard/menu',
      home: `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=false`,
      checkOut: '/dashboard/remoteControl/Payment',
    },
  };
};

export default useRoutes;
