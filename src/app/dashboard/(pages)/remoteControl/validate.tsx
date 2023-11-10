'use client';
import { useState } from 'react';
import ScheduleService from '@services/ScheduleService';
import { clearLocalStorage } from '@utils/utils';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import router from 'next/router';

export default function ValidateComment() {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const { user, storedAppointmentId } = useGlobalPersistedStore(state => state);

  const handleClick = async () => {
    setIsCommentModalOpen(true);
  };

  const handleCommentSubmit = async () => {
    setIsCommentModalOpen(false);
    const result = await ScheduleService.finish(
      storedAppointmentId ?? '',
      comment ?? '',
      user?.id || ''
    );
    if (result) {
      clearLocalStorage(false);
      router.push('/dashboard');
    } else {
      //TODO - MESSAGE!
    }
  };

  return (
    <>
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
            Finalizar Cita
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
    </>
  );
}
