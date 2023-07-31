import { ProfessionalType } from '@interface/clinic';
import {
  ERROR_RESPONSE_MESSAGE,
  ERROR_SEND_MESSAGE,
} from '@utils/textConstants';

interface MessageSended {
  professionalId: string;
  professionalType: ProfessionalType;
}

export const messageService = {
  sendMessage: async (
    professionalId: string,
    professionalType: ProfessionalType
  ) => {
    const messageSend: MessageSended = {
      professionalId: professionalId,
      professionalType: professionalType,
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_CLINICS_API}Message`;
      console.log(professionalId);
      console.log(professionalType);
      console.log(url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageSend),
      });

      if (!response.ok) {
        throw new Error(ERROR_RESPONSE_MESSAGE);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(ERROR_SEND_MESSAGE);
    }
  },
};
