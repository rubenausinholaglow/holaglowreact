import { useEffect, useState } from 'react';
import { ProfessionalType } from '@interface/clinic';
import HubService from '@services/HubService';
import { messageService } from '@services/MessageService';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgStethoscope } from 'icons/Icons';
import { SvgCalling, SvgUserSquare } from 'icons/IconsDs';

import Notification from './Notification';

export default function ButtonMessage() {
  const [showButtons, setShowButtons] = useState(false);
  const [clinicProfessionalId, setclinicProfessionalId] = useState('');
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );
  const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const SOCKET_URL =
      process.env.NEXT_PUBLIC_CLINICS_API + 'Hub/ProfessionalResponse';
    const webConnection = new HubService(SOCKET_URL);

    webConnection
      .getConnection()
      .on('ReceiveMessage', (receivedMessage: any) => {
        showMessage(receivedMessage.actions[0]?.actionId || '');
      });

    return () => {
      webConnection.getConnection().stop();
    };
  }, []);

  const toggleButtons = () => {
    setclinicProfessionalId(localStorage.getItem('ClinicProfessionalId') || '');
    setShowButtons(!showButtons);
  };

  const sendMessageToMedic = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Medical);
    setShowButtons(!showButtons);
    startTimeout();
  };

  const sendMessageToReception = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Others);
    setShowButtons(!showButtons);
    startTimeout();
  };

  function showMessage(actionId: string) {
    const partsToCompare = actionId.split('/');
    const professionalId = partsToCompare[0];
    const action = partsToCompare[1];
    const clinicProfessionalId = localStorage.getItem('ClinicProfessionalId');
    if (professionalId === clinicProfessionalId) {
      if (action === '0') {
        setMessageNotification('Puedo venir');
      } else if (action === '1') {
        setMessageNotification('No puedo venir');
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
    <Flex layout="row-left" className="gap-2 ml-4 overflow-hidden relative">
      <div
        className="bg-hg-purple rounded-full p-3 text-white cursor-pointer relative z-10"
        onClick={toggleButtons}
      >
        <SvgCalling height={20} width={20} className="relative z-10" />
      </div>
      <div
        className={`transition-all flex flex-row gap-2 ${
          showButtons
            ? 'translate-x-0  opacity-100'
            : '-translate-x-[calc(108%)] opacity-0'
        }`}
      >
        <div
          className="bg-hg-purple300 rounded-full p-3 text-hg-purple cursor-pointer"
          onClick={sendMessageToMedic}
        >
          <SvgStethoscope height={20} width={20} />
        </div>

        <div
          className="bg-hg-purple300 rounded-full p-3 text-hg-purple cursor-pointer"
          onClick={sendMessageToReception}
        >
          <SvgUserSquare height={20} width={20} />
        </div>
      </div>
      {messageNotification ? (
        <Notification message={messageNotification} />
      ) : (
        <></>
      )}
    </Flex>
  );
}
