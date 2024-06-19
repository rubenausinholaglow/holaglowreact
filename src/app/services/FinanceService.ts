import Bugsnag from '@bugsnag/js';
import { CreateTicketRequest } from '@interface/createTicket';
import { PaymentInitResponse } from '@interface/payment';
import { PromoCodeResponse, ValidatePromoCodeRequest, Wallet } from '@interface/wallet';
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
        throw new Error('Error creating Payment');
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

  static async validatePromoCode(validatePromoCode: ValidatePromoCodeRequest): Promise<PromoCodeResponse> {
    try {
      const url = `${FinanceService.getFinanceUrl(false)}Validate`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatePromoCode),
      });

      if (res.ok) {
        return res.json();
      } else {
        return res.json();
      }
    } catch (error: any) {
      Bugsnag.notify(error);
      return {} as PromoCodeResponse;
    }
  }

  static async getWalletBalance(userId: string): Promise<Wallet> {
    try {
      const url = `${FinanceService.getFinanceUrl(false)}BalanceUser?userId=${userId}`;
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
        return {} as Wallet;
      }
    } catch (error: any) {
      Bugsnag.notify(error);
    }
    return {} as Wallet;
  }

  static async getSubscription(userId: string): Promise<boolean> {
    try {
      const url = `${process.env.NEXT_PUBLIC_DERMAFINANCE_API}Subscription?userId=${userId}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        Bugsnag.notify('Error getting subscription ' + res);
        return false;
      }
    } catch (error: any) {
      Bugsnag.notify('Error getting subscription ' + error);
      return false;
    }
  }

  static async cancelSubscription(referenceId: string, status: number) {
    try {
      const url = `${process.env.NEXT_PUBLIC_DERMAFINANCE_API}Subscription`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referenceId: referenceId,
          status: status,
        }),
      });

      if (!res.ok) {
        Bugsnag.notify('Error canceling subscription ' + res);
        throw new Error('Error canceling subscription');
      }
      const data = await res.text();
      return data;
    } catch (error: any) {
      Bugsnag.notify('Error canceling subscription ' + error);
    }
  }

}
