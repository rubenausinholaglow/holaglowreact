import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { PaymentBank, PaymentMethod } from '@interface/payment';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { Flex } from 'components/Layouts/Layouts';

import { usePaymentList } from '../payments/usePaymentList';
import AlmaWidget from './AlmaWidget';

interface Props {
  paymentMethod: PaymentMethod;
  paymentBank: PaymentBank;
  onButtonClick: (newValue: boolean) => void;
}

export default function PaymentInput(props: Props) {
  const { control, handleSubmit } = useForm();
  const productsPriceTotal = useCartStore(state => state.totalPrice);
  const totalAmount = usePaymentList(state => state.totalAmount);
  const { addPaymentToList } = usePaymentList();
  const [showAlma, setShowAlma] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const MaxValue =
    parseFloat(productsPriceTotal.toFixed(2)) -
    parseFloat(totalAmount.toFixed(2));

  console.log(MaxValue);
  const onSubmit = (data: any) => {
    setShowAlma(false);
    const amount = parseFloat(data.number);

    if (!isNaN(amount) && amount > 0) {
      const paymentRequest = {
        amount: amount,
        method: props.paymentMethod,
        bank: props.paymentBank,
        paymentReference: '',
        id: '',
      };
      addPaymentToList(paymentRequest);
      props.onButtonClick(false);
    }
  };

  if (
    props.paymentBank == PaymentBank.Alma ||
    props.paymentBank == PaymentBank.Pepper
  )
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex layout="row-left" className="items-start">
          <Controller
            name="number"
            control={control}
            render={({ field, fieldState }) => (
              <input
                placeholder="Introduce importe a financiar"
                className="border border-hg-darkMalva rounded px-2 py-1 mt-2 text-black w-full mb-6"
                type="number"
                {...field}
                onChange={e => {
                  setInputValue(e.target.value);
                  const newValue = Math.min(
                    parseInt(e.target.value),
                    parseFloat(MaxValue.toFixed(2))
                  );
                  field.onChange(newValue);
                }}
              />
            )}
          />
          <Flex layout="col-center">
            <button
              className="rounded-full px-8 py-2 text-white transition-all bg-hg-darkMalva border border-hg-darkMalva ml-3 mt-1"
              type="button"
              onClick={() => setShowAlma(!showAlma)}
            >
              Ver Financiación
            </button>
            {showAlma ? (
              <>
                <br />
                <AlmaWidget amountFinance={inputValue}></AlmaWidget>
              </>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
      </form>
    );
  else
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex layout="row-left" className="items-start">
          <Controller
            name="number"
            control={control}
            render={({ field, fieldState }) => (
              <input
                placeholder="Introduce importe"
                className="border border-hg-darkMalva rounded px-2 py-1 mt-2 text-black w-full mb-6"
                type="number"
                {...field}
                onChange={e => {
                  const newValue = Math.min(
                    parseInt(e.target.value),
                    parseFloat(MaxValue.toFixed(2))
                  );
                  field.onChange(newValue);
                }}
              />
            )}
          />
          <Flex layout="col-center">
            <button
              className="rounded-full px-8 py-2 text-white transition-all bg-hg-darkMalva border border-hg-darkMalva ml-3 mt-1"
              type="submit"
            >
              Pagar
            </button>
          </Flex>
        </Flex>
      </form>
    );
}
