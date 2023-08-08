import '../globals.css';

import React from 'react';
import * as errorsConfig from '@utils/textConstants';
import { Button } from 'components/Buttons/Buttons';
import { Container, Flex } from 'components/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';

import TextInputField from './components/TextInputField';
import { RegistrationFormProps } from './utils/props';

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData,
  handleFieldChange,
  handleContinue,
  errors,
  isLoading,
}) => {
  return (
    <Container>
      <h1 className="font-semibold text-xl mb-6">
        ¡Vaya! ¿Todavía no te conocemos?
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInputField
          label="Nombre*"
          placeholder="Nombre"
          value={formData.name}
          onChange={event => handleFieldChange(event, 'name')}
        />
        <TextInputField
          label="Apellidos*"
          placeholder="Apellidos"
          value={formData.surname}
          onChange={event => handleFieldChange(event, 'surname')}
        />
        <TextInputField
          label="Correo electrónico*"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={event => handleFieldChange(event, 'email')}
          error={
            errors.includes(errorsConfig.ERROR_EMAIL_NOT_VALID)
              ? errorsConfig.ERROR_EMAIL_NOT_VALID
              : ''
          }
        />
        <TextInputField
          label="Teléfono*"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={event => handleFieldChange(event, 'phone')}
          error={
            errors.includes(errorsConfig.ERROR_PHONE_NOT_VALID)
              ? errorsConfig.ERROR_PHONE_NOT_VALID
              : ''
          }
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
                className="mr-2 checkbox-blue"
              />
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
                className="mr-2 checkbox-blue"
              />
              <span className="text-sm text-gray-700">
                Quiero que me informéis de vuestras ofertas
              </span>
            </label>
          </Flex>
        </Flex>
        <Flex layout="col-left">
          <Button onClick={handleContinue} style="primary">
            {isLoading ? <SvgSpinner height={24} width={24} /> : 'Continuar'}
          </Button>
          {errors.includes(errorsConfig.ERROR_MISSING_FIELDS) && (
            <p className="text-red-500 text-left text-sm mt-2">
              {errorsConfig.ERROR_MISSING_FIELDS}
            </p>
          )}
        </Flex>
      </div>
    </Container>
  );
};
export default RegistrationForm;
