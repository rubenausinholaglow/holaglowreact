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
  const { dermaProducts, stateProducts } = useGlobalPersistedStore(
    state => state
  );
  const { setPayment, payment } = useSessionStore(state => state);

  const { cart } = useCartStore(state => state);
  let useNewTab = false;
  let useRedirect = false;
  const initializePayment = async (
    paymentBank: PaymentBank,
    createdUser: User,
    newTab = false,
    price = 4900,
    isDerma = false,
    installments = 1,
    redirect = true,
    deferredDays: number | undefined = undefined
  ) => {
    useNewTab = newTab ?? false;
    useRedirect = redirect ?? true;
    if (PaymentBank.Alma == paymentBank) useRedirect = true;
    const data: InitializePayment = {
      amount: Number(price),
      installments: installments,
      userId: createdUser?.id || '',
      paymentBank: paymentBank,
      productPaymentRequest: [],
      originPayment: OriginPayment.web,
      deferred_Days: deferredDays,
    };
    cart.forEach(product => {
      if (
        product.id.toUpperCase() ===
          process.env.NEXT_PUBLIC_CITA_PREVIA_ID?.toUpperCase() ||
        product.id.toUpperCase() ===
          process.env.NEXT_PUBLIC_CITA_DERMA?.toUpperCase()
      ) {
        const productPayment: ProductPaymentRequest = {
          name: product.title,
          price: product.price.toString(),
          quantity: '1',
          id: product.id.toUpperCase(),
        };
        data.productPaymentRequest?.push(productPayment);
      } else {
        const matchingProduct = isDerma
          ? dermaProducts.find(x => x.id === product.id)
          : stateProducts.find(x => x.id === product.id);

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
      const paymentResponse = await FinanceService.initializePayment(
        data,
        isDerma
      );
      setPayment(paymentResponse);
      return paymentResponse.id;
    } catch (error) {
      console.error('Error initializing payment:', error);
    }
  };

  useEffect(() => {
    if (
      payment &&
      payment.url &&
      (useRedirect || payment.referenceId.indexOf('payment_') == 0)
    ) {
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
