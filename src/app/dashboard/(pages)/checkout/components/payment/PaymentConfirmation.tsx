import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from '@microsoft/signalr';

import { usePaymentList } from './payments/usePaymentList';

interface PaymentConfirmationProps {
  onAcceptedPayment(): void;
}

export default function PaymentConfirmation({
  onAcceptedPayment,
}: PaymentConfirmationProps) {
  const colorClasses = {
    gray: 'bg-gray-300',
    green: 'bg-green-500',
    red: 'bg-red-500',
  };
  const paymentList = usePaymentList(state => state.paymentRequest);
  const [color, setColor] = useState<keyof typeof colorClasses>('gray');
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const SOCKET_URL =
      process.env.NEXT_PUBLIC_FINANCE_API + 'Hub/PaymentConfirmationResponse';
    const newConnection = new HubConnectionBuilder()
      .withUrl(SOCKET_URL, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(result => {
          connection.on('ReceiveMessage', message => {
            const finalMessage = message.messageText;
            console.log(finalMessage);
            if (finalMessage.startsWith('[PaymentResponse]')) {
              const [, paymentReferenceId, PaymentStatus] =
                finalMessage.split('/');
              if (
                paymentList.find(x => x.paymentReference == paymentReferenceId)
              ) {
                switch (PaymentStatus) {
                  case 'Rejected':
                    setColor('red');
                    break;
                  case 'Paid':
                    onAcceptedPayment();
                    setColor('green');
                    break;
                  default:
                    setColor('gray');
                }
              }
            }
          });
        })
        .catch(e => Bugsnag.notify('Connection failed: ', e));
    }
  }, [connection]);

  return (
    <div
      className={`w-4 h-4 rounded-full inline-block ${colorClasses[color]} mx-2`}
    ></div>
  );
}
