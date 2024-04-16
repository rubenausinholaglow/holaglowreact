'use client';
import React, { useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoadingStripe(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_STRIPE_RETURN_URL!,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      //setMessage(error.message);
    } else {
      //setMessage('An unexpected error occurred.');
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
        Pago con tarjeta débito/crédito
      </Button>
      {/* Show any error or success messages */}
    </form>
  );
};
