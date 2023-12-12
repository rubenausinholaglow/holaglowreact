'use client';
import React from 'react';
import { PaymentBank, PaymentMethod } from '@interface/payment';
import { Flex } from 'designSystem/Layouts/Layouts';

import PaymentInput from './PaymentInput';

interface PaymentProps {
  paymentBank: PaymentBank;
  paymentMethod: PaymentMethod;
  onPaymentClick: () => void;
}

export default function PaymentClient({
  paymentBank,
  paymentMethod,
  onPaymentClick,
}: PaymentProps) {
  return (
    <Flex layout="col-center" className="relative w-full">
      <PaymentInput
        paymentBank={paymentBank}
        paymentMethod={paymentMethod}
        onButtonClick={onPaymentClick}
      ></PaymentInput>
    </Flex>
  );
}
