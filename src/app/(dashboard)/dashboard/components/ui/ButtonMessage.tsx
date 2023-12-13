import { useEffect, useState } from 'react';
import { messageService } from '@services/MessageService';
import { useMessageSocket } from 'app/(dashboard)/dashboard/components/useMessageSocket';
import { SvgHolaglowHand, SvgStethoscope } from 'app/icons/Icons';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { ProfessionalType } from 'app/types/clinic';
import { MessageType } from 'app/types/messageSocket';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

import Notification from './Notification';

export default function ButtonMessage() {
  const [medicClassName, setmedicClassName] = useState('bg-white');
  const [receptionClassName, setreceptionClassName] = useState('bg-white');
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );
  const { storedClinicProfessionalId } = useGlobalPersistedStore(
    state => state
  );
  const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const messageSocket = useMessageSocket(state => state);

  useEffect(() => {
    const existMessageChatResponse = messageSocket.messageSocket.filter(
      x => x.messageType == MessageType.ChatResponse
    );
    if (existMessageChatResponse.length > 0) {
      const finalMessage: any = existMessageChatResponse[0].message;
      if (finalMessage.actions) {
        showMessage(finalMessage.actions[0].actionId);
      }
      messageSocket.removeMessageSocket(existMessageChatResponse[0]);
    }
  }, [messageSocket]);

  const sendMessageToMedic = () => {
    messageService.sendMessage(
      storedClinicProfessionalId,
      ProfessionalType.Medical
    );
    setmedicClassName('bg-hg-primary');
    startTimeout();
  };

  const sendMessageToReception = () => {
    messageService.sendMessage(
      storedClinicProfessionalId,
      ProfessionalType.Others
    );
    setreceptionClassName('bg-hg-primary');
    startTimeout();
  };

  function showMessage(actionId: string) {
    const partsToCompare = actionId.split('/');
    const professionalId = partsToCompare[0];
    const action = partsToCompare[1];
    const professionalType = partsToCompare[2];

    if (professionalId === storedClinicProfessionalId) {
      if (action === '0') {
        if (professionalType == 'Medical') {
          setmedicClassName('bg-hg-green');
        }
        if (professionalType == 'Other') {
          setreceptionClassName('bg-hg-green');
        }
      } else if (action === '1') {
        if (professionalType == 'Medical') {
          setmedicClassName('bg-red-500');
        }
        if (professionalType == 'Other') {
          setreceptionClassName('bg-red-500');
        }
      } else {
        setMessageNotification('Error recibiendo mensaje');
      }
    }
  }

  const startTimeout = () => {
    setMessageNotification(null);
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }

    setMessageTimeout(
      setTimeout(
        () => {
          setMessageNotification('No puedo venir');
          setMessageTimeout(null);
        },
        2 * 60 * 1000
      )
    );
  };

  return (
    <Flex layout="row-left" className="gap-2 py-4 overflow-hidden">
      <Button
        size="sm"
        type="tertiary"
        customStyles={`border-none px-3 ${medicClassName}`}
        onClick={() => sendMessageToMedic()}
      >
        <SvgStethoscope className="mr-2" height={16} width={16} />
        Llamar
      </Button>

      <Button
        size="sm"
        type="tertiary"
        customStyles={`border-none px-3 ${receptionClassName}`}
        onClick={() => sendMessageToReception()}
      >
        <SvgHolaglowHand className="mr-2" height={16} width={16} />
        Llamar
      </Button>

      {messageNotification ? (
        <Notification message={messageNotification} />
      ) : (
        <></>
      )}
    </Flex>
  );
}
