import { Budget } from '@interface/budget';
import { ERROR_CREATE_BUDGET } from '@utils/textConstants';

export const budgetService = {
  createBudget: async (budget: Budget) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PATIENTS_API}Budget`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(budget),
        }
      );

      if (!response.ok) {
        throw new Error(ERROR_CREATE_BUDGET);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(ERROR_CREATE_BUDGET);
    }
  },
};
