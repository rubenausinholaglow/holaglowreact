import React from 'react';
import { PaymentBank, PaymentMethod } from '@interface/payment';
import { Flex } from 'components/Layouts/Layouts';

import PaymentInput from './PaymentInput';

const CreditCardPayment: React.FC = () => {
  return (
    <Flex layout="col-center" className="relative">
      <PaymentInput
        paymentBank={PaymentBank.None}
        paymentMethod={PaymentMethod.CreditCard}
      ></PaymentInput>
    </Flex>
  );
};

export default CreditCardPayment;
