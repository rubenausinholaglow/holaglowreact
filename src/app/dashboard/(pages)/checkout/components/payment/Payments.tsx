'use client';

import { useState } from 'react';
import { INITIAL_STATE_PAYMENT } from '@interface/paymentList';
import { INITIAL_STATE } from '@utils/constants';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { Button } from 'components/Buttons/Buttons';
import { SvgAlma } from 'icons/Icons';

import PaymentItem from './PaymentItem';
import PaymentClient from './paymentMethods/PaymentClient';
import { paymentItems } from './paymentMethods/PaymentItems';
import { usePaymentList } from './payments/usePaymentList';

export const PaymentModule = () => {
  const [activePaymentMethod, setActivePaymentMethod] = useState('');
  const [onLoad, setOnLoad] = useState(false);

  const paymentList = usePaymentList(state => state.paymentRequest);
  const totalPrice = useCartStore(state => state.totalPrice);
  const totalAmount = usePaymentList(state => state.totalAmount);

  const missingAmount = totalPrice - totalAmount;
  const missingAmountFormatted = missingAmount.toFixed(2);

  const handleOnButtonPaymentClick = (paymentKey: any) => {
    setOnLoad(true);
    if (activePaymentMethod === paymentKey) {
      setOnLoad(false);
      setActivePaymentMethod('');
    } else {
      setActivePaymentMethod(paymentKey);
    }
  };

  const createTicket = () => {
    //TODO - CREATE TICKET CALL API
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
    useCartStore.setState(INITIAL_STATE);
    //TODO - REDIRECT TO MENU
  };

  return (
    <>
      {paymentItems.map(method => (
        <Button
          key={method.key}
          style="tertiary"
          className={`border-[#FA5022] ${
            onLoad && activePaymentMethod != method.key ? 'hidden' : ''
          }`}
          target="_blank"
          onClick={() => handleOnButtonPaymentClick(method.key)}
        >
          {method.label}
        </Button>
      ))}

      {paymentItems.map(method =>
        activePaymentMethod === method.key ? (
          <PaymentClient
            key={method.key}
            paymentBank={method.paymentBank}
            paymentMethod={method.paymentMethod}
            onPaymentClick={() => setActivePaymentMethod('')}
          ></PaymentClient>
        ) : null
      )}

      {totalAmount ? (
        <div>
          <span className="font-bold">Pagos Realizados:</span>
          <ul>
            {paymentList?.map(paymentRequest => (
              <PaymentItem
                key={paymentRequest.id}
                paymentRequest={paymentRequest}
              />
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
      <span className="font-bold mr-1">Total Pagado {totalAmount}€</span>
      {totalAmount ? (
        <span className="font-bold mr-1">Faltan {missingAmountFormatted}€</span>
      ) : (
        <></>
      )}
      <Button onClick={createTicket}>Generar Tiquet</Button>
    </>
  );
};
