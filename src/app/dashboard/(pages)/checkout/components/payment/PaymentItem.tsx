import { PaymentProductRequest } from '@interface/payment';
import { getPaymentBankText, getPaymentMethodText } from '@utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

import { usePaymentList } from './payments/usePaymentList';

interface Props {
  paymentRequest: PaymentProductRequest;
}

export default function PaymentItem({ paymentRequest }: Props) {
  const { removePayment } = usePaymentList();
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
        <Button
          size="sm"
          type="secondary"
          isSubmit
          className="ml-2"
          onClick={() => removePayment(paymentRequest)}
        >
          Eliminar
        </Button>
      </Flex>
    </li>
  );
}
