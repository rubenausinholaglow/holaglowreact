import { useEffect } from 'react';
import { User } from '@interface/appointment';
import {
  InitializePayment,
  OriginPayment,
  ProductPaymentRequest,
} from '@interface/initializePayment';
import { PaymentBank } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';

export const usePayments = () => {
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { setPayment, payment } = useSessionStore(state => state);

  const { cart } = useCartStore(state => state);
  let useNewTab = false;
  const initializePayment = async (
    paymentBank: PaymentBank,
    createdUser: User,
    newTab = false,
    price = 4900
  ) => {
    useNewTab = newTab ?? false;

    const data: InitializePayment = {
      amount: Number(price),
      installments: 1,
      userId: createdUser?.id || '',
      paymentBank: paymentBank,
      productPaymentRequest: [],
      originPayment: OriginPayment.web,
    };
    cart.forEach(product => {
      if (
        product.id.toUpperCase() === process.env.NEXT_PUBLIC_CITA_PREVIA_ID ||
        product.id.toUpperCase() === process.env.NEXT_PUBLIC_CITA_DERMA
      ) {
        const productPayment: ProductPaymentRequest = {
          name: product.title,
          price: product.price.toString(),
          quantity: '1',
          id: product.id.toUpperCase(),
        };
        data.productPaymentRequest?.push(productPayment);
      } else {
        const matchingProduct = stateProducts.find(x => x.id === product.id);

        if (matchingProduct) {
          const productPayment: ProductPaymentRequest = {
            name: matchingProduct.title,
            price: product.price.toString(),
            quantity: '1',
            id: matchingProduct.id,
          };
          data.productPaymentRequest?.push(productPayment);
        }
      }
    });

    try {
      const paymentResponse = await FinanceService.initializePayment(data);
      setPayment(paymentResponse);
    } catch (error) {
      console.error('Error initializing payment:', error);
    }
  };

  useEffect(() => {
    if (payment && payment.url) {
      if (useNewTab) {
        openWindow(payment.url);
      } else window.document.location.href = payment.url;
    }
  }, [payment]);

  const openWindow = (url: string) => {
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return initializePayment;
};
