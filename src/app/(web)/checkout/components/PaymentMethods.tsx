'use client';
import { useEffect, useState } from 'react';
import { Client } from '@bugsnag/js';
import { PaymentBank } from '@interface/payment';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import PaymentItem, {
  StatusPayment,
} from 'app/(dashboard)/dashboard/(pages)/checkout/components/payment/PaymentItem';
import { checkoutPaymentItems } from 'app/(dashboard)/dashboard/(pages)/checkout/components/payment/paymentMethods/PaymentItems';
import { usePaymentList } from 'app/(dashboard)/dashboard/(pages)/checkout/components/payment/payments/usePaymentList';
import { useMessageSocket } from 'app/(dashboard)/dashboard/components/useMessageSocket';
import { SvgArrow, SvgCheck, SvgRadioChecked } from 'app/icons/IconsDs';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { MessageType } from 'app/types/messageSocket';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

interface PaymentMethodsProps {
  client?: Client;
}
export const PaymentMethods: React.FC<PaymentMethodsProps> = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<
    Record<string, StatusPayment>
  >({});

  const { cart } = useCartStore(state => state);
  const paymentList = usePaymentList(state => state.paymentRequest);
  const { totalAmount } = usePaymentList(state => state);
  const messageSocket = useMessageSocket(state => state);
  const { storedBudgetId, setActivePayment } = useGlobalPersistedStore(
    state => state
  );

  const { addPaymentToList, removePayment } = usePaymentList();
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
    if (storedBudgetId != message.budgetId) return true;
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

  const PAYMENT_ICONS = {
    Alma: ['alma.svg'],
    Pepper: ['pepper.svg'],
    Efectivo: [],
    Tarjeta: ['visa.svg', 'mastercard.svg'],
  };

  function scrollDown() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 250);
  }

  return (
    <>
      {checkoutPaymentItems.length > 0 && (
        <AccordionPrimitive.Root
          className="flex flex-col gap-8 w-full mb-8"
          collapsible
          value={activePaymentMethod}
          type="single"
          onValueChange={(activePaymentMethod: string) => {
            setActivePaymentMethod(activePaymentMethod);
          }}
        >
          {checkoutPaymentItems.map(method => (
            <AccordionItem
              key={method.key}
              value={method.key}
              className="bg-white py-6 px-8 rounded-xl w-full"
            >
              <AccordionTrigger className="text-left">
                <Flex className="gap-2" onClick={() => scrollDown()}>
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
                <Flex
                  layout="col-left"
                  className="mt-4 pt-5 border-t border-hg-black w-full"
                >
                  <Text className="mb-4">
                    Serás redirigido/a a la pasarela para efectuar el pago.
                  </Text>

                  <Flex className="justify-between w-full bg-hg-black50 p-4 rounded-xl mb-8">
                    <Text>Total pago</Text>
                    <Text>49,00€</Text>
                  </Flex>

                  <Button
                    className="self-end"
                    type="tertiary"
                    customStyles="bg-hg-primary gap-2"
                    onClick={() => {
                      setActivePayment(PaymentBank.CreditCard);
                    }}
                  >
                    Continuar
                    <SvgArrow height={16} width={16} />
                  </Button>
                </Flex>
              </AccordionContent>
            </AccordionItem>
          ))}
        </AccordionPrimitive.Root>
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
                paymentTicketRequest={paymentRequest}
                status={paymentStatus[paymentRequest.id]}
              />
            ))}
        </Flex>
      )}
    </>
  );
};
