'use client';

import 'react-phone-input-2/lib/style.css';

import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import * as errorsConfig from '@utils/textConstants';
import { phoneValidationRegex } from '@utils/validators';
import { poppins } from 'app/fonts';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { SvgCheckSquare, SvgCheckSquareActive } from 'icons/IconsDs';
import { isEmpty } from 'lodash';

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

  useEffect(() => {
    if (
      !isEmpty(formData.name) &&
      !isEmpty(formData.surname) &&
      !isEmpty(formData.email) &&
      !isEmpty(formData.phone)
    ) {
      console.log('enable button!');
      setIsDisabled(false);
    }

    console.log(formData);
  }, [formData]);

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
        onChange={event => handleFieldChange(event, 'email')}
        error={
          errors.includes(errorsConfig.ERROR_EMAIL_NOT_VALID)
            ? errorsConfig.ERROR_EMAIL_NOT_VALID
            : ''
        }
      />
      <PhoneInput
        disableSearchIcon={true}
        countryCodeEditable={false}
        inputClass={`${poppins.className}`}
        inputStyle={{
          borderColor: 'white',
          width: '100%',
          height: '44px',
          paddingLeft: '65px',
          fontSize: '12px',
          lineHeight: '16px',
          fontStyle: 'normal',
          fontWeight: '400',
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
          handleFieldChange(event, 'phone')
        }
        isValid={value => {
          if (!phoneValidationRegex.test(value)) {
            return 'Invalid phone number format';
          }
          return true;
        }}
      />

      <Flex layout="col-left" className="my-2">
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
        {errors.includes(errorsConfig.ERROR_TERMS_CONDITIONS_UNACCEPTED) && (
          <p className="text-red-500 text-left text-sm mt-1">
            {errorsConfig.ERROR_TERMS_CONDITIONS_UNACCEPTED}
          </p>
        )}
        <Flex layout="row-left" className="mt-2 mb-12">
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
      </Flex>
    </div>
  );
};
export default RegistrationForm;
