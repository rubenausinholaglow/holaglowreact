'use client';
import { useEffect, useState } from 'react';
import { Client } from '@interface/client';
import { PaymentBank } from '@interface/payment';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { checkoutPaymentItems } from 'app/(dashboard)/dashboard/(pages)/checkout/components/payment/paymentMethods/PaymentItems';
import { usePaymentList } from 'app/(dashboard)/dashboard/(pages)/checkout/components/payment/payments/usePaymentList';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgArrow, SvgRadioChecked } from 'app/icons/IconsDs';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
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
  creditCard: ['visa.svg', 'mastercard.svg'],
  direct: ['googlepay.svg', 'applepay.svg'],
};

export const PaymentMethods = ({ isDerma }: { isDerma: boolean }) => {
  const [activePaymentMethod, setActivePaymentMethod] = useState('');
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const paymentList = usePaymentList(state => state.paymentRequest);
  const { setActivePayment } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    setActivePaymentMethod('');
  }, [paymentList]);

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
                    {PAYMENT_ICONS[method.key as keyof typeof PAYMENT_ICONS] &&
                      PAYMENT_ICONS[
                        method.key as keyof typeof PAYMENT_ICONS
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
                    <Text>{isDerma ? '59,00€' : '49,00€'}</Text>
                  </Flex>

                  <Button
                    className="self-end"
                    type="tertiary"
                    customStyles={`gap-2 ${
                      isDerma
                        ? 'bg-derma-primary border-none text-derma-primary300'
                        : 'bg-hg-primary '
                    }`}
                    onClick={() => {
                      setIsLoadingButton(true);
                      setActivePayment(PaymentBank.Stripe);
                    }}
                  >
                    {isLoadingButton ? (
                      <Flex className="w-20 justify-center">
                        <SvgSpinner height={24} width={24} />
                      </Flex>
                    ) : (
                      <>
                        Continuar
                        <SvgArrow height={16} width={16} />
                      </>
                    )}
                  </Button>
                </Flex>
              </AccordionContent>
            </AccordionItem>
          ))}
        </AccordionPrimitive.Root>
      )}
    </>
  );
};
