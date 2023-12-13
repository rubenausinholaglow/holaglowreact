import { PaymentProductRequest } from 'app/types/payment';
import {
  INITIAL_STATE_PAYMENT,
  PaymentActions,
  PaymentList,
} from 'app/types/paymentList';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePaymentList = create(
  persist<PaymentList & PaymentActions>(
    (set, get) => ({
      paymentRequest: [],
      totalAmount: INITIAL_STATE_PAYMENT.totalAmount,
      addPaymentToList: (newPayment: PaymentProductRequest) => {
        const updatedPaymentRequest = [...get().paymentRequest, newPayment];

        set(state => ({
          paymentRequest: updatedPaymentRequest,
          totalAmount: state.totalAmount + newPayment.amount,
        }));
      },
      removePayment: (payment: PaymentProductRequest) => {
        set(state => ({
          paymentRequest: state.paymentRequest.filter(
            item => item.id !== payment.id
          ),

          totalAmount: state.totalAmount - payment.amount,
        }));
      },
    }),
    {
      name: 'paymeny-list',
    }
  )
);
