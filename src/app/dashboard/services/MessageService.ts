import { ProfessionalType } from '@interface/clinic';
import { MessageSent } from '@interface/message';
import {
  ERROR_RESPONSE_MESSAGE,
  ERROR_SEND_MESSAGE,
} from '@utils/textConstants';

export const messageService = {
  sendMessage: async (
    professionalId: string,
    professionalType: ProfessionalType
  ) => {
    const messageSent: MessageSent = {
      professionalId: professionalId,
      professionalType: professionalType,
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_CLINICS_API}Message`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageSent),
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

