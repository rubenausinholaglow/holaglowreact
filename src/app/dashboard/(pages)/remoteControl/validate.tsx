'use client';
import { useState } from 'react';
import { GoToPageData } from '@interface/FrontEndMessages';
import { messageService } from '@services/MessageService';
import ScheduleService from '@services/ScheduleService';
import { clearLocalStorage } from '@utils/utils';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

export default function ValidateComment() {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const { user, storedAppointmentId, storedClinicId, storedBoxId } =
    useGlobalPersistedStore(state => state);
  const router = useRouter();

  const handleClick = async () => {
    setIsCommentModalOpen(true);
  };

  const handleCommentSubmit = async () => {
    setIsCommentModalOpen(false);
    await ScheduleService.finish(
      storedAppointmentId ?? '',
      comment ?? '',
      user?.id || ''
    );
    const gotoPage: GoToPageData = {
      clinicId: storedClinicId,
      boxId: storedBoxId,
      page: 'Home',
    };
    messageService.goToPage(gotoPage);
    clearLocalStorage(false);
    router.push(
      `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=true`
    );
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
