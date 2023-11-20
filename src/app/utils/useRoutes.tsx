'use client';

import { useEffect, useState } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import Treatments from 'app/user/passport/Treatments';

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
      checkIn: {
        root: '/dashboard/checkin',
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
