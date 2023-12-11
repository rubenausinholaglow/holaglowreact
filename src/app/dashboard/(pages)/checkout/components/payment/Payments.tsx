'use client';
import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import Notification from '@components/ui/Notification';
import { useMessageSocket } from '@components/useMessageSocket';
import { StatusBudget, TicketBudget } from '@interface/budget';
import { MessageType } from '@interface/messageSocket';
import { INITIAL_STATE_PAYMENT } from '@interface/paymentList';
import { Ticket } from '@interface/ticket';
import { budgetService } from '@services/BudgetService';
import { INITIAL_STATE } from '@utils/constants';
import { applyDiscountToCart } from '@utils/utils';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgSpinner } from 'icons/Icons';
import { useRouter } from 'next/navigation';

import PaymentItem, { StatusPayment } from './PaymentItem';
import PaymentClient from './paymentMethods/PaymentClient';
import { paymentItems } from './paymentMethods/PaymentItems';
import { usePaymentList } from './payments/usePaymentList';

export const PaymentModule = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState('');
  const [onLoad, setOnLoad] = useState(false);
  const cart = useCartStore(state => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const paymentList = usePaymentList(state => state.paymentRequest);
  const totalPrice = useCartStore(state => state.totalPrice);
  const totalAmount = usePaymentList(state => state.totalAmount);

  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);
  const manualPrice = useCartStore(state => state.manualPrice);
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );
  const [guidUserId, setguidUserId] = useState<string | ''>('');
  const [paymentStatus, setPaymentStatus] = useState<
    Record<string, StatusPayment>
  >({});
  const messageSocket = useMessageSocket(state => state);

  useEffect(() => {
    setguidUserId(localStorage.getItem('id') || '');
  }, []);

  useEffect(() => {
    /*const existMessagePaymentResponse = messageSocket.messageSocket.filter(
      x => x.messageType == MessageType.PaymentResponse
    );
    if (existMessagePaymentResponse.length > 0) {
      const finalMessage = existMessagePaymentResponse[0].message;
      const [, paymentReferenceId, PaymentStatus] = finalMessage.split('/');
      const existingPayment = paymentList.find(
        x => x.paymentReference === paymentReferenceId
      );
      if (existingPayment) {
        switch (PaymentStatus) {
          case 'Rejected':
            setPaymentStatus(prevPaymentStatus => ({
              ...prevPaymentStatus,
              [existingPayment.id]: StatusPayment.Rejected,
            }));
            break;
          case 'Paid':
            setPaymentStatus(prevPaymentStatus => ({
              ...prevPaymentStatus,
              [existingPayment.id]: StatusPayment.Paid,
            }));
            break;
          case 'FinancingRejected':
            setPaymentStatus(prevPaymentStatus => ({
              ...prevPaymentStatus,
              [existingPayment.id]: StatusPayment.FinancingRejected,
            }));
            break;
          case 'FinancingAccepted':
            setPaymentStatus(prevPaymentStatus => ({
              ...prevPaymentStatus,
              [existingPayment.id]: StatusPayment.FinancingAccepted,
            }));
            break;
          default:
            setPaymentStatus(prevPaymentStatus => ({
              ...prevPaymentStatus,
              [existingPayment.id]: StatusPayment.Waiting,
            }));
        }
        messageSocket.removeMessageSocket(existMessagePaymentResponse[0]);
      }
    }*/
  }, [messageSocket]);

  let productsPriceTotalWithDiscounts = 0;

  if (cart) {
    productsPriceTotalWithDiscounts = cart.reduce(
      (acc, product) => acc + Number(product.priceWithDiscount),
      0
    );
  }
  const cartTotalWithDiscount = applyDiscountToCart(
    percentageDiscount,
    priceDiscount,
    manualPrice,
    productsPriceTotalWithDiscounts
  );
  const missingAmount = cartTotalWithDiscount - totalAmount;
  const missingAmountFormatted = missingAmount.toFixed(2);

  const sendTicket = async () => {
    const GuidClinicId = localStorage.getItem('ClinicId') || '';
    const GuidProfessional = localStorage.getItem('ClinicProfessionalId') || '';
    const BudgetId = localStorage.getItem('BudgetId') || '';
    const ClinicFlowwwId = localStorage.getItem('ClinicFlowwwId') || '';
    const ClientFlowToken = localStorage.getItem('flowwwToken') || '';

    const finalBudget: TicketBudget = {
      id: BudgetId,
      discountAmount: '',
      userId: guidUserId,
      discountCode: '',
      priceDiscount: 0,
      percentageDiscount: 0,
      manualPrice: 0,
      totalPrice: totalPrice,
      totalPriceWithIva: totalPrice,
      clinicInfoId: GuidClinicId,
      FlowwwId: '',
      referenceId: '',
      statusBudget: StatusBudget.Open,
      professionalId: GuidProfessional,
      products: cart.map(CartItem => ({
        productId: CartItem.id,
        price: CartItem.price,
        percentageDiscount: CartItem.percentageDiscount,
        priceDiscount: CartItem.priceDiscount,
        name: CartItem.description,
      })),
    };

    const ticket: Ticket = {
      promoCode: '',
      reference: '',
      userId: guidUserId,
      clientFlowwwToken: ClientFlowToken,
      clinicFlowwwId: ClinicFlowwwId,
      professional: '',
      budget: finalBudget,
      paymentProductRequest: paymentList.map(payItem => ({
        amount: payItem.amount,
        bank: payItem.bank,
        method: payItem.method,
        paymentReference: payItem.paymentReference,
        id: payItem.id,
      })),
    };
    try {
      return await budgetService.createTicket(ticket);
    } catch (error: any) {
      Bugsnag.notify(error);
    }
  };

  const handleOnButtonPaymentClick = (paymentKey: any) => {
    setOnLoad(true);
    if (activePaymentMethod === paymentKey) {
      setOnLoad(false);
      setActivePaymentMethod('');
    } else {
      setActivePaymentMethod(paymentKey);
    }
  };

  const createTicket = async () => {
    if (totalAmount < cartTotalWithDiscount) {
      alert('Hay cantidad pendiente de pagar');
      return;
    }
    setIsLoading(true);
    try {
      const result = await sendTicket();
      if (result) {
        localStorage.removeItem('BudgetId');
        usePaymentList.setState(INITIAL_STATE_PAYMENT);
        useCartStore.setState(INITIAL_STATE);
        router.push('/dashboard/menu');
        setMessageNotification('Ticket Creado Correctamente');
      } else {
        //TODO - ALERT MESSAGE
      }
    } catch (error: any) {
      setIsLoading(false);
      Bugsnag.notify(error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <Flex className="gap-2 flex-wrap">
        {paymentItems.map(method => (
          <Button
            size="sm"
            key={method.key}
            type="tertiary"
            className={
              onLoad && activePaymentMethod != method.key
                ? 'opacity-25'
                : 'opacity-100'
            }
            target="_blank"
            onClick={() => handleOnButtonPaymentClick(method.key)}
          >
            {method.label}
          </Button>
        ))}
      </Flex>

      {paymentItems.map(method =>
        activePaymentMethod === method.key ? (
          <PaymentClient
            key={method.key}
            paymentBank={method.paymentBank}
            paymentMethod={method.paymentMethod}
            onPaymentClick={() => {
              setActivePaymentMethod('');
              setOnLoad(false);
            }}
          ></PaymentClient>
        ) : null
      )}

      <Flex layout="col-left" className="bg-white rounded-xl p-4 w-full mt-8">
        {totalAmount > 0 && (
          <ul>
            {paymentList?.map(paymentRequest => (
              <PaymentItem
                key={paymentRequest.id}
                paymentRequest={paymentRequest}
                status={paymentStatus[paymentRequest.id]}
              />
            ))}
          </ul>
        )}
        {totalAmount > 0 && (
          <Text className="font-bold pt-4 mt-4 border-t border-hg-black300 w-full">
            Total Pagado: {totalAmount.toFixed(2)}€
          </Text>
        )}
        <Text size="sm" className="text-hg-black500">
          Faltan: {missingAmountFormatted}€
        </Text>
      </Flex>
      <Button size="lg" className="w-full mt-4" onClick={createTicket}>
        {' '}
        {isLoading ? <SvgSpinner height={24} width={24} /> : 'Generar Tiquet'}
      </Button>
      {messageNotification ? (
        <Notification message={messageNotification} />
      ) : (
        <></>
      )}
    </>
  );
};
