import { PaymentProductRequest } from '@interface/payment';
import { getPaymentBankText, getPaymentMethodText } from '@utils/utils';
import { Flex } from 'components/Layouts/Layouts';
import { SvgCircle } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { usePaymentList } from './payments/usePaymentList';

interface Props {
  paymentRequest: PaymentProductRequest;
}

export default function PaymentItem({ paymentRequest }: Props) {
  // const { removePayment } = usePaymentList();
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
        ) : null}
        <span className="font-bold">{`- ${paymentRequest.amount}€`}</span>
      </Flex>
    </li>
  );
}
