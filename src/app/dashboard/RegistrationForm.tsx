import React from 'react';
import { RegistrationFormProps } from './types';
import TextInputField from './TextInputField';

const RegistrationForm: React.FC<RegistrationFormProps> = ({ formData, handleFieldChange, handleContinue, error, show }) => {
  
  return (
    <div id="Registro" className={`w-3/4 ${show ? '' : 'hidden'}`}>
    <div className="flex justify-center items-center">
      <div className="container">
          <div className="w-full p-8 my-4 md:px-12 rounded-2xl shadow-2xl bg-white">
            <div className="flex">
                <h1 className="font-bold uppercase text-2xl text-black justify-center">¡Vaya! ¿Todavía no te conocemos?</h1>
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

              <button onClick={handleContinue} className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 mt-2 rounded-lg w-full 
                focus:outline-none focus:shadow-outline">
                  Continuar
              </button>
          
            </div>
          
          </div>
      </div>
    </div>
  </div>
  );
};

export default RegistrationForm;
