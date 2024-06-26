'use client';

import 'react-international-phone/style.css';
import 'app/(web)/checkout/contactform/phoneInputStyle.css';

import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import Bugsnag from '@bugsnag/js';
import TextInputField from '@dashboardComponents/TextInputField';
import AuthenticationService from '@services/AuthenticationService';
import * as errorsConfig from '@utils/textConstants';
import * as utils from '@utils/validators';
import { SvgSpinner } from 'app/icons/Icons';
import { useSessionStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

export default function Login({
  setIsLogged,
}: {
  setIsLogged: (value: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    phone: '',
    phonePrefix: '',
    pin: '',
  });

  const { setDermaPhone } = useSessionStore(state => state);
  const [activeSlide, setActiveSlide] = useState(0);
  const [phone, setPhone] = useState('');
  const [isLoadingPhone, setIsLoadingPhone] = useState(false);
  const [isLoadingPIN, setIsLoadingPIN] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPhoneError, setShowPhoneError] = useState<null | boolean>(null);
  const [showResendPINMessage, setShowResendPINMessage] = useState(false);

  const handleFieldChange = (value: string | boolean, field: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === 'pin') {
      setErrorMessage('');
    }
  };

  async function resendPIN() {
    let phone = formData.phone.replace(formData.phonePrefix, '');
    phone = phone.replace(/\s/g, '');

    await AuthenticationService.isDermaValidPhone(phone)
      .then(async response => {
        setShowResendPINMessage(true);

        setTimeout(() => {
          setShowResendPINMessage(false);
        }, 10000);
      })
      .catch(error => {
        Bugsnag.notify('Error during token validation: ' + error);
        setErrorMessage(errorsConfig.ERROR_TRY_AGAIN_LATER);
      });
  }

  async function isDermaValidPhone() {
    setIsLoadingPhone(true);

    let phone = formData.phone.replace(formData.phonePrefix, '');
    phone = phone.replace(/\s/g, '');

    setErrorMessage('');
    await AuthenticationService.isDermaValidPhone(phone)
      .then(async response => {
        if (response) {
          setActiveSlide(activeSlide + 1);
          setPhone(phone);
        } else {
          setErrorMessage(errorsConfig.ERROR_PHONE_NOT_VALID);
        }
      })
      .catch(error => {
        Bugsnag.notify('Error during token validation: ' + error);
        setErrorMessage(errorsConfig.ERROR_TRY_AGAIN_LATER);
      });
    setIsLoadingPhone(false);
  }

  async function isDermaValidPIN() {
    setIsLoadingPIN(true);
    setErrorMessage('');
    await AuthenticationService.isDermaValidPIN(Number.parseInt(formData.pin))
      .then(async response => {
        if (response) {
          setIsLoadingPIN(false);
          setIsLogged(true);
          setDermaPhone(phone);
        } else {
          setErrorMessage(errorsConfig.ERROR_PIN_NOT_VALID);
        }
      })
      .catch(error => {
        Bugsnag.notify('Error during token validation: ' + error);
        setErrorMessage(errorsConfig.ERROR_TRY_AGAIN_LATER);
      });
    setIsLoadingPIN(false);
  }

  return (
    <Carousel
      className="mt-12"
      totalSlides={2}
      dragEnabled={false}
      currentSlide={activeSlide}
      touchEnabled={false}
      disableKeyboard
    >
      <Container className="md:max-w-sm">
        <Text className="font-gtUltraThin text-xldr text-derma-primary text-center mb-4">
          Verificación de identidad
        </Text>
        <Text className="text-hg-black500 text-center text-sm mb-12">
          Escribe tu número de teléfono para validar por Whatsapp el acceso a tu
          receta
        </Text>

        <div className="relative mb-8">
          <label className="absolute left-20 top-[10px] z-10 pointer-events-none text-xs text-hg-black500">
            Número de teléfono
          </label>

          <PhoneInput
            defaultCountry="es"
            preferredCountries={['es']}
            value={formData.phone}
            forceDialCode
            inputClassName={
              showPhoneError !== null && !showPhoneError ? 'isComplete' : ''
            }
            onChange={(phone, country) => {
              handleFieldChange(phone, 'phone');
              handleFieldChange(`+${country.country.dialCode}`, 'phonePrefix');
              if (phone.length > 0 && phone !== '+34') {
                setShowPhoneError(!utils.validatePhoneInput(phone));
              }
            }}
          />

          {(showPhoneError !== null || errorMessage !== '') && (
            <Image
              src={`/images/forms/${
                showPhoneError ? 'error' : 'formCheck'
              }.svg`}
              alt="error"
              height={26}
              width={24}
              className="absolute top-4 right-3"
            />
          )}
          {showPhoneError && errorMessage === '' && (
            <p className="text-hg-error text-sm p-2">
              {errorsConfig.ERROR_PHONE_NOT_VALID}
            </p>
          )}
          {errorMessage !== '' && (
            <p className="text-hg-error text-sm p-2">{errorMessage}</p>
          )}
        </div>

        <Flex>
          <Button
            size="lg"
            type="derma"
            disabled={
              isEmpty(formData.phone) ||
              isEmpty(formData.phonePrefix) ||
              showPhoneError === true
            }
            className="w-full md:w-auto md:mx-auto"
            onClick={() => {
              if (
                !(
                  isEmpty(formData.phone) ||
                  isEmpty(formData.phonePrefix) ||
                  showPhoneError === true
                )
              ) {
                isDermaValidPhone();
              }
            }}
          >
            {isLoadingPhone ? <SvgSpinner /> : 'Continuar'}
          </Button>
        </Flex>
      </Container>

      <Container className="md:max-w-sm">
        <Text className="font-gtUltraThin text-xldr text-derma-primary text-center mt-12 md:mt-16 mb-4">
          Te hemos enviado un PIN
        </Text>
        <Text className="text-hg-black500 text-center text-sm mb-12">
          Al introducir el código recibido por Whatsapp al {formData.phone},
          confirmas tu autorización de acceso a la receta personalizada
        </Text>
        <div className="relative">
          <TextInputField
            inputClassName="text-derma-tertiary placeholder-hg-black300 text-lg tracking-widest font-bold mb-2"
            placeholder="______"
            disableBgIcons
            value={formData.pin}
            onChange={event => handleFieldChange(event.target.value, 'pin')}
            customValidation={() => formData.pin.length === 6}
          />
          {errorMessage !== '' && (
            <>
              <Image
                src="/images/forms/error.svg"
                alt="error"
                height={26}
                width={24}
                className="absolute top-5 right-4"
              />
              <p className="text-hg-error text-sm p-2 -mt-2">{errorMessage}</p>
            </>
          )}
        </div>

        {showResendPINMessage && (
          <Text className="bg-white rounded-2xl p-4 text-xs text-hg-black500">
            Te hemos reenviado el PIN al {formData.phone}.<br />
            Revisa tu teléfono móvil.
          </Text>
        )}
        <Text className="mt-2 mb-8 text-hg-black500 text-xs text-center">
          ¿No has recibido el código PIN?{' '}
          <span
            className="text-derma-primary cursor-pointer"
            onClick={() => resendPIN()}
          >
            Reenviar PIN
          </span>
        </Text>
        <Flex>
          <Button
            size="lg"
            type="derma"
            disabled={formData.pin.length !== 6}
            className="w-full md:w-auto md:mx-auto"
            onClick={() => isDermaValidPIN()}
          >
            {isLoadingPIN ? <SvgSpinner /> : 'Continuar'}
          </Button>
        </Flex>
      </Container>
    </Carousel>
  );
}
