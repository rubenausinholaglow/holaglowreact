import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Notification from '@components/ui/Notification';
import { CreatePayment } from '@interface/initializePayment';
import { PaymentBank, PaymentMethod } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { applyDiscountToCart } from '@utils/utils';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
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
  const [isLoading, setIsLoading] = useState(false);
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );

  const priceDiscount = useCartStore(state => state.priceDiscount);
  const percentageDiscount = useCartStore(state => state.percentageDiscount);
  const manualPrice = useCartStore(state => state.manualPrice);

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
          paymentReference: paymentRequestApi.referenceId,
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
      referenceId: urlPayment,
    };
    createPayment(paymentRequestApi);
  };

  const activateAlma = async () => {
    if (parseFloat(inputValue) >= 50) {
      setShowAlma(!showAlma);
      setMessageNotification('');
    } else {
      setMessageNotification(
        'La cifra a financiar por alma debe ser igual o superior a 50€'
      );
    }
  };
  const handleSubmitForm = async (data: any) => {
    if (showAlma || messageNotification) {
      return;
    }
    setIsLoading(true);
    const amount = parseFloat(data.number);
    const GuidUser = localStorage.getItem('id') || '';

    const paymentRequestApi = {
      amount: amount,
      userId: GuidUser,
      paymentMethod: props.paymentMethod,
      referenceId: '',
    };
    await createPayment(paymentRequestApi);
    setIsLoading(false);
  };

  const renderFinance = () => {
    return (
      <>
        {showAlma && (
          <AlmaWidget
            amountFinance={inputValue}
            onUrlPayment={handleUrlPayment}
          ></AlmaWidget>
        )}
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Flex layout="col-left" className="items-start">
          <Controller
            name="number"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Flex layout="row-left" className="mb-2 content-center">
                <input
                  placeholder="Introduce importe"
                  className="bg-white border border-hg-darkMalva rounded-md p-2 text-hg-black w-[200px]"
                  type="number"
                  {...field}
                  onChange={e => {
                    const newValue = Math.min(
                      parseFloat(e.target.value.replace(',', '.')),
                      parseFloat(MaxValue.toFixed(2))
                    );
                    field.onChange(newValue);
                    setInputValue(newValue.toString());
                  }}
                />
                {props.paymentBank === PaymentBank.Alma && (
                  <Button
                    size="sm"
                    type="secondary"
                    isSubmit
                    className="ml-2"
                    onClick={() => activateAlma()}
                  >
                    Ver Financiación
                  </Button>
                )}
                {props.paymentBank != 1 && (
                  <Button size="sm" type="secondary" isSubmit className="ml-2">
                    {isLoading ? (
                      <SvgSpinner height={24} width={24} />
                    ) : (
                      'Pagar'
                    )}
                  </Button>
                )}
              </Flex>
            )}
          />
          {props.paymentBank == PaymentBank.Alma && renderFinance()}
        </Flex>
      </form>
      {messageNotification ? (
        <Notification message={messageNotification} />
      ) : (
        <></>
      )}
    </>
  );
}
