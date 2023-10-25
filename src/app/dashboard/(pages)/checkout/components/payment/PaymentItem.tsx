import { useEffect, useState } from 'react';
import Notification from '@components/ui/Notification';
import { PaymentProductRequest } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { getPaymentBankText, getPaymentMethodText } from '@utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';

import { usePaymentList } from './payments/usePaymentList';

export enum StatusPayment {
  Waiting,
  Paid,
  Rejected,
}
interface Props {
  paymentRequest: PaymentProductRequest;
  status: StatusPayment;
}

export default function PaymentItem({ paymentRequest, status }: Props) {
  const { removePayment } = usePaymentList();
  const aviableBanks = [1, 4];
  const [isDeleteEnabled, setDeleteEnabled] = useState<boolean>(true);
  const [colorPayment, setColorPayment] = useState<string>('');
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );

  if (status === undefined) {
    status = StatusPayment.Waiting;
  }

  useEffect(() => {
    switch (status) {
      case StatusPayment.Paid:
        setColorPayment('bg-green-500');
        setDeleteEnabled(false);
        break;
      case StatusPayment.Rejected:
        setColorPayment('bg-red-500');
        break;
      case StatusPayment.Waiting:
      default:
        setColorPayment('bg-gray-300');
        break;
    }
  }, [status]);

  const handleRemoveAndDelete = async (paymentRequest: any) => {
    const id = paymentRequest.id;
    const response = await FinanceService.deletePayment(id);
    if (response) {
      removePayment(paymentRequest);
    } else {
      setMessageNotification('Error al eliminar pago');
    }
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
            className={`w-4 h-4 rounded-full inline-block ${colorPayment} mx-2`}
          ></div>
        )}
        {isDeleteEnabled && (
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
      {messageNotification ? (
        <Notification message={messageNotification} />
      ) : (
        <></>
      )}
    </li>
  );
}
