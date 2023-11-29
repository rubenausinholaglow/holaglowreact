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
import { messageService } from '@services/MessageService';
import { INITIAL_STATE } from '@utils/constants';
import { applyDiscountToCart } from '@utils/utils';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgSpinner } from 'icons/Icons';
import { SvgCheck, SvgRadioChecked, SvgTimer } from 'icons/IconsDs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import PaymentItem, { StatusPayment } from './PaymentItem';
import PaymentClient from './paymentMethods/PaymentClient';
import { paymentItems } from './paymentMethods/PaymentItems';
import PepperWidget from './paymentMethods/PepperWidget';
import { usePaymentList } from './payments/usePaymentList';

export const PaymentModule = () => {
  const router = useRouter();

  const [activePaymentMethod, setActivePaymentMethod] = useState('');
  const [onLoad, setOnLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );
  const [paymentStatus, setPaymentStatus] = useState<
    Record<string, StatusPayment>
  >({});
  const [guidUserId, setguidUserId] = useState<string | ''>('');

  const { cart, totalPrice, priceDiscount, percentageDiscount, manualPrice } =
    useCartStore(state => state);
  const paymentList = usePaymentList(state => state.paymentRequest);
  const { totalAmount } = usePaymentList(state => state);
  const messageSocket = useMessageSocket(state => state);
  const { remoteControl, storedBoxId, storedClinicId } =
    useGlobalPersistedStore(state => state);

  const { addPaymentToList, removePayment } = usePaymentList();

  useEffect(() => {
    setguidUserId(localStorage.getItem('id') || '');
  }, []);

  useEffect(() => {
    const { paymentCreatedMessages, paymentResponseMessages } =
      processPaymentMessages(messageSocket.messageSocket);

    paymentResponseMessages.forEach(handlePaymentResponse);
    paymentCreatedMessages.forEach(handlePaymentCreate);
  }, [messageSocket]);

  useEffect(() => {
    setActivePaymentMethod('');
  }, [paymentList]);

  const processPaymentMessages = (paymentMessages: any) => {
    const paymentCreatedMessages = paymentMessages.filter(
      (x: any) => x.messageType === MessageType.PaymentCreate
    );

    const paymentResponseMessages = paymentMessages.filter(
      (x: any) => x.messageType === MessageType.PaymentResponse
    );

    return { paymentCreatedMessages, paymentResponseMessages };
  };

  const handlePaymentCreate = (message: any) => {
    const localBudgetId = localStorage.getItem('BudgetId');
    if (localBudgetId != message.budgetId) return true;
    const existsPayment = paymentList.find(x => x.id == message.id);
    if (!existsPayment) {
      handleNewPayment(message);
    } else {
      handleExistingPayment(message, existsPayment);
    }
  };

  const handleNewPayment = (message: any): void => {
    const paymentRequest = createPaymentRequest(message);
    if (message.amount > 0) {
      addPaymentToList(paymentRequest);
    }
    messageSocket.removeMessageSocket(message);
  };

  const handleExistingPayment = (message: any, existsPayment: any): void => {
    if (message.amount === 0) {
      message.amount = existsPayment.amount;
      const paymentRequest = createPaymentRequest(message);
      if (existsPayment.amount > 0) {
        removePayment(paymentRequest);
      }
      messageSocket.removeMessageSocket(message);
    }
  };

  const createPaymentRequest = (message: any): any => {
    return {
      amount: message.amount,
      method: message.paymentMethod,
      bank: message.paymentBank,
      paymentReference: message.ReferenceId,
      id: message.id,
    };
  };

  const handlePaymentResponse = (message: any) => {
    const payment = {
      referenceId: message.message.data.id,
      paymentStatus: message.message.data.paymentStatus,
    };

    const existingPayment = paymentList.find(
      x => x.paymentReference === payment.referenceId
    );

    if (existingPayment) {
      switch (payment.paymentStatus) {
        case 2:
          setPaymentStatus(prevPaymentStatus => ({
            ...prevPaymentStatus,
            [existingPayment.id]: StatusPayment.Rejected,
          }));
          break;
        case 1:
          setPaymentStatus(prevPaymentStatus => ({
            ...prevPaymentStatus,
            [existingPayment.id]: StatusPayment.Paid,
          }));
          break;
        case 5:
          setPaymentStatus(prevPaymentStatus => ({
            ...prevPaymentStatus,
            [existingPayment.id]: StatusPayment.FinancingRejected,
          }));
          break;
        case 4:
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
      messageSocket.removeMessageSocket(message);
    }
  };

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
  const missingAmount = Number(cartTotalWithDiscount) - Number(totalAmount);
  const missingAmountFormatted = missingAmount.toFixed(2);

  const sendTicket = async () => {
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
      clinicInfoId: storedClinicId,
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
    if (Number(totalAmount) < Number(cartTotalWithDiscount)) {
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
        if (remoteControl) {
          const message: any = {
            clinicId: storedClinicId,
            BoxId: storedBoxId,
            Page: 'Menu',
          };
          messageService.goToPage(message);
          router.push('/dashboard/remoteControl');
        } else {
          router.push('/dashboard/menu');
        }

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

  const PAYMENT_ICONS = {
    Alma: ['alma.svg'],
    Pepper: ['pepper.svg'],
    Efectivo: [],
    Tarjeta: ['visa.svg', 'mastercard.svg'],
  };

  return (
    <>
      {paymentItems.length > 0 && (
        <Accordion
          value={activePaymentMethod}
          className="flex flex-col gap-8 w-full mb-8"
        >
          {paymentItems.map(method => (
            <AccordionItem
              key={method.key}
              value={method.key}
              className="bg-white py-6 px-8 rounded-xl w-full"
            >
              <AccordionTrigger className="text-left">
                <Flex
                  className="gap-2"
                  onClick={() => handleOnButtonPaymentClick(method.key)}
                >
                  <SvgRadioChecked
                    height={24}
                    width={24}
                    className="shrink-0 hidden group-data-[state=open]:block"
                  />
                  <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 group-data-[state=open]:hidden"></div>
                  <Text>{method.label}</Text>
                  <Flex className="ml-auto gap-2">
                    {PAYMENT_ICONS[
                      method.label as keyof typeof PAYMENT_ICONS
                    ] &&
                      PAYMENT_ICONS[
                        method.label as keyof typeof PAYMENT_ICONS
                      ].map((icon: string) => (
                        <Image
                          src={`/images/dashboard/payment/${icon}`}
                          height={32}
                          width={56}
                          key={icon}
                          alt={method.label}
                          className="ml-auto"
                        />
                      ))}
                  </Flex>
                </Flex>
              </AccordionTrigger>
              <AccordionContent>
                <Flex className="mt-4 pt-5 border-t border-hg-black w-full">
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
                </Flex>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      {paymentList.length > 0 && (
        <Flex
          layout="col-left"
          className="bg-hg-black100 w-full p-6 rounded-xl gap-4 mb-8"
        >
          <Flex className="gap-2">
            <SvgCheck height={24} width={24} className="text-hg-secondary" />
            <Text className="text-hg-secondary">Pagado</Text>
          </Flex>
          {totalAmount > 0 &&
            paymentList?.map(paymentRequest => (
              <PaymentItem
                key={paymentRequest.id}
                paymentRequest={paymentRequest}
                status={paymentStatus[paymentRequest.id]}
              />
            ))}
        </Flex>
      )}

      <Flex className="bg-hg-black100 w-full p-6 rounded-xl gap-2 mb-8">
        <SvgTimer height={20} width={20} className="text-hg-secondary" />
        <Text className="text-hg-secondary">Pendiente</Text>
        <Text className="ml-auto font-semibold text-lg">
          {missingAmountFormatted}€
        </Text>
      </Flex>

      <PepperWidget
        className="mb-8"
        totalPrice={Number(missingAmountFormatted)}
      />

      <Button
        size="lg"
        type="tertiary"
        className="w-full mb-8"
        customStyles="bg-hg-primary"
        onClick={createTicket}
      >
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
