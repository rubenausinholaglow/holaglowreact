'use client';
import { useEffect, useState } from 'react';
import { Status } from '@interface/appointment';
import { messageService } from '@services/MessageService';
import ScheduleService from '@services/ScheduleService';
import { SvgMessage } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { GoToPageData } from 'app/types/FrontEndMessages';
import { clearLocalStorage } from 'app/utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

export default function ValidateComment() {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');

  const { showModalBackground } = useGlobalStore(state => state);
  const { user, storedAppointmentId, storedClinicId, storedBoxId, extraInfo } =
    useGlobalPersistedStore(state => state);
  const router = useRouter();

  const handleCommentSubmit = async () => {
    setIsCommentModalOpen(false);
    await ScheduleService.finish(
      storedAppointmentId ?? '',
      comment ?? '',
      user?.id || ''
    );
    await ScheduleService.updatePatientStatusAppointment(
      storedAppointmentId ?? '',
      user?.id || '',
      Status.Finished
    );
    const gotoPage: GoToPageData = {
      userId: user?.id || '',
      page: 'Home',
    };
    messageService.goToPage(gotoPage);
    clearLocalStorage(false);
    let url = `/dashboard?clinicId=${storedClinicId}&boxId=${storedBoxId}&remoteControl=true`;
    if (extraInfo) url += '&extraInfo=true';
    router.push(url);
  };

  useEffect(() => {
    if (!showModalBackground) {
      setIsCommentModalOpen(false);
    }
  }, [showModalBackground]);

  return (
    <>
      <Modal isVisible={isCommentModalOpen} width="w-3/4">
        <Flex layout="col-center" className="p-8">
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Escribe tu comentario..."
            className="w-full h-40 p-2 resize-none border rounded-lg mb-6"
          />

          <Flex className="w-full justify-between gap-4">
            <Button
              type="tertiary"
              isSubmit
              onClick={handleCommentSubmit}
              customStyles="bg-hg-secondary100"
            >
              Finalizar Cita
            </Button>
            <Button
              type="tertiary"
              onClick={() => setIsCommentModalOpen(false)}
              customStyles="bg-hg-secondary100"
            >
              Cancelar
            </Button>
          </Flex>
        </Flex>
      </Modal>

      <Flex className="bg-white/75 py-6 px-8 rounded-full justify-between">
        <Flex className="p-3 justify-center gap-2">
          <SvgMessage height={24} width={24} />
          <Text className="font-semibold text-lg">Comentarios</Text>
        </Flex>
        <Button
          type="tertiary"
          onClick={() => setIsCommentModalOpen(true)}
          customStyles="bg-hg-secondary100"
        >
          Finalizar cita
        </Button>
      </Flex>
    </>
  );
}
