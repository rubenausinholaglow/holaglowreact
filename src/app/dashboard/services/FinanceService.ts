import { InitializePayment } from "@interface/initializePayment";

export default class FinanceService {
  
  static async initializePayment(initializePayment: InitializePayment) {
      try {
          const url = `${process.env.NEXT_PUBLIC_FINANCE_API}Product`
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
          },
            body: JSON.stringify(initializePayment),
          });
          console.log(res);
          if (res.ok) {
              const data = await res.json();
              return data;
          } else {
              return '';
          }
      } catch (err) { return err; }
  }
  
}