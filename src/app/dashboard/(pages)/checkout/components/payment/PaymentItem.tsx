import { useEffect, useState } from 'react';
import { PaymentProductRequest } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { getPaymentBankText, getPaymentMethodText } from '@utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

import { usePaymentList } from './payments/usePaymentList';

interface Props {
  paymentRequest: PaymentProductRequest;
  color: string;
}

export default function PaymentItem({ paymentRequest, color }: Props) {
  const { removePayment } = usePaymentList();
  const aviableBanks = [1, 4];
  const [enableDelete, setEnableDelete] = useState<boolean>(true);

  if (color === undefined || color === 'undefined') {
    color = 'bg-gray-300';
  }

  useEffect(() => {
    if (color == 'green') setEnableDelete(false);
  }, [color]);

  const deletePayment = async (id: string) => {
    FinanceService.deletePayment(id);
  };

  const handleRemoveAndDelete = (paymentRequest: any) => {
    const id = paymentRequest.id;
    removePayment(paymentRequest);
    deletePayment(id);
  };

  return (
    <li className="text-hg-black">
      <Flex layout="row-left">
        <span className="font-bold mr-1">
          {getPaymentMethodText(paymentRequest.method)}
        </span>
        {paymentRequest.bank ? (
          <span className="font-bold mr-1">
            {getPaymentBankText(paymentRequest.bank)}
          </span>
        ) : null}{' '}
        <span className="font-bold">{`- ${paymentRequest.amount}€`}</span>
        {aviableBanks[paymentRequest.bank] && (
          <div
            key={paymentRequest.id}
            className={`w-4 h-4 rounded-full inline-block ${color} mx-2`}
          ></div>
        )}
        {enableDelete && (
          <Button
            size="sm"
            type="secondary"
            isSubmit
            className="ml-2"
            onClick={() => handleRemoveAndDelete(paymentRequest)}
          >
            Eliminar
          </Button>
        )}
      </Flex>
    </li>
  );
}
