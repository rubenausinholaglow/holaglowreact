import { useEffect, useState } from 'react';
import { ProfessionalType } from '@interface/clinic';
import HubService from '@services/HubService';
import { messageService } from '@services/MessageService';
import { ERROR_ACTION_MESSAGE } from '@utils/textConstants';

export default function ButtonMessage() {
  const [showButtons, setShowButtons] = useState(false);
  const [clinicProfessionalId, setclinicProfessionalId] = useState('');

  useEffect(() => {
    const SOCKET_URL = process.env.NEXT_PUBLIC_CLINICS_API + '/Slack/Response';
    const webConnection = new HubService(SOCKET_URL);

    webConnection.getConnection().on('ReceiveMessage', (recivemessage: any) => {
      const actionId = recivemessage.actions[0]?.actionId || '';
      showMessage(actionId);
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
  };

  const sendMessageToReception = () => {
    messageService.sendMessage(clinicProfessionalId, ProfessionalType.Others);
    setShowButtons(!showButtons);
  };

  function showMessage(actionId: string) {
    const partsToCompare = actionId.split('/');
    const professionalId = partsToCompare[0];
    const action = partsToCompare[1];
    if (professionalId === clinicProfessionalId) {
      if (action === '0') {
        console.log('Puedo');
      } else if (action === '1') {
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
