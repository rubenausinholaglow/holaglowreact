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
  const [clinicId, setClinicId] = useState<string | null>(null);
  const [boxId, setBoxId] = useState<string | null>(null);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUserName(storedUsername);

    if (!storedUsername) {
      router.push('/dashboard');
    }

    setAppointmentId(localStorage.getItem('appointmentId') || '');
    setClinicId(localStorage.getItem('ClinicId') || '');
    setBoxId(localStorage.getItem('boxId') || '');
    setUserId(localStorage.getItem('id') || '');
  }, []);

  const handleClick = async () => {
    setIsCommentModalOpen(true);
  };
  const handleCommentSubmit = async () => {
    setIsCommentModalOpen(false);
    const result = await ScheduleService.confirm(
      appointmentId ?? '',
      comment ?? '',
      userId || ''
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
                  target={item.target}
                />
              ))}
            </div>
          </Flex>
          {!isCommentModalOpen && (
            <Flex layout="col-center" className="mt-8">
              <Button isSubmit onClick={handleClick} type="secondary">
                Finalizar Cita
              </Button>
            </Flex>
          )}
          {isCommentModalOpen && (
            <Flex layout="col-center" className="mt-8">
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Escribe tu comentario..."
                className="w-full h-40 p-2 resize-none border rounded-lg"
              />

              <Button
                isSubmit
                onClick={handleCommentSubmit}
                type="secondary"
                className="mt-4"
              >
                Finalizar
              </Button>
              <Button
                onClick={() => setIsCommentModalOpen(false)}
                type="secondary"
                className="mt-4"
              >
                Cancelar
              </Button>
            </Flex>
          )}
        </Container>
      )}
    </>
  );
};
export default Page;
