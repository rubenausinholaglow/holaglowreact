import {
  PaymentBank,
  PaymentMethod,
  PaymentProductRequest,
} from '@interface/payment';
import { Flex } from 'components/Layouts/Layouts';
import { SvgCircle, SvgClose } from 'icons/Icons';
import { HOLAGLOW_COLORS } from 'utils/colors';

import { usePaymentList } from './payments/usePaymentList';

interface Props {
  paymentRequest: PaymentProductRequest;
}

export default function PaymentItem({ paymentRequest }: Props) {
  const { removePayment } = usePaymentList();

  function getPaymentMethodText(method: PaymentMethod): string {
    switch (method) {
      case PaymentMethod.Cash:
        return 'Efectivo';
      case PaymentMethod.CreditCard:
        return 'Tarjeta de Crédito';
      case PaymentMethod.Financing:
        return 'Financiación';
      case PaymentMethod.Others:
        return 'Otros';
      default:
        return 'Unknown';
    }
  }

  function getPaymentBankText(bank: PaymentBank): string {
    switch (bank) {
      case PaymentBank.None:
        return 'Ninguna';
      case PaymentBank.Alma:
        return 'Alma';
      case PaymentBank.Pepper:
        return 'Pepper';
      default:
        return 'Unknown';
    }
  }
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
        <SvgCircle
          width={30}
          height={30}
          fill={HOLAGLOW_COLORS['darkMalva']}
          onClick={() => removePayment(paymentRequest)}
        />
      </Flex>
    </li>
  );
}
