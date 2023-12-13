import Bugsnag from '@bugsnag/js';
import { CreatePayment, InitializePayment } from '@interface/initializePayment';

export default class FinanceService {
  static async initializePayment(initializePayment: InitializePayment) {
    try {
      const url = `${process.env.NEXT_PUBLIC_FINANCE_API}External`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initializePayment),
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return '';
      }
    } catch (error: any) {
      Bugsnag.notify(error);
    }
  }

  static async createPayment(createPayment: CreatePayment) {
    const updatedCreatePayment: CreatePayment = {
      userId: createPayment.userId,
      paymentMethod: createPayment.paymentMethod,
      amount: createPayment.amount * 100,
      referenceId: createPayment.referenceId,
      originOfPayment: createPayment.originOfPayment,
      paymentBank: createPayment.paymentBank,
    };
    try {
      const url = `${process.env.NEXT_PUBLIC_FINANCE_API}Payment`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCreatePayment),
      });

      if (!res.ok) {
        Bugsnag.notify('Error creating Payment');
        throw new Error('Erro creating Payment');
      }
      const data = await res.text();
      return data;
    } catch (error: any) {
      Bugsnag.notify(error);
    }
  }

  static async deletePayment(id: string) {
    try {
      const url = `${process.env.NEXT_PUBLIC_FINANCE_API}Payment?id=${id}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.text();
        return data;
      } else {
        return '';
      }
    } catch (error: any) {
      Bugsnag.notify(error);
    }
  }
}
