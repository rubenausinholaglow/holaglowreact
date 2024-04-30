'use client';
import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Client } from '@interface/client';
import { PaymentBank } from '@interface/payment';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { Elements } from '@stripe/react-stripe-js';
import {
  Appearance,
  loadStripe,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { HOLAGLOW_COLORS } from '@utils/colors';
import { usePayments } from '@utils/paymentUtils';
import { useRegistration } from '@utils/userUtils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import {
  checkoutPaymentItems,
  financialTimes,
} from 'app/(dashboard)/dashboard/(pages)/checkout/components/payment/paymentMethods/PaymentItems';
import { usePaymentList } from 'app/(dashboard)/dashboard/(pages)/checkout/components/payment/payments/usePaymentList';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
import { gtUltra, poppins } from 'app/fonts';
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
import { isEmpty } from 'lodash';
import Image from 'next/image';

import { StripeForm } from './StripeForm';

const PAYMENT_ICONS = {
  alma: ['alma.svg'],
  almadeferred: ['alma.svg'],
  pepper: ['pepper.svg'],
  Efectivo: [],
  creditCard: ['visa.svg', 'mastercard.svg', 'googlepay.svg', 'applepay.svg'],
  direct: [],
};
const paymentElementOptions: StripePaymentElementOptions = {
  layout: 'tabs',
};
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export const PaymentMethods = ({
  isDerma = false,
  client,
}: {
  isDerma: boolean;
  client?: Client;
}) => {
  const [showLoader, setShowLoader] = useState(true);
  const [activePaymentMethod, setActivePaymentMethod] = useState(
    isDerma ? 'creditCard' : ''
  );
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingAlmaDeferred, setIsLoadingAlmaDeferred] = useState(false);
  const [showAlmaButtons, setShowAlmaButtons] = useState(false);

  const [clientSecret, setClientSecret] = useState('');
  const [isLoadingStripe, setIsLoadingStripe] = useState<boolean>(false);
  const [isLoadingKey, setIsLoadingKey] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { payment } = useSessionStore(state => state);
  const paymentList = usePaymentList(state => state.paymentRequest);
  const { setActivePayment } = useGlobalPersistedStore(state => state);
  const { selectedTreatments } = useSessionStore(state => state);
  const initializePayment = usePayments();
  const registerUser = useRegistration(client!, false, false, false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const { cart } = useCartStore(state => state);

  useEffect(() => {
    setActivePaymentMethod(isDerma ? 'creditCard' : '');
  }, [paymentList]);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(undefined);
    }, 6000);
  }, [errorMessage]);

  useEffect(() => {
    if (payment) {
      setIsLoadingButton(false);
      if (!isEmpty(payment.embeddedReference))
        setClientSecret(payment.embeddedReference);
    }
  }, [payment]);

  function scrollDown() {
    /*setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 250);*/
  }

  const handlePaymentClick = async (
    activePayment: PaymentBank,
    installments: number,
    deferredDays: number | undefined
  ) => {
    if (isLoadingPayment()) return;
    setIsLoadingKey({
      ...isLoadingKey,
      [installments]: true,
    });
    if (deferredDays) setIsLoadingAlmaDeferred(true);
    if (
      activePayment != PaymentBank.None &&
      cart.length > 0 &&
      client!.email != ''
    ) {
      const finalPrice = (selectedTreatments[0].price * 100).toFixed(0);
      const createdUser = await registerUser(client!, false, false, false);
      await initializePayment(
        activePayment,
        createdUser!,
        false,
        Number(finalPrice),
        isDerma,
        installments,
        true,
        deferredDays
      )
        .then(x => {
          if (x == undefined) {
            setError(installments);
          }
        })
        .catch(err => {
          setError(installments);
          Bugsnag.notify('Error Alma initializa ' + err);
        });
    }
  };

  function setError(key: number) {
    setErrorMessage('Error inizializando pago, intentelo más tarde');
    setIsLoadingKey({
      ...isLoadingKey,
      [key]: false,
    });
  }
  const appearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: HOLAGLOW_COLORS.black,
      colorDanger: HOLAGLOW_COLORS.error,
      fontFamily: 'poppins',
      spacingUnit: '4px',
      borderRadius: '12px',
      // See all possible variables below
    },
    rules: {
      '.Input': {
        border: `1px solid ${HOLAGLOW_COLORS.black}`,
        paddingLeft: '16px',
        marginLeft: '3px',
        marginBottom: '5px',
        marginRight: '3px',
        paddingRight: '16px',
      },
      '.Tab': {
        border: `1px solid ${HOLAGLOW_COLORS.black}`,
        paddingLeft: '16px',
        marginLeft: '3px !important',
        marginRight: '3px',
        paddingRight: '16px',
        backgroundColor: '#F5F0ED',
      },
      '.TabIcon--selected': {
        fill: '#ffffff',
      },
      '.Tab--selected:hover': {
        color: '#ffffff',
        backgroundColor: '#112959',
      },
      '.Tab--selected': {
        color: '#ffffff',
        backgroundColor: '#112959',
      },
    },
  };

  const fonts = [
    {
      cssSrc: 'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
    },
  ];

  function isLoadingPayment() {
    return Object.values(isLoadingKey).some(value => value) ? true : false;
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
            setShowLoader(true);
            setActivePaymentMethod(activePaymentMethod);
          }}
        >
          {checkoutPaymentItems.map(method =>
            method.key === 'alma' || method.key === 'almadeferred' ? null : (
              <AccordionItem
                key={method.key}
                value={method.key}
                className="bg-derma-secondary400/50 py-6 px-8 rounded-xl w-full"
              >
                <AccordionTrigger className="text-left">
                  <Flex
                    className="gap-4"
                    onClick={() => {
                      scrollDown();
                      if (method.key == 'creditCard') {
                        setIsLoadingButton(!isLoadingButton);
                        setActivePayment(PaymentBank.Stripe);
                      }
                      if (method.key == 'alma') {
                        setShowAlmaButtons(true);
                      }
                    }}
                  >
                    <SvgRadioChecked
                      height={24}
                      width={24}
                      className="shrink-0 hidden group-data-[state=open]:block"
                    />
                    <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 group-data-[state=open]:hidden"></div>
                    {method.label.length > 0 && (
                      <Text>
                        {method.label.replace('{0}', isDerma ? '99' : '49')}
                      </Text>
                    )}
                    <Flex className="gap-2">
                      {PAYMENT_ICONS[
                        method.key as keyof typeof PAYMENT_ICONS
                      ] &&
                        PAYMENT_ICONS[
                          method.key as keyof typeof PAYMENT_ICONS
                        ].map((icon: string) => (
                          <Image
                            src={`/images/dashboard/payment/${icon}`}
                            height={32}
                            width={56}
                            key={icon}
                            alt={method.label}
                          />
                        ))}
                    </Flex>
                  </Flex>
                </AccordionTrigger>
                <AccordionContent>
                  <Flex
                    layout="col-left"
                    className="mt-4 pt-5 border-t border-hg-black w-full min-h-48 relative"
                  >
                    {showLoader && method.key == 'creditCard' && (
                      <FullScreenLoading isDerma={isDerma} />
                    )}

                    {showAlmaButtons && (
                      <>
                        <Flex className="w-full" layout="col-center">
                          {method.key == 'alma' ? (
                            <>
                              {financialTimes.map(financialTime => (
                                <div key={financialTime.key}>
                                  <Button
                                    id={isDerma ? 'tmevent_derma_step6' : ''}
                                    className="self-end"
                                    type={isDerma ? 'derma' : 'tertiary'}
                                    customStyles={`gap-2 mb-4 ${
                                      isDerma ? '' : 'bg-hg-primary'
                                    }`}
                                    onClick={() => {
                                      handlePaymentClick(
                                        PaymentBank.Alma,
                                        parseInt(financialTime.key),
                                        undefined
                                      );
                                    }}
                                  >
                                    {isLoadingKey[financialTime.key] ? (
                                      <Flex className="w-20 justify-center">
                                        <SvgSpinner height={24} width={24} />
                                      </Flex>
                                    ) : (
                                      <>
                                        {financialTime.label}
                                        <SvgArrow height={16} width={16} />
                                      </>
                                    )}
                                  </Button>
                                </div>
                              ))}
                            </>
                          ) : (
                            <></>
                          )}
                        </Flex>
                      </>
                    )}
                    {method.key == 'almadeferred' ? (
                      <Flex className="w-full" layout="col-center">
                        <div>
                          <Button
                            id={isDerma ? 'tmevent_derma_step6' : ''}
                            className="self-end"
                            type={isDerma ? 'derma' : 'tertiary'}
                            customStyles={`gap-2 mb-4 ${
                              isDerma ? '' : 'bg-hg-primary'
                            }`}
                            onClick={() => {
                              handlePaymentClick(PaymentBank.Alma, 1, 15);
                            }}
                          >
                            {isLoadingAlmaDeferred ? (
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
                        </div>
                      </Flex>
                    ) : (
                      <></>
                    )}
                    {clientSecret && method.key == 'creditCard' && (
                      <Flex className="w-[99%]">
                        <Elements
                          stripe={stripePromise}
                          options={{
                            clientSecret,
                            appearance,
                            fonts,
                            locale: 'es',
                            loader: 'always',
                          }}
                        >
                          <StripeForm
                            isDerma={isDerma}
                            setShowLoader={setShowLoader}
                          />
                        </Elements>
                      </Flex>
                    )}
                    {errorMessage && (
                      <p className="text-red-600"> {errorMessage} </p>
                    )}
                  </Flex>
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </AccordionPrimitive.Root>
      )}
    </>
  );
};
