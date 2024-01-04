import Bugsnag from '@bugsnag/js';
import { ERROR_UPDATE_DERMAQUESTIONS } from '@utils/textConstants';
import { DermaQuestions } from 'app/types/dermaquestions';

export const dermaService = {
  update: async (derma: DermaQuestions) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CONTACTS_API}Derma`,
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

      return await response.body;
    } catch (error) {
      Bugsnag.notify(error + ERROR_UPDATE_DERMAQUESTIONS);
      throw new Error(ERROR_UPDATE_DERMAQUESTIONS);
    }
  },
};
