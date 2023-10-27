'use client';

import 'react-phone-input-2/lib/style.css';

import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import * as errorsConfig from '@utils/textConstants';
import { phoneValidationRegex, validateEmail } from '@utils/validators';
import { poppins } from 'app/fonts';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { SvgCheckSquare, SvgCheckSquareActive } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import TextInputField from '../../dashboard/components/TextInputField';
import { RegistrationFormProps } from '../../dashboard/utils/props';

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData,
  handleFieldChange,
  handleContinue,
  errors,
  isLoading,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showEmailError, setShowEmailError] = useState<null | boolean>(null);

  useEffect(() => {
    if (
      !isEmpty(formData.name) &&
      !isEmpty(formData.surname) &&
      !isEmpty(formData.email) &&
      !isEmpty(formData.phone) &&
      !showPhoneError &&
      !showEmailError
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [formData, showPhoneError, showEmailError]);

  function handlePhoneChange(value: any, country: any, formattedValue: string) {
    handleFieldChange(value, 'phone');
    value.target.value = '+' + country.dialCode;
    handleFieldChange(value, 'phonePrefix');
  }

  return (
    <div className="grid grid-cols-1 gap-4 w-full">
      <TextInputField
        placeholder="Nombre"
        value={formData.name}
        onChange={event => handleFieldChange(event, 'name')}
        hasNoValidation
      />
      <TextInputField
        placeholder="Apellidos"
        value={formData.surname}
        onChange={event => handleFieldChange(event, 'surname')}
        hasNoValidation
      />
      <TextInputField
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={event => {
          handleFieldChange(event, 'email');

          if (formData.email.length === 0) {
            setShowEmailError(false);
          }
        }}
        error={
          (errors.includes(errorsConfig.ERROR_EMAIL_NOT_VALID) &&
            showEmailError) ||
          showEmailError
            ? errorsConfig.ERROR_EMAIL_NOT_VALID
            : ''
        }
        onBlur={() =>
          setShowEmailError(
            formData.email.length > 0 && !validateEmail(formData.email)
          )
        }
      />
      <div className="relative">
        <PhoneInput
          disableSearchIcon={true}
          countryCodeEditable={false}
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
            borderColor: HOLAGLOW_COLORS['black300'],
            borderRadius: '1rem',
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingBottom: '8px',
            paddingTop: '8px',
            height: '60px',
          }}
          placeholder="Número de teléfono"
          country={'es'}
          preferredCountries={['es']}
          value={formData.phone}
          onChange={(value, data, event, formattedValue) =>
            handlePhoneChange(event, data, formattedValue)
          }
          onBlur={() => {
            if (
              formData.phone.length > 3 &&
              formData.phone.startsWith('+34') &&
              !phoneValidationRegex.test(
                formData.phone.replace(/\D/g, '').slice(-9)
              )
            ) {
              setShowPhoneError(true);
            } else {
              setShowPhoneError(false);
            }
          }}
        />
        {showPhoneError && (
          <>
            <Image
              src="/images/forms/error.svg"
              alt="error"
              height={26}
              width={24}
              className="absolute top-4 right-3"
            />
            <p className="text-hg-error text-sm p-2">
              {errorsConfig.ERROR_PHONE_NOT_VALID}
            </p>
          </>
        )}
      </div>

      <Flex layout="col-left" className="my-2 mb-6">
        <Flex layout="row-left">
          <label
            htmlFor="termsAndConditionsAccepted"
            className="flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="termsAndConditionsAccepted"
              checked={formData.termsAndConditionsAccepted}
              onChange={event =>
                handleFieldChange(event, 'termsAndConditionsAccepted')
              }
              className="hidden"
            />
            {formData.termsAndConditionsAccepted ? (
              <SvgCheckSquareActive className="mr-2" />
            ) : (
              <SvgCheckSquare className="mr-2" />
            )}
            <span className="text-sm text-gray-700">
              Acepto términos y condiciones
            </span>
          </label>
        </Flex>
        <Flex layout="row-left" className="mt-2">
          <label
            htmlFor="receiveCommunications"
            className="flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="receiveCommunications"
              checked={formData.receiveCommunications}
              onChange={event =>
                handleFieldChange(event, 'receiveCommunications')
              }
              className="hidden"
            />
            {formData.receiveCommunications ? (
              <SvgCheckSquareActive className="mr-2" />
            ) : (
              <SvgCheckSquare className="mr-2" />
            )}
            <span className="text-sm text-gray-700">
              Quiero que me informéis de vuestras ofertas
            </span>
          </label>
        </Flex>
        {errors.includes(errorsConfig.ERROR_TERMS_CONDITIONS_UNACCEPTED) &&
          !formData.termsAndConditionsAccepted && (
            <Flex className="text-hg-error text-left text-sm py-2 px-3 bg-hg-error100 mt-2 w-full rounded-md">
              <Image
                src="/images/forms/error.svg"
                alt="error"
                height={16}
                width={16}
                className="mr-2"
              />
              {errorsConfig.ERROR_TERMS_CONDITIONS_UNACCEPTED}
            </Flex>
          )}
      </Flex>

      <Button
        disabled={isDisabled}
        onClick={handleContinue}
        type="primary"
        size="xl"
        className="w-full"
      >
        {isLoading ? <SvgSpinner height={24} width={24} /> : 'Continuar'}
      </Button>
      {errors.includes(errorsConfig.ERROR_MISSING_FIELDS) && (
        <p className="text-red-500 text-left text-sm mt-2">
          {errorsConfig.ERROR_MISSING_FIELDS}
        </p>
      )}
    </div>
  );
};
export default RegistrationForm;
