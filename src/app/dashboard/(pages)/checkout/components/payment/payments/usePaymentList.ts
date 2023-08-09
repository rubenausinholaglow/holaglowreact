import { PaymentProductRequest } from '@interface/payment';
import {
  INITIAL_STATE_PAYMENT,
  PaymentActions,
  PaymentList,
} from '@interface/paymentList';
import { v4 as createUniqueId } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePaymentList = create(
  persist<PaymentList & PaymentActions>(
    (set, get) => ({
      paymentRequest: [],
      totalAmount: INITIAL_STATE_PAYMENT.totalAmount,
      addPaymentToList: (newPayment: PaymentProductRequest) => {
        newPayment.id = createUniqueId();
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
