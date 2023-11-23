import { useEffect, useState } from 'react';
import { useMessageSocket } from '@components/useMessageSocket';
import { ProfessionalType } from '@interface/clinic';
import { MessageType } from '@interface/messageSocket';
import { messageService } from '@services/MessageService';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgHolaglowHand, SvgStethoscope } from 'icons/Icons';

import Notification from './Notification';

export default function ButtonMessage() {
  const [clinicProfessionalId, setclinicProfessionalId] = useState('');
  const [medicClassName, setmedicClassName] = useState('bg-white');
  const [receptionClassName, setreceptionClassName] = useState('bg-white');
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );

  const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const messageSocket = useMessageSocket(state => state);

  useEffect(() => {
    setclinicProfessionalId(localStorage.getItem('ClinicProfessionalId') || '');
  }, []);

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
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Medical);
    setmedicClassName('bg-hg-primary');
    startTimeout();
  };

  const sendMessageToReception = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Others);
    setreceptionClassName('bg-hg-primary');
    startTimeout();
  };

  function showMessage(actionId: string) {
    const partsToCompare = actionId.split('/');
    const professionalId = partsToCompare[0];
    const action = partsToCompare[1];
    const professionalType = partsToCompare[2];
    const clinicProfessionalId = localStorage.getItem('ClinicProfessionalId');

    if (professionalId === clinicProfessionalId) {
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
        size="xl"
        type="tertiary"
        customStyles={`border-none px-3 ${medicClassName}`}
        onClick={() => sendMessageToMedic()}
      >
        <SvgStethoscope className="mr-2" height={16} width={16} />
        Llamar
      </Button>

      <Button
        size="xl"
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
