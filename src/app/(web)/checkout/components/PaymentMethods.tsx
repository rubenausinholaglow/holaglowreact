'use client';
import { useEffect, useState } from 'react';
import { PaymentBank } from '@interface/payment';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getTotalFromCart } from '@utils/utils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { checkoutPaymentItems } from 'app/(dashboard)/dashboard/(pages)/checkout/components/payment/paymentMethods/PaymentItems';
import { usePaymentList } from 'app/(dashboard)/dashboard/(pages)/checkout/components/payment/payments/usePaymentList';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgArrow, SvgRadioChecked } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

const PAYMENT_ICONS = {
  alma: ['alma.svg'],
  pepper: ['pepper.svg'],
  Efectivo: [],
  creditCard: ['visa.svg', 'mastercard.svg', 'googlepay.svg', 'applepay.svg'],
  direct: [],
};
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export const PaymentMethods = ({ isDerma }: { isDerma: boolean }) => {
  const [activePaymentMethod, setActivePaymentMethod] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const { payment } = useSessionStore(state => state);
  const paymentList = usePaymentList(state => state.paymentRequest);
  const { setActivePayment } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    setActivePaymentMethod('');
  }, [paymentList]);

  useEffect(() => {
    if (payment) {
      setClientSecret(payment.embeddedReference);
      setIsLoadingButton(false);
    }
  }, [payment]);

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
                <Flex
                  className="gap-3  mb-4"
                  onClick={() => {
                    scrollDown();
                    setIsLoadingButton(true);
                    setActivePayment(PaymentBank.Stripe);
                  }}
                >
                  <SvgRadioChecked
                    height={24}
                    width={24}
                    className="shrink-0 hidden group-data-[state=open]:block"
                  />
                  <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 group-data-[state=open]:hidden"></div>
                  <Text>{method.label}</Text>
                </Flex>
                <Flex className="ml-auto gap-2">
                  {PAYMENT_ICONS[method.key as keyof typeof PAYMENT_ICONS] &&
                    PAYMENT_ICONS[method.key as keyof typeof PAYMENT_ICONS].map(
                      (icon: string) => (
                        <Image
                          src={`/images/dashboard/payment/${icon}`}
                          height={32}
                          width={56}
                          key={icon}
                          alt={method.label}
                          className="ml-auto"
                        />
                      )
                    )}
                </Flex>
              </AccordionTrigger>
              <AccordionContent>
                <Flex
                  layout="col-left"
                  className="mt-4 pt-5 border-t border-hg-black w-full"
                >
                  {isLoadingButton && <SvgSpinner height={24} width={24} />}
                  {clientSecret && (
                    <EmbeddedCheckoutProvider
                      stripe={stripePromise}
                      options={{ clientSecret }}
                    >
                      <EmbeddedCheckout className="w-full" />
                    </EmbeddedCheckoutProvider>
                  )}
                </Flex>
              </AccordionContent>
            </AccordionItem>
          ))}
        </AccordionPrimitive.Root>
      )}
    </>
  );
};
