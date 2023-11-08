'use client';

import 'react-datepicker/dist/react-datepicker.css';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import Bugsnag from '@bugsnag/js';
import TextInputField from '@components/TextInputField';
import Notification from '@components/ui/Notification';
import { ClientUpdate } from '@interface/client';
import { CreatePayment, InitializePayment } from '@interface/initializePayment';
import { PaymentBank, PaymentMethod } from '@interface/payment';
import FinanceService from '@services/FinanceService';
import { messageService } from '@services/MessageService';
import UserService from '@services/UserService';
import { applyDiscountToCart } from '@utils/utils';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Title } from 'designSystem/Texts/Texts';
import { SvgClose, SvgSpinner } from 'icons/Icons';
import { isEmpty } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { usePaymentList } from '../payments/usePaymentList';
import AlmaWidget from './AlmaWidget';
import PepperWidget from './PepperWidget';

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
  const [showPepper, setshowPepper] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  );
  const [showPepperModal, setShowPepperModal] = useState(false);

  const { user } = useGlobalPersistedStore(state => state);
  const { isModalOpen } = useGlobalStore(state => state);

  const [formData, setFormData] = useState<ClientUpdate>({
    dni: user?.dni ?? '',
    address: user?.address ?? '',
    city: user?.city ?? '',
    province: user?.province ?? '',
    postalCode: user?.postalCode ?? '',
    birthday: user?.birthday ?? '',
    id: user?.id ?? '',
    country: user?.country ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName
      ? `${user.lastName} ${user.secondLastName ?? ''}`
      : '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
  });

  const { priceDiscount, percentageDiscount, manualPrice } = useCartStore(
    state => state
  );

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
    await FinanceService.createPayment(paymentRequestApi)
      .then(async data => {
        if (data && !isEmpty(data)) {
          const id: string = data as string;
          const paymentRequest = {
            amount: paymentRequestApi.amount,
            method: props.paymentMethod,
            bank: props.paymentBank,
            paymentReference: paymentRequestApi.referenceId,
            id: id,
          };
          addPaymentToList(paymentRequest);

          await sendPaymentCreated(
            id,
            paymentRequestApi.amount,
            paymentRequestApi.referenceId
          );
        } else {
          setMessageNotification('Error creando el pago');
        }
      })
      .catch(error => {
        Bugsnag.notify('Error FinanceService.createPayment:', error);
      });
    props.onButtonClick(false);
  };

  const sendPaymentCreated = async (
    paymentId: string,
    amount: any,
    referenceId: string
  ) => {
    const localClinicId = localStorage.getItem('ClinicId');
    const localBoxId = localStorage.getItem('BoxId');
    const remoteControl = localStorage.getItem('RemoteControl');
    const localBudgetId = localStorage.getItem('BudgetId');

    const paymentCreatedRequest = {
      clinicId: localClinicId,
      boxId: localBoxId,
      id: paymentId,
      amount: amount,
      paymentBank: props.paymentBank,
      paymentMethod: props.paymentMethod,
      referenceId: referenceId,
      remoteControl: remoteControl,
      budgetId: localBudgetId,
    };

    await messageService.PaymentCreated(paymentCreatedRequest);
  };

  const handleUrlPayment = async (
    idPayment: string,
    urlPayment: string,
    referencePayment: string
  ) => {
    const amount = parseFloat(inputValue);
    const paymentRequest = {
      amount: amount,
      method: props.paymentMethod,
      bank: props.paymentBank,
      paymentReference: referencePayment,
      id: idPayment,
    };
    addPaymentToList(paymentRequest);
    sendPaymentCreated(idPayment, amount, referencePayment);
    props.onButtonClick(false);
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

  const activatePepper = async () => {
    setshowPepper(true);
  };

  const openPepper = () => {
    setShowPepperModal(true);
  };
  async function addPayment(number: any) {
    setIsLoading(true);
    const amount = parseFloat(number);
    const GuidUser = localStorage.getItem('id') || '';

    const paymentRequestApi = {
      amount: amount,
      userId: GuidUser,
      paymentMethod: props.paymentMethod,
      referenceId: props.paymentBank.toString(),
    };
    await createPayment(paymentRequestApi);
    setIsLoading(false);
  }
  const handleSubmitForm = async (data: any) => {
    if (showAlma || messageNotification || showPepper) {
      return;
    }
    await addPayment(data.number);
  };

  const pay = async () => {
    await addPayment(inputValue);
  };

  const initializePepper = async () => {
    setIsLoading(true);
    const GuidUser = localStorage.getItem('id') || '';
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ['id']: GuidUser,
    }));
    await UserService.updateUser(formData).then(async x => {
      let resultValue = '';
      if (!isNaN(Number(inputValue))) {
        resultValue = Math.round(Number(inputValue) * 100).toString();
      }
      const data: InitializePayment = {
        amount: Number(resultValue),
        installments: 1,
        userId: GuidUser,
        paymentBank: 2,
      };

      await FinanceService.initializePayment(data).then(x => {
        setShowPepperModal(false);
        if (x) {
          window.open(x.url, '_blank');
          handleUrlPayment(x.id, '', x.referenceId);
        } else {
          setMessageNotification('Error pagando con Pepper');
        }
      });
    });
    setIsLoading(false);
  };

  const handleFormFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (!isModalOpen) {
      setShowPepperModal(false);
    }
  }, [isModalOpen]);

  const renderFinance = () => {
    return (
      <>
        <Modal isVisible={showPepperModal} width="w-3/4">
          <Flex layout="col-left" className="p-4 relative gap-4">
            <SvgClose
              onClick={() => setShowPepperModal(false)}
              className="mb-4"
            />
            <Title>
              Importe: <span className="font-semibold">{inputValue}</span>
            </Title>

            <Flex className="gap-4">
              <TextInputField
                label="Nombre"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={event => handleFormFieldChange(event, 'name')}
              />
              <TextInputField
                label="Apellidos"
                placeholder="Apellidos"
                value={formData.lastName}
                onChange={event => handleFormFieldChange(event, 'surnames')}
              />
            </Flex>
            <Flex className="gap-4">
              <TextInputField
                label="Email"
                placeholder="Email"
                value={formData.email}
                onChange={event => handleFormFieldChange(event, 'email')}
              />
              <TextInputField
                label="Teléfono"
                placeholder="Teléfono"
                value={formData.phone}
                onChange={event => handleFormFieldChange(event, 'phone')}
              />
            </Flex>

            <Flex className="gap-4">
              <Flex className="flex-col">
                <label className="text-gray-700 mb-2 w-full text-left">
                  Fecha Nacimiento
                </label>
                <DatePicker
                  selected={
                    formData.birthday
                      ? dayjs(formData.birthday).toDate()
                      : new Date()
                  }
                  onChange={date => {
                    const formattedDate = date
                      ? dayjs(date).format('YYYY-MM-DD')
                      : '';
                    setFormData(prevFormData => ({
                      ...prevFormData,
                      birthday: formattedDate,
                    }));
                  }}
                  useWeekdaysShort
                  calendarStartDay={1}
                  locale="es"
                  className="w-full"
                  fixedHeight
                  customInput={
                    <input
                      placeholder={'Fecha nacimiento'}
                      className={twMerge(
                        `border border-hg-black300 rounded-2xl px-4 py-2 w-full text-hg-black h-12 focus:outline-none ${
                          formData.birthday.length > 0 ? 'border-hg-black' : ''
                        }
                      
                      `
                      )}
                      type="text"
                      value={formData.birthday || ''}
                      onChange={() => {}}
                    />
                  }
                  showYearDropdown
                  showMonthDropdown
                ></DatePicker>
              </Flex>
              <TextInputField
                label="DNI"
                placeholder="DNI"
                value={formData.dni}
                onChange={event => handleFormFieldChange(event, 'dni')}
              />
            </Flex>

            <Flex className="gap-4">
              <TextInputField
                label="Dirección"
                placeholder="Dirección"
                value={formData.address}
                onChange={event => handleFormFieldChange(event, 'address')}
              />
              <TextInputField
                label="Código Postal"
                placeholder="Código Postal"
                value={formData.postalCode}
                onChange={event => handleFormFieldChange(event, 'postalCode')}
              />
            </Flex>

            <Flex className="gap-4">
              <TextInputField
                label="Provincia"
                placeholder="Provincia"
                value={formData.province}
                onChange={event => handleFormFieldChange(event, 'province')}
              />
              <TextInputField
                label="Ciudad"
                placeholder="Ciudad"
                value={formData.city}
                onChange={event => handleFormFieldChange(event, 'city')}
              />
            </Flex>

            <Button
              size="sm"
              type="secondary"
              isSubmit
              className="ml-2"
              onClick={initializePepper}
            >
              {isLoading ? <SvgSpinner height={24} width={24} /> : 'Pagar'}
            </Button>
          </Flex>
        </Modal>
        {showAlma && (
          <AlmaWidget
            amountFinance={inputValue}
            onUrlPayment={handleUrlPayment}
          ></AlmaWidget>
        )}
        {showPepper && (
          <Flex layout="col-left">
            <PepperWidget totalPrice={Number(inputValue)}></PepperWidget>
            <Flex className="mt-4">
              <Button
                size="sm"
                type="secondary"
                isSubmit
                className="ml-2"
                onClick={() => openPepper()}
              >
                Abrir Pepper
              </Button>
              <Button
                size="sm"
                type="secondary"
                isSubmit
                className="ml-2"
                onClick={() => pay()}
              >
                Pagar
              </Button>
            </Flex>
          </Flex>
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
                  placeholder="Importe"
                  className="bg-white border border-hg-tertiary rounded-md p-2 text-hg-black w-1/2"
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
                    Ver financiación
                  </Button>
                )}
                {props.paymentBank === PaymentBank.Pepper && (
                  <Button
                    size="sm"
                    type="secondary"
                    isSubmit
                    className="ml-2"
                    onClick={() => activatePepper()}
                  >
                    Ver financiación
                  </Button>
                )}
                {props.paymentBank != PaymentBank.Alma &&
                  props.paymentBank != PaymentBank.Pepper && (
                    <Button
                      size="sm"
                      type="secondary"
                      isSubmit
                      className="ml-2"
                    >
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
          {renderFinance()}
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
