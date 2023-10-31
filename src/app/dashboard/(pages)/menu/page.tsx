'use client';

import React, { useEffect, useState } from 'react';
import ScheduleService from '@services/ScheduleService';
import { clearLocalStorage } from '@utils/utils';
import MainLayout from 'app/components/layout/MainLayout';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

import DashboardMenuItem from './DashboardMenuItem';
import { menuItems } from './MenuItems';

const Page = () => {
  const [username, setUserName] = useState('');
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [boxId, setBoxId] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [flowwwToken, setFlowwwToken] = useState('');

  const router = useRouter();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const newCrisalix = localStorage.getItem('newCrisalix');
    if (newCrisalix) {
      menuItems[0].link = '/dashboard/crisalix';
      menuItems[0].target = '';
    }
    const storedUsername = localStorage.getItem('username') || '';
    setUserName(storedUsername);

    if (!storedUsername) {
      router.push('/dashboard');
    }

    setAppointmentId(localStorage.getItem('appointmentId') || '');
    setClinicId(localStorage.getItem('ClinicId') || '');
    setBoxId(localStorage.getItem('boxId') || '');
    setUserId(localStorage.getItem('id') || '');
    setFlowwwToken(localStorage.getItem('flowwwToken') || '');
  }, []);

  return (
    <MainLayout isDashboard hideContactButtons hideProfessionalSelector>
      {username && (
        <Container>
          <Flex layout="col-center">
            <p className="font-bold text-4xl mb-2">¡Hola {username}!</p>
            <p className="text-4xl mb-8">Tu glow, tus normas</p>
            <div className="grid grid-cols-3">
              {menuItems.map(item => (
                <DashboardMenuItem
                  key={item.title}
                  iconSrc={item.iconSrc}
                  altText={item.altText}
                  title={item.title}
                  link={
                    item.link.includes('flowwwToken')
                      ? item.link.replace('flowwwToken', flowwwToken)
                      : item.link
                  }
                  target={item.target}
                />
              ))}
            </div>
          </Flex>
        </Container>
      )}
    </MainLayout>
  );
};
export default Page;
