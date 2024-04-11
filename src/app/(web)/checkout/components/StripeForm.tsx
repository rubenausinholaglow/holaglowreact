'use client';
import React, { useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe, StripePaymentElementOptions } from '@stripe/stripe-js';
import { Button } from 'designSystem/Buttons/Buttons';

export const StripeForm = () => {
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
        return_url: 'http://localhost:3000/checkout/wait',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      //setMessage(error.message);
    } else {
      //setMessage('An unexpected error occurred.');
    }

    setIsLoadingStripe(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button id="submit" type="primary" size="lg" className="mt-4">
        Pago con tarjeta débito/crédito
      </Button>
      {/* Show any error or success messages */}
    </form>
  );
};
