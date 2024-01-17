'use client';

import 'react-phone-input-2/lib/style.css';
import 'app/(web)/checkout/contactform/phoneInputStyle.css';

import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Bugsnag from '@bugsnag/js';
import TextInputField from '@dashboardComponents/TextInputField';
import AuthenticationService from '@services/AuthtenticationService';
import * as errorsConfig from '@utils/textConstants';
import { validatePhoneInput } from '@utils/validators';
import { poppins } from 'app/fonts';
import { SvgSpinner } from 'app/icons/Icons';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import Image from 'next/image';

import MainLayout from '../components/layout/MainLayout';
import SupportLaboralTime from './SupportLaboralTime';
import SupportNonLaboralTime from './SupportNonLaboralTime';

export default function SupportPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPhoneError, setShowPhoneError] = useState<null | boolean>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDaytime, setIsDaytime] = useState(false);
  const [isTokenSended, setIstokenSended] = useState(false);
  const [AuthSuccesfully, setAuthSuccesfully] = useState(false);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<null | string>('');

  useEffect(() => {
    setIsDaytime(isBetween10and19);
  }, []);

  function handlePhoneChange(event: any, country: any, value: string) {
    setErrorMessage('');
    if (
      event &&
      event.nativeEvent &&
      (event.nativeEvent.inputType || event.nativeEvent.type == 'click')
    ) {
      setPhoneNumber(value);
      event.target.value = '+' + country.dialCode;
    } else {
      if (value.startsWith('34')) value = value.substring(2, value.length);
      event.target.value = '+34' + value;
      setPhoneNumber(value);
      event.target.value = '+34';
    }
    const phoneError = validatePhoneInput(`+${value}`);
    setShowPhoneError(phoneError);
    if (phoneError) {
      setErrorMessage(errorsConfig.ERROR_PHONE_NOT_VALID);
    }
  }

  async function handleContinue() {
    setErrorMessage('');
    setIsLoading(true);
    let finalPhoneNumber = '';
    finalPhoneNumber = phoneNumber;
    if (phoneNumber.length > 9) {
      finalPhoneNumber = phoneNumber.substring(2);
    }
    await AuthenticationService.isValidLoginSupport24Hours(finalPhoneNumber)
      .then(response => {
        if (response) {
          setIstokenSended(true);
        } else {
          setErrorMessage('No tiene ningún tratamiento activo');
        }
      })
      .catch(error => {
        Bugsnag.notify('Error during authentication: ' + error);
        setErrorMessage('Error durante la autenticación: ' + error);
      });
    setIsLoading(false);
  }

  const getAccessToken = async () => {
    try {
      const response = await AuthenticationService.getAccessToken(token);
      if (response) {
        setAccessToken(response);
        setAuthSuccesfully(true);
      } else {
        setErrorMessage('Error generando respuesta token');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      setErrorMessage('Error durante la autenticación: ' + error);
    }
  };

  const isBetween10and19 = () => {
    const currentDay = new Date().getDay();
    const currentHour = new Date().getHours();

    return (
      currentDay >= 1 &&
      currentDay <= 5 &&
      currentHour >= 10 &&
      currentHour < 19
    );
  };
  async function handleValidateToken() {
    setIsLoading(true);
    setErrorMessage('');
    await AuthenticationService.isValidToken(token)
      .then(async response => {
        if (response) {
          if (!isDaytime) {
            await getAccessToken();
          } else {
            setAuthSuccesfully(true);
          }
          setIsLoading(false);
        } else {
          setErrorMessage('Token incorrecto o caducado');
        }
      })
      .catch(error => {
        Bugsnag.notify('Error during token validation: ' + error);
        setErrorMessage('Error durante la validación del token: ' + error);
      });
    setIsLoading(false);
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-center h-screen bg-[#F3EDE9]">
        <div className="py-12 md:py-20 text-center">
          <p className="mt-4 text-gray-700">Soporte disponible las 24 horas.</p>
          {!AuthSuccesfully && !isTokenSended && (
            <>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mt-4 mb-4"
              >
                Escriba su número de teléfono para verificar que tiene un
                tratamiento con nosotros.
              </label>
              <div className="relative">
                <PhoneInput
                  disableSearchIcon={true}
                  countryCodeEditable={true}
                  inputClass={`${poppins.className}`}
                  inputStyle={{
                    borderColor: 'white',
                    width: '100%',
                    height: '44px',
                    paddingLeft: '65px',
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
                  value={phoneNumber}
                  onChange={(value, data, event) => {
                    handlePhoneChange(event, data, value);
                  }}
                />
                {showPhoneError !== null && (
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
              </div>
              <div>
                <Button className="mt-6" onClick={handleContinue}>
                  {isLoading ? (
                    <SvgSpinner height={24} width={24} />
                  ) : (
                    <>Continuar</>
                  )}
                </Button>
              </div>
            </>
          )}
          {isTokenSended && !AuthSuccesfully && (
            <div className="relative">
              <p className="mt-6 text-gray-700 mb-6">
                Introduzca el Token que se la envíado
              </p>
              <TextInputField
                placeholder="Escriba el Token"
                value={token}
                onChange={(e: any) => setToken(e.target.value)}
                hasNoValidation
              />
              <Button className="mt-6" onClick={handleValidateToken}>
                {isLoading ? (
                  <SvgSpinner height={24} width={24} />
                ) : (
                  <>Validar</>
                )}
              </Button>
            </div>
          )}
          {errorMessage && <p className="text-red-500 mt-6">{errorMessage}</p>}
          {AuthSuccesfully && (
            <>
              {isDaytime ? (
                <SupportLaboralTime />
              ) : (
                <SupportNonLaboralTime token={accessToken!} />
              )}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
