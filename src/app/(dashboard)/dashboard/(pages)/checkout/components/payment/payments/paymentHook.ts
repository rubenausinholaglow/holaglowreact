import Bugsnag from "@bugsnag/js";
import { CreatePayment, OriginPayment } from "@interface/initializePayment";
import { PaymentBank, PaymentMethod, PaymentTicketRequest } from "@interface/payment";
import FinanceService from "@services/FinanceService";

import { usePaymentList } from "./usePaymentList";

export const usePaymentHook = () => {
  const { addPaymentToList } = usePaymentList();

  const createPayment = async (paymentRequestApi: CreatePayment) : Promise<PaymentTicketRequest> => {
    try {
      const data = await FinanceService.createPayment(paymentRequestApi, false);
      if (data) {
        const id: string = data as string;
        const paymentRequest : PaymentTicketRequest = {
          amount: paymentRequestApi.amount,
          method: paymentRequestApi.paymentMethod,
          bank: paymentRequestApi.paymentBank,
          paymentReference: paymentRequestApi.referenceId,
          id: id,
        };
        addPaymentToList(paymentRequest);
        return paymentRequest;
      } else {
        return {} as PaymentTicketRequest;
      }
    } catch (error) {
      return {} as PaymentTicketRequest;
    }
  };

  const paymentPromo = async (userId : string, amountPromo : number) : Promise<boolean> => {
    const paymentPromoRequest: CreatePayment = {
      amount: amountPromo,
      originOfPayment: OriginPayment.dashboard,
      paymentBank: PaymentBank.Points,
      paymentMethod: PaymentMethod.Promo,
      userId: userId || '',
      referenceId: '',
    };

    await createPayment(paymentPromoRequest)
      .then(response => {
          return true;
      })
      .catch(error => {
        Bugsnag.notify('Error creating payment promo ' + error);
      });

      return false;
  };

  return { createPayment, paymentPromo }
}