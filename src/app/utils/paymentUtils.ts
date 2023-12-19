import {
  InitializePayment,
  ProductPaymentRequest,
} from '@interface/initializePayment';
import { PaymentBank } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { useGlobalPersistedStore } from 'app/stores/globalStore';

export const usePayments = () => {
  const { user, stateProducts } = useGlobalPersistedStore(state => state);

  const { cart } = useCartStore(state => state);

  const initializePayment = async (paymentBank: PaymentBank) => {
    if (!user) return;
    const resultValue = 4900;

    const data: InitializePayment = {
      amount: Number(resultValue),
      installments: 1,
      userId: user?.id || '',
      paymentBank: paymentBank,
      productPaymentRequest: [],
    };

    cart.forEach(product => {
      if (product.id.toUpperCase() === process.env.NEXT_PUBLIC_CITA_PREVIA_ID) {
        const productPayment: ProductPaymentRequest = {
          name: product.title,
          price: product.price.toString(),
          quantity: '1',
          id: process.env.NEXT_PUBLIC_CITA_PREVIA_ID,
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
      const x = await FinanceService.initializePayment(data);
      if (x) {
        openWindow(x.url);
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
    }
  };

  const openWindow = (url: string) => {
    const newWindow = window.open(url, '');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return initializePayment;
};
