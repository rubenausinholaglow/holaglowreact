import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreatePayment } from '@interface/initializePayment';
import { PaymentBank, PaymentMethod } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { applyDiscountToCart } from '@utils/utils';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { Flex } from 'components/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';

import { usePaymentList } from '../payments/usePaymentList';
import AlmaWidget from './AlmaWidget';

interface Props {
  paymentMethod: PaymentMethod;
  paymentBank: PaymentBank;
  onButtonClick: (newValue: boolean) => void;
}

export default function PaymentInput(props: Props) {
  const { control, handleSubmit } = useForm();
  const cart = useCartStore(state => state.cart);
  const totalAmount = usePaymentList(state => state.totalAmount);
  const { addPaymentToList } = usePaymentList();
  const [showAlma, setShowAlma] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [urlPayment, setUrlPayment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);
  const manualPrice = useCartStore(state => state.manualPrice);

  let productsPriceTotal = 0;
  if (cart) {
    productsPriceTotal = cart.reduce((acc, product) => acc + product.price, 0);
  }

  let productsPriceTotalWithDiscounts = 0;

  if (cart) {
    productsPriceTotalWithDiscounts = cart.reduce(
      (acc, product) => acc + Number(product.priceWithDiscount),
      0
    );
  }
  const cartTotalWithDiscount = applyDiscountToCart(
    percentageDiscount,
    priceDiscount,
    manualPrice,
    productsPriceTotalWithDiscounts
  );

  const MaxValue =
    parseFloat(cartTotalWithDiscount.toFixed(2)) -
    parseFloat(totalAmount.toFixed(2));

  const createPayment = async (paymentRequestApi: CreatePayment) => {
    const response = await FinanceService.createPayment(paymentRequestApi);
    if (response) {
      if (!isNaN(paymentRequestApi.amount) && paymentRequestApi.amount > 0) {
        const paymentRequest = {
          amount: paymentRequestApi.amount,
          method: props.paymentMethod,
          bank: props.paymentBank,
          paymentReference: urlPayment,
          id: response,
        };
        addPaymentToList(paymentRequest);
        props.onButtonClick(false);
      }
    }
  };
  const handleUrlPayment = async (urlPayment: string) => {
    const amount = parseFloat(inputValue);
    const GuidUser = localStorage.getItem('id') || '';

    const paymentRequestApi = {
      amount: amount,
      userId: GuidUser,
      paymentMethod: props.paymentMethod,
    };
    createPayment(paymentRequestApi);
  };

  const handleSubmitForm = async (data: any) => {
    if (showAlma) {
      return;
    }
    setIsLoading(true);
    const amount = parseFloat(data.number);
    const GuidUser = localStorage.getItem('id') || '';

    const paymentRequestApi = {
      amount: amount * 100,
      userId: GuidUser,
      paymentMethod: props.paymentMethod,
    };
    createPayment(paymentRequestApi);
    setIsLoading(false);
  };

  if (props.paymentBank == PaymentBank.None)
    return (
      <form onSubmit={handleSubmit(handleSubmitForm)}>
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
              {isLoading ? <SvgSpinner height={24} width={24} /> : 'Pagar'}
            </button>
          </Flex>
        </Flex>
      </form>
    );
  else
    return (
      <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                <AlmaWidget
                  amountFinance={inputValue}
                  onUrlPayment={handleUrlPayment}
                ></AlmaWidget>
              </>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
      </form>
    );
}
