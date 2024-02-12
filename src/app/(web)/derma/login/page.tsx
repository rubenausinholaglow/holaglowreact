'use client';

import 'react-phone-input-2/lib/style.css';
import 'app/(web)/checkout/contactform/phoneInputStyle.css';

import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Bugsnag from '@bugsnag/js';
import TextInputField from '@dashboardComponents/TextInputField';
import AuthenticationService from '@services/AuthenticationService';
import { HOLAGLOW_COLORS } from '@utils/colors';
import * as errorsConfig from '@utils/textConstants';
import { phoneValidationRegex } from '@utils/validators';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { poppins } from 'app/fonts';
import { SvgSpinner } from 'app/icons/Icons';
import { Button } from 'designSystem/Buttons/Buttons';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

export default function Login() {
  const [formData, setFormData] = useState({
    phone: '',
    phonePrefix: '',
    pin: '',
  });

  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoadingPhone, setIsLoadingPhone] = useState(false);
  const [isLoadingPIN, setIsLoadingPIN] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPhoneError, setShowPhoneError] = useState<null | boolean>(null);
  const [showResendPINMessage, setShowResendPINMessage] = useState(false);
  const [showUpselling, setShowUpselling] = useState(false);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = event.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === 'pin') {
      setErrorMessage('');
    }
  };

  function handlePhoneChange(event: any, country: any, value: string) {
    if (
      event &&
      event.nativeEvent &&
      (event.nativeEvent.inputType || event.nativeEvent.type == 'click')
    ) {
      handleFieldChange(event, 'phone');
      event.target.value = '+' + country.dialCode;
      handleFieldChange(event, 'phonePrefix');
    } else {
      if (value.startsWith('34')) value = value.substring(2, value.length);
      event.target.value = '+34' + value;
      handleFieldChange(event, 'phone');
      event.target.value = '+34';
      handleFieldChange(event, 'phonePrefix');
    }

    validatePhoneInput(`+${value}`);
  }

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
        } else {
          console.log('error');
          setErrorMessage(errorsConfig.ERROR_PHONE_NOT_VALID);
          setActiveSlide(activeSlide + 1);
        }
      })
      .catch(error => {
        Bugsnag.notify('Error during token validation: ' + error);
        setErrorMessage(errorsConfig.ERROR_TRY_AGAIN_LATER);
        console.log('error random');
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
          setShowUpselling(true);
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

  function validatePhoneInput(phoneNumber: string) {
    if (
      phoneNumber.length > 3 &&
      phoneNumber.startsWith('+34') &&
      phoneValidationRegex.test(phoneNumber.replace(/\D/g, '').slice(-9))
    ) {
      setShowPhoneError(false);
    }

    if (
      phoneNumber.length > 3 &&
      phoneNumber.startsWith('+34') &&
      !phoneValidationRegex.test(phoneNumber.replace(/\D/g, '').slice(-9))
    ) {
      setShowPhoneError(true);
    }

    if (isEmpty(phoneNumber) || phoneNumber === '+' || phoneNumber === '+34') {
      setShowPhoneError(true);
    }
  }

  return (
    <DermaLayout className="bg-derma-secondary100" hideButton hideFooter>
      {!showUpselling && (
        <Carousel
          className="mt-12"
          totalSlides={2}
          dragEnabled={false}
          currentSlide={activeSlide}
          touchEnabled={false}
          disableKeyboard
        >
          <Container>
            <Text className="font-gtUltraThin text-drxl text-derma-primary text-center mb-4">
              Verificación de identidad
            </Text>
            <Text className="text-hg-black500 text-center text-sm mb-12">
              Escribe tu número de teléfono para validar por Whatsapp el acceso
              a tu receta
            </Text>

            <div className="relative mb-8">
              <label className="absolute left-20 top-[10px] z-10 pointer-events-none text-xs text-hg-black500">
                Número de teléfono
              </label>
              <PhoneInput
                disableSearchIcon={true}
                countryCodeEditable={true}
                inputClass={`${poppins.className}`}
                inputStyle={{
                  borderColor: 'white',
                  width: '100%',
                  height: '44px',
                  paddingLeft: '65px',
                  paddingTop: '12px',
                  fontSize: '16px',
                  lineHeight: '16px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  touchAction: 'manipulation',
                }}
                containerStyle={{
                  background: 'white',
                  border: '1px solid',
                  borderColor:
                    showPhoneError !== null && !showPhoneError
                      ? HOLAGLOW_COLORS['black']
                      : HOLAGLOW_COLORS['black300'],
                  borderRadius: '1rem',
                  paddingLeft: '16px',
                  paddingRight: '12px',
                  paddingBottom: '8px',
                  paddingTop: '8px',
                  height: '60px',
                }}
                placeholder="Número de teléfono"
                country={'es'}
                preferredCountries={['es']}
                value={formData.phone}
                onChange={(value, data, event) => {
                  handlePhoneChange(event, data, value);
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

            <Button
              size="lg"
              type="derma"
              disabled={
                isEmpty(formData.phone) ||
                isEmpty(formData.phonePrefix) ||
                showPhoneError === true
              }
              className="w-full"
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
          </Container>

          <Container>
            <Text className="font-gtUltraThin text-drxl text-derma-primary text-center mt-12 md:mt-16 mb-4">
              Te hemos enviado un PIN
            </Text>
            <Text className="text-hg-black500 text-center text-sm mb-12">
              Al introducir el código recibido por Whatsapp al {formData.phone},
              confirmas tu autorización de acceso a la receta personalizada
            </Text>
            <TextInputField
              inputClassName="text-derma-tertiary placeholder-hg-black300 text-lg tracking-widest font-bold mb-2"
              placeholder="______"
              disableBgIcons
              value={formData.pin}
              onChange={event => handleFieldChange(event, 'pin')}
              customValidation={() => formData.pin.length === 6}
            />
            {errorMessage !== '' && (
              <p className="text-hg-error text-sm p-2 -mt-2">{errorMessage}</p>
            )}

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

            <Button
              size="lg"
              type="derma"
              disabled={formData.pin.length !== 6}
              className="w-full"
              onClick={() => isDermaValidPIN()}
            >
              {isLoadingPIN ? <SvgSpinner /> : 'Continuar'}
            </Button>
          </Container>
        </Carousel>
      )}

      {showUpselling && <Container>Upselling</Container>}
    </DermaLayout>
  );
}
