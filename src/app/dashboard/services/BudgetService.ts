import Bugsnag from '@bugsnag/js';
import { Budget } from '@interface/budget';
import { Ticket } from '@interface/ticket';
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
        Bugsnag.notify(ERROR_CREATE_BUDGET);
        throw new Error(ERROR_CREATE_BUDGET);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      Bugsnag.notify(error + ERROR_CREATE_BUDGET);
      throw new Error(ERROR_CREATE_BUDGET);
    }
  },
  createTicket: async (ticket: Ticket) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PATIENTS_API}Ticket`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticket),
        }
      );

      if (!response.ok) {
        Bugsnag.notify(ERROR_CREATE_BUDGET);
        throw new Error(ERROR_CREATE_BUDGET);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      Bugsnag.notify(error + ERROR_CREATE_BUDGET);
      throw new Error(ERROR_CREATE_BUDGET);
    }
  },
};
