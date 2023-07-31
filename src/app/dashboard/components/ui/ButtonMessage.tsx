import { useState } from 'react';
import { ProfessionalType } from '@interface/clinic';
import { setupSocketConnection } from '@services/HubService';
import { messageService } from '@services/MessageService';
import { ERROR_ACTION_MESSAGE } from '@utils/textConstants';

export default function ButtonMessage() {
  const [showButtons, setShowButtons] = useState(false);
  const [clinicProfessionalId, setclinicProfessionalId] = useState('');

  const toggleButtons = () => {
    setclinicProfessionalId(localStorage.getItem('ClinicProfessionalId') || '');
    setShowButtons(!showButtons);
  };

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
    setShowButtons(!showButtons);
  };

  const sendMessageToReception = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Others);
    openSocket();
    setShowButtons(!showButtons);
  };

  function showMessage(actionId: string) {
    const partsToCompare = actionId.split('/');
    const professionalId = partsToCompare[0];
    const action = partsToCompare[1];

    if (professionalId === clinicProfessionalId) {
      if (action === 'actionId-0') {
        console.log('Puedo');
      } else if (action === 'actionId-1') {
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
