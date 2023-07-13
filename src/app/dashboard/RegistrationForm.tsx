import '../globals.css';

import React from 'react';
import { Button } from 'components/Buttons/Buttons';
import { Container } from 'components/Layouts/Layouts';

import TextInputField from './components/TextInputField';
import { RegistrationFormProps } from './utils/props';

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData,
  handleFieldChange,
  handleContinue,
}) => {
  return (
    <Container>
      <h1 className="font-bold text-2xl mt-12 mb-6">
        ¡Vaya! ¿Todavía no te conocemos?
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TextInputField
          placeholder="Nombre*"
          value={formData.name}
          onChange={event => handleFieldChange(event, 'name')}
        />
        <TextInputField
          placeholder="Apellidos*"
          value={formData.surname}
          onChange={event => handleFieldChange(event, 'surname')}
        />
        <TextInputField
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={event => handleFieldChange(event, 'email')}
        />
        <TextInputField
          placeholder="Teléfono"
          value={formData.phone}
          onChange={event => handleFieldChange(event, 'phone')}
        />

        <div className="flex flex-col mt-2">
          <div className="flex items-center mb-2">
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
          </div>
          <div className="flex items-center">
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
          </div>
        </div>
        <Button onClick={handleContinue} style="primary">
          Continuar
        </Button>
      </div>
    </Container>
  );
};
export default RegistrationForm;
