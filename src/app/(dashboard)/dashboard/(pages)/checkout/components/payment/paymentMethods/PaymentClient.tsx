'use client';
import React from 'react';
import { PaymentBank, PaymentMethod } from 'app/types/payment';
import { Flex } from 'designSystem/Layouts/Layouts';

import PaymentInput from './PaymentInput';

interface PaymentProps {
  paymentBank: PaymentBank;
  paymentMethod: PaymentMethod;
  onPaymentClick: () => void;
  balance?: number;
}

export default function PaymentClient({
  paymentBank,
  paymentMethod,
  onPaymentClick,
  balance = 0,
}: PaymentProps) {
  return (
    <Flex layout="col-center" className="relative w-full">
      <PaymentInput
        paymentBank={paymentBank}
        paymentMethod={paymentMethod}
        onButtonClick={onPaymentClick}
        balance={balance}
      ></PaymentInput>
    </Flex>
  );
}
