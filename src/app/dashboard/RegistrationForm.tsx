import React from 'react';
import { RegistrationFormProps } from './types';
import TextInputField from './TextInputField';
import '../globals.css';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ formData, handleFieldChange, handleContinue, show }) => {
  return (
    <div id="Registro" className={`w-3/4 ${show ? '' : 'hidden'}`}>
      <div className="flex justify-center items-center">
        <div className="container">
          <div className="w-full p-8 my-4 md:px-12 rounded-2xl shadow-2xl bg-white">
            <div className="flex">
              <h1 className="font-bold uppercase text-2xl text-black justify-center">
                ¡Vaya! ¿Todavía no te conocemos?
              </h1>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <TextInputField
                label="Nombre*"
                value={formData.name}
                onChange={(event) => handleFieldChange(event, 'name')}
              />
              <TextInputField
                label="Primer Apellido*"
                value={formData.surname}
                onChange={(event) => handleFieldChange(event, 'surname')}
              />
              <TextInputField
                label="Segundo Apellido*"
                value={formData.secondSurname}
                onChange={(event) => handleFieldChange(event, 'secondSurname')}
              />
              <TextInputField
                label="Correo electrónico"
                value={formData.email}
                onChange={(event) => handleFieldChange(event, 'email')}
              />
              <TextInputField
                label="Teléfono"
                value={formData.phone}
                onChange={(event) => handleFieldChange(event, 'phone')}
              />
              <button
                onClick={handleContinue}
                className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 mt-2 rounded-lg w-full 
                focus:outline-none focus:shadow-outline"
              >
                Continuar
              </button>
              
              <div className="flex flex-col mt-2">
                <div className="flex items-center mb-2">
                  <label htmlFor="termsAndConditionsAccepted" className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="termsAndConditionsAccepted"
                      checked={formData.termsAndConditionsAccepted}
                      onChange={(event) => handleFieldChange(event, 'termsAndConditionsAccepted')}
                      className="mr-2 checkbox-blue"
                    />
                    <span className="text-sm text-gray-700">
                      Acepto términos y condiciones
                    </span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label htmlFor="receiveCommunications" className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      id="receiveCommunications"
                      checked={formData.receiveCommunications}
                      onChange={(event) => handleFieldChange(event, 'receiveCommunications')}
                      className="mr-2 checkbox-blue"
                    />
                    <span className="text-sm text-gray-700">
                      Quiero que me informéis de vuestras ofertas
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;