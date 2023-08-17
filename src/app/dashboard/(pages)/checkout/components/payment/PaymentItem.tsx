import { PaymentProductRequest } from '@interface/payment';
import { getPaymentBankText, getPaymentMethodText } from '@utils/utils';
import { Flex } from 'designSystem/Layouts/Layouts';

interface Props {
  paymentRequest: PaymentProductRequest;
}

export default function PaymentItem({ paymentRequest }: Props) {
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
      </Flex>
    </li>
  );
}
