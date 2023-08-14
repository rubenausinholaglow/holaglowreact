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
    try {
      const url = `${process.env.NEXT_PUBLIC_FINANCE_API}Payment`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createPayment),
      });

      if (res.ok) {
        const data = await res.text();
        return data;
      } else {
        return '';
      }
    } catch (error: any) {
      console.log(error);
    }
  }
}
