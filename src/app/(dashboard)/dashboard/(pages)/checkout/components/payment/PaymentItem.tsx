import { useEffect, useState } from 'react';
import FinanceService from '@services/FinanceService';
import { messageService } from '@services/MessageService';
import Notification from 'app/(dashboard)/dashboard/components/ui/Notification';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgCheck, SvgCross } from 'app/icons/IconsDs';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { PaymentCreatedData } from 'app/types/FrontEndMessages';
import { PaymentProductRequest } from 'app/types/payment';
import { getPaymentBankText, getPaymentMethodText } from 'app/utils/utils';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
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
  const availableBanks = [1, 2, 4];
  const financialBanks = [1, 2];
  const [isDeleteEnabled, setDeleteEnabled] = useState<boolean>(true);
  const [textPayment, setTextPayment] = useState<string>('');
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { remoteControl, storedBoxId, storedClinicId, storedBudgetId } =
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
    const paymentCreatedRequest: PaymentCreatedData = {
      clinicId: storedClinicId,
      boxId: storedBoxId,
      id: paymentId,
      amount: 0,
      paymentBank: 0,
      paymentMethod: 0,
      referenceId: '',
      remoteControl: remoteControl,
      budgetId: storedBudgetId || '',
    };

    await messageService.paymentCreated(paymentCreatedRequest);
  };

  return (
    <Flex className="gap-1 w-full">
      <Text className="font-semibold">
        {getPaymentMethodText(paymentRequest.method)}
      </Text>
      {financialBanks.includes(paymentRequest.bank) && (
        <span className="mr-1 font-semibold">
          {getPaymentBankText(paymentRequest.bank)}
        </span>
      )}

      {availableBanks[paymentRequest.bank] && (
        <Text key={paymentRequest.id}>{textPayment}</Text>
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
