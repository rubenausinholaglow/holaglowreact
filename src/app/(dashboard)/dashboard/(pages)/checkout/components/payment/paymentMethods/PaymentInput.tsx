'use client';

import 'react-datepicker/dist/react-datepicker.css';
import 'app/(web)/checkout/agenda/datePickerStyle.css';

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import Bugsnag from '@bugsnag/js';
import { User } from '@interface/appointment';
import FinanceService from '@services/FinanceService';
import { messageService } from '@services/MessageService';
import UserService from '@services/UserService';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import TextInputField from 'app/(dashboard)/dashboard/components/TextInputField';
import Notification from 'app/(dashboard)/dashboard/components/ui/Notification';
import { SvgClose, SvgSpinner } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { ClientUpdate } from 'app/types/client';
import { PaymentCreatedData } from 'app/types/FrontEndMessages';
import {
  CreatePayment,
  InitializePayment,
  OriginPayment,
  ProductPaymentRequest,
} from 'app/types/initializePayment';
import { PaymentBank, PaymentMethod } from 'app/types/payment';
import { applyDiscountToCart } from 'app/utils/utils';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Title } from 'designSystem/Texts/Texts';
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

  const { user, stateProducts } = useGlobalPersistedStore(state => state);
  const { isModalOpen } = useGlobalStore(state => state);
  const {
    remoteControl,
    storedBoxId,
    storedClinicId,
    storedBudgetId,
    setCurrentUser,
  } = useGlobalPersistedStore(state => state);

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
    const paymentCreatedRequest: PaymentCreatedData = {
      userId: user?.id || '',
      id: paymentId,
      amount: amount,
      paymentBank: props.paymentBank,
      paymentMethod: props.paymentMethod,
      referenceId: referenceId,
      remoteControl: remoteControl,
      budgetId: storedBudgetId || '',
    };

    await messageService.paymentCreated(paymentCreatedRequest);
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

    const paymentRequestApi = {
      amount: amount,
      userId: user?.id || '',
      paymentMethod: props.paymentMethod,
      referenceId: props.paymentBank.toString(),
      paymentBank: props.paymentBank,
      originOfPayment: OriginPayment.dashboard,
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

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      ['id']: user?.id,
    }));
    await UserService.updateUser(formData).then(async x => {
      let resultValue = '';
      if (!isNaN(Number(inputValue))) {
        resultValue = Math.round(Number(inputValue) * 100).toString();
      }
      const data: InitializePayment = {
        amount: Number(resultValue),
        installments: 1,
        userId: user?.id || '',
        paymentBank: 2,
        productPaymentRequest: [],
      };

      cart.forEach(product => {
        const productPayment: ProductPaymentRequest = {
          name: product.title,
          price: product.price.toString(),
          quantity: '1',
          id: product.id,
        };
        data.productPaymentRequest?.push(productPayment);
      });

      await FinanceService.initializePayment(data).then(x => {
        setShowPepperModal(false);
        if (x) {
          openWindow(x.url);
          handleUrlPayment(x.id, '', x.referenceId);
        } else {
          setMessageNotification('Error pagando con Pepper');
        }
      });

      await UserService.checkUser(user?.email)
        .then(async data => {
          if (data && !isEmpty(data)) {
            setCurrentUser(data);
          } else {
            //TODO - MESSAGE ERROR UI
          }
        })
        .catch(error => {
          Bugsnag.notify('Error handleCheckUser:', error);
        });
    });
    setIsLoading(false);
  };

  const openWindow = (url: string) => {
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const handleBirthdayChange = (date: any) => {
    const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
    setFormData(prevFormData => ({
      ...prevFormData,
      birthday: formattedDate,
    }));
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
              Importe: <span className="font-semibold">{inputValue}</span> €
            </Title>

            <Flex className="gap-4">
              <TextInputField
                label="Nombre"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={event => handleFormFieldChange(event, 'firstName')}
              />
              <TextInputField
                label="Apellidos"
                placeholder="Apellidos"
                value={formData.lastName}
                onChange={event => handleFormFieldChange(event, 'lastName')}
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
                  Fecha Nacimiento dd/mm/aaaa
                </label>
                <DatePicker
                  selected={
                    formData.birthday
                      ? dayjs(formData.birthday).toDate()
                      : new Date()
                  }
                  onChange={date => {
                    handleBirthdayChange(date);
                  }}
                  onMonthChange={date => {
                    handleBirthdayChange(date);
                  }}
                  onYearChange={date => {
                    handleBirthdayChange(date);
                  }}
                  useWeekdaysShort
                  calendarStartDay={1}
                  locale="es"
                  className="w-full"
                  fixedHeight
                  popperClassName="pepper-datepicker"
                  popperPlacement="bottom"
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
                      onChange={event => {
                        const formattedDate = event.target.value
                          ? dayjs(event.target.value).format('YYYY-MM-DD')
                          : '';
                        setFormData(prevFormData => ({
                          ...prevFormData,
                          birthday: formattedDate,
                        }));
                      }}
                    />
                  }
                  showYearDropdown
                  showMonthDropdown
                  dateFormat="dd/MM/yyyy"
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
              size="lg"
              type="tertiary"
              customStyles="bg-hg-primary px-8"
              isSubmit
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
          <Flex layout="col-left" className="w-full">
            <PepperWidget totalPrice={Number(inputValue)}></PepperWidget>
            <Flex className="mt-4">
              <Button
                type="tertiary"
                isSubmit
                className="ml-2"
                onClick={() => openPepper()}
              >
                Abrir Pepper
              </Button>
              <Button
                type="tertiary"
                customStyles="bg-hg-primary"
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
      <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full">
        <Flex layout="col-left" className="w-full">
          <Controller
            name="number"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Flex
                layout="row-left"
                className="mb-2 content-center relative w-full gap-2"
              >
                <label className="absolute top-2 left-3 text-xs text-hg-black400">
                  {props.paymentBank === PaymentBank.Alma ||
                  props.paymentBank === PaymentBank.Pepper
                    ? 'Importe a financiar'
                    : 'Cantidad'}
                </label>
                <input
                  className="bg-white border border-hg-black300 rounded-xl px-3 pt-6 pb-2 text-hg-black w-1/2 grow 
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                  style={{
                    background:
                      'url("/images/forms/euro.svg") #ffffff no-repeat center right 12px',
                  }}
                />
                {props.paymentBank === PaymentBank.Alma && (
                  <Button
                    type="tertiary"
                    isSubmit
                    onClick={() => activateAlma()}
                  >
                    Continuar
                    <SvgArrow height={16} width={16} className="ml-2" />
                  </Button>
                )}
                {props.paymentBank === PaymentBank.Pepper && (
                  <Button
                    type="tertiary"
                    isSubmit
                    onClick={() => activatePepper()}
                  >
                    Continuar
                    <SvgArrow height={16} width={16} className="ml-2" />
                  </Button>
                )}
                {props.paymentBank != PaymentBank.Alma &&
                  props.paymentBank != PaymentBank.Pepper && (
                    <Button
                      type="tertiary"
                      customStyles="bg-hg-primary"
                      isSubmit
                    >
                      {isLoading ? (
                        <SvgSpinner height={24} width={24} />
                      ) : (
                        <>
                          Pagar
                          <SvgArrow height={16} width={16} className="ml-2" />
                        </>
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
