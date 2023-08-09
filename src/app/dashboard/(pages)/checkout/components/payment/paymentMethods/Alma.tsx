'use client';
import React from 'react';
import { PaymentBank, PaymentMethod } from '@interface/payment';
import { Flex } from 'components/Layouts/Layouts';

import PaymentInput from './PaymentInput';

export const Alma: React.FC = () => {
  return (
    <Flex layout="col-center" className="relative">
      <PaymentInput
        paymentBank={PaymentBank.Alma}
        paymentMethod={PaymentMethod.Financing}
      ></PaymentInput>
    </Flex>
  );
};
