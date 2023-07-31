<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { ProfessionalType } from '@interface/clinic';
import HubService from '@services/HubService';
=======
import { useState } from 'react';
import { ProfessionalType } from '@interface/clinic';
import { setupSocketConnection } from '@services/HubService';
>>>>>>> FixesDev
import { messageService } from '@services/MessageService';
import { ERROR_ACTION_MESSAGE } from '@utils/textConstants';

export default function ButtonMessage() {
  const [showButtons, setShowButtons] = useState(false);
  const [clinicProfessionalId, setclinicProfessionalId] = useState('');

<<<<<<< HEAD
  useEffect(() => {
    const SOCKET_URL = process.env.NEXT_PUBLIC_CLINICS_API + '/Slack/Response';
    const webConnection = new HubService(SOCKET_URL);

    webConnection
      .getConnection()
      .on('ReceivedMessage', (receivedMessage: any) => {
        showMessage(receivedMessage.actions[0]?.actionId || '');
      });

    return () => {
      webConnection.getConnection().stop();
    };
  }, []);

=======
>>>>>>> FixesDev
  const toggleButtons = () => {
    setclinicProfessionalId(localStorage.getItem('ClinicProfessionalId') || '');
    setShowButtons(!showButtons);
  };

<<<<<<< HEAD
  const sendMessageToMedic = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Medical);
=======
  const openSocket = () => {
    const connection = setupSocketConnection();
    connection.on('ReceiveMessage', recivemessage => {
      const actionId = recivemessage.actions[0]?.actionId || '';
      showMessage(actionId);
    });
  };

  const sendMessageToMedic = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Medical);
    openSocket();
>>>>>>> FixesDev
    setShowButtons(!showButtons);
  };

  const sendMessageToReception = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Others);
<<<<<<< HEAD
=======
    openSocket();
>>>>>>> FixesDev
    setShowButtons(!showButtons);
  };

  function showMessage(actionId: string) {
    const partsToCompare = actionId.split('/');
    const professionalId = partsToCompare[0];
    const action = partsToCompare[1];
<<<<<<< HEAD
    if (professionalId === clinicProfessionalId) {
      if (action === '0') {
        console.log('Puedo');
      } else if (action === '1') {
=======

    if (professionalId === clinicProfessionalId) {
      if (action === 'actionId-0') {
        console.log('Puedo');
      } else if (action === 'actionId-1') {
>>>>>>> FixesDev
        console.log('No Puedo');
      } else {
        console.log(ERROR_ACTION_MESSAGE);
      }
    }
  }

  return (
    <>
      <div className="relative">
        <button className="floating-button" onClick={toggleButtons}>
          <i className="fa-solid fa-message"></i>
        </button>

        {showButtons && (
          <div className="absolute right-0 bottom-14">
            <button
              className="floating-sub-button medic-button"
              onClick={sendMessageToMedic}
            >
              M
            </button>
            <button
              className="floating-sub-button reception-button"
              onClick={sendMessageToReception}
            >
              R
            </button>
          </div>
        )}
      </div>
    </>
  );
}
