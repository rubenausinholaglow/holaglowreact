import Bugsnag from '@bugsnag/js';
import { UpsellingData } from '@interface/upselling';
import {
  ERROR_GET_DERMAROUTINES,
  ERROR_UPDATE_DERMAQUESTIONS,
} from '@utils/textConstants';
import { DermaQuestions } from '@interface/derma/dermaquestions';

export const dermaService = {
  update: async (derma: DermaQuestions) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DERMACONTACTS_API}Derma`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(derma),
        }
      );
      if (!response.ok) {
        Bugsnag.notify(ERROR_UPDATE_DERMAQUESTIONS);
        throw new Error(ERROR_UPDATE_DERMAQUESTIONS);
      }

      return await response.text();
    } catch (error) {
      Bugsnag.notify(error + ERROR_UPDATE_DERMAQUESTIONS);
      throw new Error(ERROR_UPDATE_DERMAQUESTIONS);
    }
  },
  getRoutine: async (phone: string): Promise<UpsellingData> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DERMAPATIENTS_API}DermaRoutines?phone=` +
          phone,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        Bugsnag.notify(ERROR_GET_DERMAROUTINES);
        throw new Error(ERROR_GET_DERMAROUTINES);
      }

      return await response.json();
    } catch (error) {
      Bugsnag.notify(error + ERROR_GET_DERMAROUTINES);
      throw new Error(ERROR_GET_DERMAROUTINES);
    }
  },
};
