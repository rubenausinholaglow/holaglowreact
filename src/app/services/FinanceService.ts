import Bugsnag from '@bugsnag/js';
import { CreateTicketRequest } from '@interface/createTicket';
import { PaymentInitResponse } from '@interface/payment';
import { CreatePayment, InitializePayment } from 'app/types/initializePayment';

export default class FinanceService {
  static getFinanceUrl(isDerma: boolean): string {
    let url = process.env.NEXT_PUBLIC_FINANCE_API;
    if (
      window.location.href.includes('derma.') ||
      window.location.href.includes('isDerma') ||
      isDerma
    )
      url = process.env.NEXT_PUBLIC_DERMAFINANCE_API;
    return url!;
  }

  static async initializePayment(
    initializePayment: InitializePayment,
    isDerma: boolean
  ): Promise<PaymentInitResponse> {
    try {
      const url = `${FinanceService.getFinanceUrl(isDerma)}External`;
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
        Bugsnag.notify('Error initializePayment ' + res);
        return { id: '', url: '', referenceId: '', embeddedReference: '' };
      }
    } catch (error: any) {
      Bugsnag.notify('Error initializePayment ' + error);
      return { id: '', url: '', referenceId: '', embeddedReference: '' };
    }
  }

  static async createTicket(
    createTicket: CreateTicketRequest,
    isDerma: boolean
  ): Promise<boolean> {
    try {
      const url = `${FinanceService.getFinanceUrl(isDerma)}Ticket`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createTicket),
      });

      if (res.ok) {
        return true;
      } else {
        Bugsnag.notify('Error createTicket ' + res);
        return false;
      }
    } catch (error: any) {
      Bugsnag.notify('Error createTicket ' + error);
      return false;
    }
  }

  static async checkPaymentStatus(
    id: string,
    isDerma: boolean
  ): Promise<boolean> {
    try {
      const url =
        `${FinanceService.getFinanceUrl(isDerma)}External/Status?id=` + id;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        Bugsnag.notify('Error checkPaymentStatus ' + res);
        return false;
      }
    } catch (error: any) {
      Bugsnag.notify('Error checkPaymentStatus ' + error);
      return false;
    }
  }

  static async createPayment(createPayment: CreatePayment, isDerma: boolean) {
    const updatedCreatePayment: CreatePayment = {
      userId: createPayment.userId,
      paymentMethod: createPayment.paymentMethod,
      amount: createPayment.amount * 100,
      referenceId: createPayment.referenceId,
      originOfPayment: createPayment.originOfPayment,
      paymentBank: createPayment.paymentBank,
    };
    try {
      const url = `${FinanceService.getFinanceUrl(isDerma)}Payment`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCreatePayment),
      });

      if (!res.ok) {
        Bugsnag.notify('Error creating Payment ' + res);
        throw new Error('Erro creating Payment');
      }
      const data = await res.text();
      return data;
    } catch (error: any) {
      Bugsnag.notify('Error creating Payment ' + error);
    }
  }

  static async deletePayment(id: string, isDerma: boolean) {
    try {
      const url = `${FinanceService.getFinanceUrl(isDerma)}Payment?id=${id}`;
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

static async validatePromoCode(promoCode: string): Promise<boolean> {
    try {
      const url = `${FinanceService.getFinanceUrl(false)}Validate?code=${promoCode}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        return true;
      } else {
        const errorText = await res.text();
        throw new Error(`Error: ${errorText}`);
      }
    } catch (error: any) {
      Bugsnag.notify(error);
      return false;
    }
  }


}
