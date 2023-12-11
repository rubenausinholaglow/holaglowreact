import { useEffect, useState } from 'react';
import Notification from '@components/ui/Notification';
import { PaymentProductRequest } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { getPaymentBankText, getPaymentMethodText } from '@utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { isEmpty } from 'lodash';

import { usePaymentList } from './payments/usePaymentList';

export enum StatusPayment {
  Waiting,
  Paid,
  Rejected,
  FinancingAccepted,
  FinancingRejected,
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
  const [isLoading, setIsLoading] = useState(false);

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
      case StatusPayment.FinancingRejected:
        setColorPayment('bg-orange-400');
        break;
      case StatusPayment.FinancingAccepted:
        setColorPayment('bg-blue-500');
        break;

      case StatusPayment.Waiting:
      default:
        setColorPayment('bg-gray-300');
        break;
    }
  }, [status]);

  const handleRemoveAndDelete = async (paymentRequest: any) => {
    setIsLoading(true);
    const id = paymentRequest.id;
    await FinanceService.deletePayment(id)
      .then(async data => {
        if (data && !isEmpty(data)) {
          removePayment(paymentRequest);
        } else {
          setMessageNotification('Error al eliminar pago');
        }
      })
      .catch(error => {
        setMessageNotification('Error al eliminar pago');
      });
    setIsLoading(false);
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
            {isLoading ? <SvgSpinner height={24} width={24} /> : 'Eliminar'}
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
