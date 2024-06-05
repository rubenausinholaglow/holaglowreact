import Bugsnag from "@bugsnag/js";
import { CreatePayment, OriginPayment } from "@interface/initializePayment";
import { PaymentBank, PaymentMethod, PaymentTicketRequest } from "@interface/payment";
import FinanceService from "@services/FinanceService";
import { useGlobalPersistedStore } from "app/stores/globalStore";
import { isEmpty } from "lodash";

import { usePaymentList } from "./usePaymentList";

export const usePaymentHook = () => {
  const { addPaymentToList } = usePaymentList();
  const {user, walletClient, setWalletClient} = useGlobalPersistedStore(state => state);

  const createPayment = async (paymentRequestApi: CreatePayment) : Promise<PaymentTicketRequest> => {
    try {
      const data = await FinanceService.createPayment(paymentRequestApi, false);
      if (data) {
        manageWallet(paymentRequestApi.paymentMethod, paymentRequestApi.amount);
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

  const deletePayment = async (payment: PaymentTicketRequest) : Promise<boolean> => {
        await FinanceService.deletePayment(payment.id, false).then(async data => {
          if(data && !isEmpty(data)) {
            manageWallet(payment.method, payment.amount, false);
            return true;
          }
        });

    return true;
  }

  const manageWallet = async (method: PaymentMethod, amount : number, create = true) : Promise<boolean> => {
    if(method == PaymentMethod.Wallet) {
      const newWallet = {
        user: user!,
        amountBalance: create ? walletClient!.amountBalance - amount : walletClient!.amountBalance + amount,
      };
      setWalletClient(newWallet!);
    }
    return true;
  }

  const paymentPromo = async (userId : string, amountPromo : number) : Promise<boolean> => {
    const paymentPromoRequest: CreatePayment = {
      amount: amountPromo,
      originOfPayment: OriginPayment.dashboard,
      paymentBank: PaymentBank.Points,
      paymentMethod: PaymentMethod.Wallet,
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

  return { createPayment, paymentPromo, deletePayment }
}