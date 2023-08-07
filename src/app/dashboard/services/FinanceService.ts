import { InitializePayment } from '@interface/initializePayment';

export default class FinanceService {
  static async initializePayment(initializePayment: InitializePayment) {
    console.log(initializePayment);
    try {
      const url = `${process.env.NEXT_PUBLIC_FINANCE_API}Payment`;
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
    } catch (err) {
      return err;
    }
  }
}
