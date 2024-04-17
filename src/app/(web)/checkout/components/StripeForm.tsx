'use client';
import React, { useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import { useRegistration } from '@utils/userUtils';
import { SvgSpinner } from 'app/icons/Icons';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';

export const StripeForm = ({
  isDerma = false,
  setShowLoader,
}: {
  isDerma: boolean;
  setShowLoader: (value: boolean) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };
  const [isLoadingStripe, setIsLoadingStripe] = useState<boolean>(false);
  const [errorMessage, setMessage] = useState<string>('');

  const { client } = useSessionStore(state => state);
  const registerUser = useRegistration(client, false, false, false);
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    if (client) {
      await registerUser(client, false, false, false);
    }
    setIsLoadingStripe(true);
    let url = process.env.NEXT_PUBLIC_STRIPE_CLINICS_RETURN_URL!;
    if (isDerma) url = process.env.NEXT_PUBLIC_STRIPE_DERMA_RETURN_URL!;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: url,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage('Datos de tarjeta incorrectos, por favor revisa los datos');
    } else {
      setMessage('Error inesperado, por favor intentalo de nuevo.');
    }

    setIsLoadingStripe(false);
  };

  const handlePaymentElementReady = () => {
    console.log('Payment element is ready!');
    // You can perform additional actions here once the payment element is ready
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
        onReady={() => setShowLoader(false)}
      />
      <Button
        id="submit"
        type={isDerma ? 'derma' : 'primary'}
        size="lg"
        className="mt-4"
        onClick={handleSubmit}
      >
        {isLoadingStripe ? (
          <SvgSpinner className="min-w-16" />
        ) : (
          'Pago con tarjeta débito/crédito'
        )}
      </Button>
      {errorMessage && (
        <p className="text-hg-error text-sm p-2">{errorMessage}</p>
      )}
    </form>
  );
};
