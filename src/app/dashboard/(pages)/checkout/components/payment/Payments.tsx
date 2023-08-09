'use client';

import { useState } from 'react';
import { PaymentBank, PaymentMethod } from '@interface/payment';
import { INITIAL_STATE_PAYMENT } from '@interface/paymentList';
import { INITIAL_STATE } from '@utils/constants';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { Button } from 'components/Buttons/Buttons';
import { SvgAlma } from 'icons/Icons';

import PaymentItem from './PaymentItem';
import PaymentClient from './paymentMethods/PaymentClient';
import { usePaymentList } from './payments/usePaymentList';

export const PaymentModule = () => {
  const [showAlma, setShowAlma] = useState(false);
  const [showCash, setShowCash] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);

  const paymentList = usePaymentList(state => state.paymentRequest);
  const totalPrice = useCartStore(state => state.totalPrice);
  const totalAmount = usePaymentList(state => state.totalAmount);

  const missingAmount = totalPrice - totalAmount;
  const missingAmountFormatted = missingAmount.toFixed(2);

  const handleOnButtonPaymentClick = () => {
    setShowCreditCard(false);
    setShowAlma(false);
    setShowCash(false);
  };

  const createTicket = () => {
    //TODO - CREATE TICKET CALL API
    usePaymentList.setState(INITIAL_STATE_PAYMENT);
    useCartStore.setState(INITIAL_STATE);
    //TODO - REDIRECT TO MENU
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
      {showAlma ? (
        <PaymentClient
          paymentBank={PaymentBank.Alma}
          paymentMethod={PaymentMethod.Financing}
          onPaymentClick={handleOnButtonPaymentClick}
        ></PaymentClient>
      ) : (
        <></>
      )}
      <Button
        style="tertiary"
        className="border-[#FA5022]"
        target="_blank"
        onClick={() => setShowCash(!showCash)}
      >
        Efectivo
      </Button>
      {showCash ? (
        <PaymentClient
          paymentBank={PaymentBank.None}
          paymentMethod={PaymentMethod.Cash}
          onPaymentClick={handleOnButtonPaymentClick}
        ></PaymentClient>
      ) : (
        <></>
      )}
      <Button
        style="tertiary"
        className="border-[#FA5022]"
        target="_blank"
        onClick={() => setShowCreditCard(!showCreditCard)}
      >
        Tarjeta
      </Button>
      {showCreditCard ? (
        <PaymentClient
          paymentBank={PaymentBank.None}
          paymentMethod={PaymentMethod.CreditCard}
          onPaymentClick={handleOnButtonPaymentClick}
        ></PaymentClient>
      ) : (
        <></>
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
