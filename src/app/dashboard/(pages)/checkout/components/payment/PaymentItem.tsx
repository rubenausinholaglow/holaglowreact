import { useEffect, useState } from 'react';
import Notification from '@components/ui/Notification';
import { PaymentCreatedData } from '@interface/FrontEndMessages';
import { PaymentProductRequest } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { messageService } from '@services/MessageService';
import { getPaymentBankText, getPaymentMethodText } from '@utils/utils';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { SvgSpinner } from 'icons/Icons';
import { SvgCheck, SvgCross } from 'icons/IconsDs';
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
  const { removePayment } = usePaymentList(state => state);
  const aviableBanks = [1, 2, 4];
  const [isDeleteEnabled, setDeleteEnabled] = useState<boolean>(true);
  const [textPayment, setTextPayment] = useState<string>('');
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { remoteControl, storedBoxId, storedClinicId } =
    useGlobalPersistedStore(state => state);

  if (status === undefined) {
    status = StatusPayment.Waiting;
  }

  useEffect(() => {
    switch (status) {
      case StatusPayment.Paid:
        setTextPayment('Pagado');
        setDeleteEnabled(false);
        break;
      case StatusPayment.Rejected:
        setTextPayment('Rechazado');
        break;
      case StatusPayment.FinancingRejected:
        setTextPayment('Financiación rechazada');
        break;
      case StatusPayment.FinancingAccepted:
        setTextPayment('Financiación aceptada');
        break;

      case StatusPayment.Waiting:
      default:
        setTextPayment('Pendiente');
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
          sendPaymentDeleted(paymentRequest.id);
        } else {
          setMessageNotification('Error al eliminar pago');
        }
      })
      .catch(error => {
        setMessageNotification('Error al eliminar pago');
      });
    setIsLoading(false);
  };

  const sendPaymentDeleted = async (paymentId: string) => {
    const localClinicId = storedClinicId;
    const localBoxId = storedBoxId;
    const localBudgetId = localStorage.getItem('BudgetId');

    const paymentCreatedRequest: PaymentCreatedData = {
      clinicId: localClinicId,
      boxId: localBoxId,
      id: paymentId,
      amount: 0,
      paymentBank: 0,
      paymentMethod: 0,
      referenceId: '',
      remoteControl: remoteControl,
      budgetId: localBudgetId || '',
    };

    await messageService.paymentCreated(paymentCreatedRequest);
  };

  return (
    <Flex className="gap-2 w-full">
      <SvgCheck height={24} width={24} className="text-hg-secondary" />
      <Text className="text-hg-secondary">Pagado</Text>
      <Text className="text-hg-black500">
        ({getPaymentMethodText(paymentRequest.method)})
      </Text>
      {paymentRequest.bank ? (
        <span className="font-bold mr-1">
          {getPaymentBankText(paymentRequest.bank)}
        </span>
      ) : null}{' '}
      {aviableBanks[paymentRequest.bank] && (
        <div
          key={paymentRequest.id}
          className={`w-4 h-4 rounded-full inline-block mx-2`}
        >
          {textPayment}
        </div>
      )}
      <Flex className="ml-auto gap-2">
        <Text className="font-semibold text-lg">{paymentRequest.amount} €</Text>
        {isDeleteEnabled && (
          <Button
            size="sm"
            type="tertiary"
            isSubmit
            customStyles="bg-white border-none p-2"
            onClick={() => handleRemoveAndDelete(paymentRequest)}
          >
            {isLoading ? (
              <SvgSpinner height={24} width={24} />
            ) : (
              <SvgCross height={16} width={16} className="text-hg-black" />
            )}
          </Button>
        )}
      </Flex>
      {messageNotification ? (
        <Notification message={messageNotification} />
      ) : (
        <></>
      )}
    </Flex>
  );
}
