import { useEffect, useState } from 'react';
import { ProfessionalType } from '@interface/clinic';
import HubService from '@services/HubService';
import { messageService } from '@services/MessageService';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgStethoscope } from 'icons/Icons';
import { SvgCalling, SvgUserSquare } from 'icons/IconsDs';

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

  useEffect(() => {
    setclinicProfessionalId(localStorage.getItem('ClinicProfessionalId') || '');
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

  const sendMessageToMedic = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Medical);
    setmedicClassName('bg-hg-malva');
    startTimeout();
  };

  const sendMessageToReception = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Others);
    setreceptionClassName('bg-hg-malva');
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
        if (professionalType == 'Others') {
          setreceptionClassName('bg-hg-green');
        }
      } else if (action === '1') {
        if (professionalType == 'Medical') {
          setmedicClassName('bg-red-500');
        }
        if (professionalType == 'Others') {
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
    <Flex layout="row-left" className="gap-2 ml-4 overflow-hidden relative">
      <div
        className={`transition-all flex flex-row gap-2 translate-x-0  opacity-100`}
      >
        <div
          className={`${medicClassName} rounded-full p-3 text-hg-darkMalva cursor-pointer`}
          onClick={sendMessageToMedic}
        >
          <SvgStethoscope height={16} width={16} />
        </div>

        <div
          className={`${receptionClassName} bg-white rounded-full p-3 text-hg-darkMalva cursor-pointer`}
          onClick={sendMessageToReception}
        >
          <SvgUserSquare height={16} width={16} />
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
