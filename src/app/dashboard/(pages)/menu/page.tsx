'use client';

import React, { useEffect, useState } from 'react';
import ScheduleService from '@services/ScheduleService';
import { clearLocalStorage } from '@utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

import DashboardMenuItem from './DashboardMenuItem';
import { menuItems } from './MenuItems';

const Page = () => {
  menuItems;
  const [username, setUserName] = useState('');
  const [flowwwToken, setFlowwwToken] = useState<string | null>(null);
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [boxId, setBoxId] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [appointmentFlowwwId, setAppointmentFlowwwId] = useState<string | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUserName(storedUsername);

    if (!storedUsername) {
      router.push('/dashboard');
    }

    setAppointmentId(localStorage.getItem('appointmentId') || '');
    setAppointmentFlowwwId(localStorage.getItem('appointmentFlowwwId') || '');
    setFlowwwToken(localStorage.getItem('flowwwToken') || '');
    setClinicId(localStorage.getItem('ClinicId') || '');
    setBoxId(localStorage.getItem('boxId') || '');
  }, []);

  const handleClick = async () => {
    const result = await ScheduleService.confirm(
      appointmentId ?? '',
      appointmentFlowwwId ?? '',
      flowwwToken ?? ''
    );
    if (result) {
      clearLocalStorage(false);
      router.push(`/dashboard?clinicId=${clinicId}&boxId=${boxId}`);
    } else {
      //TODO - MESSAGE!
    }
  };

  return (
    <>
      {username && (
        <Container>
          <Flex layout="col-center">
            <p className="font-bold text-xl mb-8">
              Hola {username} ¿Qué deseas hacer?
            </p>
            <div className="grid grid-cols-3">
              {menuItems.map(item => (
                <DashboardMenuItem
                  key={item.title}
                  iconSrc={item.iconSrc}
                  altText={item.altText}
                  title={item.title}
                  link={item.link}
                />
              ))}
            </div>
          </Flex>
          <Flex layout="col-center" className="mt-8">
            <Button isSubmit onClick={handleClick} type="secondary">
              Finalizar Cita
            </Button>
          </Flex>
        </Container>
      )}
    </>
  );
};
export default Page;
