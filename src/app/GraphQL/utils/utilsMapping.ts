import {
  budgetTotalPriceWithDiscount,
  getProductPrice,
} from '@utils/budgetUtils';
import { BudgetsResponseNode } from '../BudgetsQueryResponse';
import { TaskResponseNode } from '../TaskQueryResponse';
import { UsersResponseNode } from '../UserQueryResponse';

export const mapBudgetsData = (
  budgetsData: BudgetsResponseNode[]
): BudgetsResponseNode[] | undefined => {
  try {
    return budgetsData.map(budget => {
      const fullName =
        budget.user.firstName +
        ' ' +
        budget.user.lastName +
        ' ' +
        budget.user.secondLastName;
      const services = concatenateProductName(budget.products);

      var total = 0;
      budget.products.forEach(x => {
        total += getProductPrice({
          percentageDiscount: x.percentageDiscount,
          price: x.price,
          priceDiscount: x.priceDiscount,
          productId: '',
        });
      });

      if (budget.manualPrice > 0) {
        total = budget.manualPrice;
      }

      if (budget.priceDiscount > 0) {
        total = total - budget.priceDiscount;
      }

      if (budget.percentageDiscount > 0) {
        total = total - total * budget.percentageDiscount;
      }
      const totalWithEuro = total + '€';
      return {
        ...budget,
        fullName,
        services,
        totalWithEuro,
      };
    });
  } catch (e) {
    console.log('Error mapping ' + e);
  }
};
const concatenateProductName = (array: any[]) => {
  const result = array.map(element => element.product.title).join(', ');
  return result;
};
export const mapUserData = (
  usersData: UsersResponseNode[]
): UsersResponseNode[] | undefined => {
  try {
    return usersData.map(user => {
      const lastName = user.secondLastName
        ? `${user.lastName} ${user.secondLastName}`
        : user.lastName;

      let lastAppointment = null;
      let lastLead = null;

      if (user.leads && user.leads.length > 0) {
        const sortedLeads = [...user.leads].sort(
          (a, b) =>
            new Date(b.creationDate).getTime() -
            new Date(a.creationDate).getTime()
        );
        const leadWithAppointments = sortedLeads.find(
          lead => lead.appointments && lead.appointments.length > 0
        );

        if (
          leadWithAppointments &&
          leadWithAppointments?.appointments.length > 0
        ) {
          lastLead = leadWithAppointments;
          const sortedAppointments = [
            ...leadWithAppointments.appointments,
          ].sort(
            (a, b) =>
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
          );
          lastAppointment = sortedAppointments[0];
        } else {
          lastLead = sortedLeads[0];
        }
      }

      return {
        ...user,
        lastName,
        lastLead,
        lastAppointment,
      };
    });
  } catch (e) {
    console.log('Error mapping ' + e);
  }
};

export const isValidDate = (dateString: string): boolean => {
  return dateString !== '0001-01-01T00:00:00';
};

const calculateDuration = (task: TaskResponseNode): string => {
  if (isValidDate(task.completedTime.toString())) {
    const completedTime = new Date(task.completedTime);
    const creationDate = new Date(task.creationDate);

    const durationMs = completedTime.getTime() - creationDate.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return '';
};

export const mapTasksData = (
  TaskData: TaskResponseNode[]
): TaskResponseNode[] => {
  return TaskData.map(task => {
    const lastName = task.user.secondLastName
      ? `${task.user.lastName} ${task.user.secondLastName}`
      : task.user.lastName;

    const durationtime = calculateDuration(task);

    return {
      ...task,
      lastName,
      durationTime: durationtime || '',
    };
  });
};
