'use client';

import { useState } from 'react';
import { INITIAL_STATE_PAYMENT } from '@interface/paymentList';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import AlmaPayment from 'app/dashboard/(pages)/checkout/components/payment/paymentMethods/Alma';
import { Button } from 'components/Buttons/Buttons';
import { SvgAlma } from 'icons/Icons';

import PaymentItem from './PaymentItem';
import CashPayment from './paymentMethods/Cash';
import CreditCardPayment from './paymentMethods/CreditCard';
import { usePaymentList } from './payments/usePaymentList';

export const PaymentModule = () => {
  const [showAlma, setShowAlma] = useState(false);
  const [showCash, setShowCash] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);

  const paymentList = usePaymentList(state => state.paymentRequest);
  const totalPrice = useCartStore(state => state.totalPrice);
  const totalAmount = usePaymentList(state => state.totalAmount);

  const missingAmount = totalPrice - totalAmount;

  const createTicket = () => {
    //TODO - CREATE TICKET CALL API
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
  };

  return (
    <>
      <Button
        style="tertiary"
        className="border-[#FA5022]"
        target="_blank"
        onClick={() => setShowAlma(!showAlma)}
      >
        <SvgAlma height={20} width={55} fill="#FA5022" />
      </Button>
      {showAlma ? <AlmaPayment amountFinance={'10000'}></AlmaPayment> : <></>}
      <Button
        style="tertiary"
        className="border-[#FA5022]"
        target="_blank"
        onClick={() => setShowCash(!showCash)}
      >
        Efectivo
      </Button>
      {showCash ? <CashPayment></CashPayment> : <></>}
      <Button
        style="tertiary"
        className="border-[#FA5022]"
        target="_blank"
        onClick={() => setShowCreditCard(!showCreditCard)}
      >
        Tarjeta
      </Button>
      {showCreditCard ? <CreditCardPayment></CreditCardPayment> : <></>}
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
        <span className="font-bold mr-1">
          Faltan {parseFloat(missingAmount).toFixed(2)}€
        </span>
      ) : (
        <></>
      )}
      <Button onClick={createTicket}>Generar Tiquet</Button>
    </>
  );
};
