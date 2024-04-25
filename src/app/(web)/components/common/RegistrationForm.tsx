'use client';

import 'react-phone-input-2/lib/style.css';
import 'app/(web)/checkout/contactform/phoneInputStyle.css';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import * as errorsConfig from '@utils/textConstants';
import useRoutes from '@utils/useRoutes';
import { useRegistration, validFormData } from '@utils/userUtils';
import { postalCodeValidationRegex, validateEmail } from '@utils/validators';
import * as utils from '@utils/validators';
import { poppins } from 'app/fonts';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgCheckSquare, SvgCheckSquareActive } from 'app/icons/IconsDs';
import { Client } from 'app/types/client';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { isValidNie, isValidNif } from 'nif-dni-nie-cif-validation';

import TextInputField from '../../../(dashboard)/dashboard/components/TextInputField';
import { RegistrationFormProps } from '../../../utils/props';

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  redirect = false,
  isDashboard = false,
  hasContinueButton = true,
  isEmbed = false,
  page = '',
  initialValues,
  setClientData,
  setContinueDisabled = undefined,
  showPostalCode = false,
  showCity = false,
  showAddress = false,
  showDni = false,
  className = '',
  splitSurnames = false,
  showBirthday = false,
}: {
  redirect?: boolean;
  isDashboard?: boolean;
  hasContinueButton?: boolean;
  isEmbed?: boolean;
  page?: string;
  initialValues?: Client;
  setClientData?: Dispatch<SetStateAction<Client>>;
  setContinueDisabled?: Dispatch<SetStateAction<boolean>>;
  showPostalCode?: boolean;
  showCity?: boolean;
  showAddress?: boolean;
  showDni?: boolean;
  className?: string;
  splitSurnames?: boolean;
  showBirthday?: boolean;
}) => {
  const routes = useRoutes();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [showPhoneError, setShowPhoneError] = useState<null | boolean>(null);
  const [showEmailError, setShowEmailError] = useState<null | boolean>(null);
  const [showBirthdayError, setShowBirthdayError] = useState<null | boolean>(
    null
  );
  const [showPostalCodeError, setShowPostalCodeError] = useState<
    null | boolean
  >(null);
  const [showDniError, setShowDniError] = useState<null | boolean>(null);

  const [formData, setFormData] = useState<Client>({
    email: '',
    phone: '',
    phonePrefix: '',
    name: '',
    surname: '',
    secondSurname: '',
    termsAndConditionsAccepted: false,
    receiveCommunications: false,
    page: page ?? '',
    externalReference: '',
    analyticsMetrics: {
      device: 0,
      locPhysicalMs: '',
      utmAdgroup: '',
      utmCampaign: '',
      utmContent: '',
      utmMedium: '',
      utmSource: '',
      utmTerm: '',
      treatmentText: '',
      externalReference: '',
      interestedTreatment: '',
      treatmentPrice: 0,
    },
    interestedTreatment: '',
    treatmentPrice: 0,
    postalCode: '',
    origin: '',
    city: '',
    address: '',
    dni: '',
  });

  useEffect(() => {
    if (initialValues) {
      initialValues.surname = initialValues.lastName;
      initialValues.termsAndConditionsAccepted =
        initialValues.name.length > 0 && initialValues.secondSurname.length > 0;
      setFormData(initialValues);
    }
  }, []);

  const registerUser = useRegistration(
    formData,
    isDashboard,
    redirect,
    isEmbed
  );

  useEffect(() => {
    if (
      !isEmpty(formData.name) &&
      !isEmpty(formData.surname) &&
      !isEmpty(formData.email) &&
      !isEmpty(formData.phone) &&
      formData.termsAndConditionsAccepted &&
      ((!isEmpty(formData.postalCode) && showPostalCode) || !showPostalCode) &&
      ((!isEmpty(formData.city) && showCity) || !showCity) &&
      ((!isEmpty(formData.address) && showAddress) || !showAddress) &&
      ((!isEmpty(formData.dni) && showDni) || !showDni) &&
      ((!isEmpty(formData.birthday) && showBirthday) || !showBirthday) &&
      !showPhoneError &&
      !showEmailError &&
      !showPostalCodeError &&
      !showDniError &&
      !showBirthdayError
    ) {
      setIsDisabled(false);
      if (setContinueDisabled) setContinueDisabled(false);
    } else {
      setIsDisabled(true);
      if (setContinueDisabled) setContinueDisabled(true);
    }
  }, [
    formData,
    showPhoneError,
    showEmailError,
    showDniError,
    showPostalCodeError,
    showBirthdayError,
  ]);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    let value: string | boolean | number | undefined =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    if (field === 'phonePrefix' && typeof value === 'number') {
      value = `+${value as number}`;
    }

    if (field === 'phone' && typeof value === 'number' && value === 0) {
      value = undefined;
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (setClientData) setClientData(formData);
  }, [formData]);

  const handleContinue = async () => {
    setIsLoading(true);

    const requiredFields = ['email', 'phone', 'name', 'surname'];
    const isEmailValid = utils.validateEmail(formData.email);

    const isValidDni =
      !showDni ||
      isValidNif(formData.dni.toUpperCase()) ||
      isValidNie(formData.dni.toUpperCase());
    if (validFormData(formData, errors) && isValidDni) {
      setErrors([]);
      await handleRegistration();
    } else {
      const errorMessages = [];

      if (!isEmailValid && formData['email'].length > 0) {
        errorMessages.push(errorsConfig.ERROR_EMAIL_NOT_VALID);
      }
      if (requiredFields.some(field => formData[field] === '')) {
        errorMessages.push(errorsConfig.ERROR_MISSING_FIELDS);
      }
      if (!formData.termsAndConditionsAccepted) {
        errorMessages.push(errorsConfig.ERROR_TERMS_CONDITIONS_UNACCEPTED);
      }

      handleRequestError(errorMessages);
    }

    setIsLoading(false);
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

    setShowPhoneError(utils.validatePhoneInput(`+${value}`));
  }

  const handleRegistration = async () => {
    await registerUser(formData, isDashboard, redirect, true);
  };

  const handleRequestError = (errors: Array<string>) => {
    localStorage.clear();
    setErrors(errors);
  };

  return (
    <div
      className={`grid grid-cols-1 gap-4 w-full ${className ? className : ''}`}
    >
      <TextInputField
        placeholder="Nombre"
        value={formData.name}
        onChange={event => handleFieldChange(event, 'name')}
      />
      {!splitSurnames && (
        <TextInputField
          placeholder="Apellidos"
          value={formData.surname}
          onChange={event => handleFieldChange(event, 'surname')}
        />
      )}

      {splitSurnames && (
        <>
          <TextInputField
            placeholder="Primer apellido"
            value={formData.surname}
            onChange={event => handleFieldChange(event, 'surname')}
          />
          <TextInputField
            placeholder="Segundo apellido"
            value={formData.secondSurname}
            onChange={event => handleFieldChange(event, 'secondSurname')}
          />
        </>
      )}
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
          value={formData.phone}
          onChange={(value, data, event) => {
            handlePhoneChange(event, data, value);
          }}
        />
        {showPhoneError !== null && (
          <Image
            src={`/images/forms/${showPhoneError ? 'error' : 'formCheck'}.svg`}
            alt="error"
            height={26}
            width={24}
            className="absolute top-4 right-3"
          />
        )}
        {showPhoneError && (
          <p className="text-hg-error text-sm p-2">
            {errorsConfig.ERROR_PHONE_NOT_VALID}
          </p>
        )}
      </div>
      {showDni && (
        <>
          <TextInputField
            placeholder="DNI/NIE"
            value={formData.dni!}
            onChange={event => {
              handleFieldChange(event, 'dni');
              const isValidDni =
                !showDni ||
                isValidNif(event.target.value.toUpperCase()) ||
                isValidNie(event.target.value.toUpperCase());
              setShowDniError(!isValidDni);
            }}
          />
          {showDniError && (
            <p className="text-hg-error text-sm p-2">
              {errorsConfig.ERROR_DNI_NOT_VALID}
            </p>
          )}
        </>
      )}
      {showBirthday && (
        <TextInputField
          label="¿Cuándo naciste?"
          labelClassName="absolute top-3 left-4 text-xs text-hg-black500"
          inputClassName="pt-[22px] text-derma-tertiary placeholder-hg-black300 w-full bg-white shadow-none"
          placeholder="Escribe aquí"
          type="date"
          value={formData?.birthday || ''}
          onChange={event => handleFieldChange(event, 'birthday')}
          disableBgIcons
        />
      )}
      {showPostalCode && (
        <>
          <TextInputField
            placeholder="Código Postal"
            value={formData.postalCode!}
            onChange={event => {
              handleFieldChange(event, 'postalCode');
              setShowPostalCodeError(
                !postalCodeValidationRegex.test(event.target.value)
              );
            }}
          />
          {showPostalCodeError && (
            <p className="text-hg-error text-sm p-2">
              {errorsConfig.ERROR_POSTALCODE_NOT_VALID}
            </p>
          )}
        </>
      )}
      {showCity && (
        <>
          <TextInputField
            placeholder="Ciudad"
            value={formData.city!}
            onChange={event => {
              handleFieldChange(event, 'city');
            }}
          />
        </>
      )}
      {showAddress && (
        <>
          <TextInputField
            placeholder="Dirección de entrega"
            value={formData.address!}
            onChange={event => {
              handleFieldChange(event, 'address');
            }}
          />
        </>
      )}
      <Flex layout="col-left" className="my-2 mb-4">
        <Flex
          layout="row-left"
          className={
            !formData.termsAndConditionsAccepted ? 'animate-shake' : ''
          }
        >
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
      {hasContinueButton && (
        <Button
          disabled={isDisabled}
          onClick={() => {
            if (!isLoading && !isDisabled) {
              handleContinue();
              if (isEmbed) {
                window.parent.postMessage(
                  routes.checkout.clinics,
                  'https://www.holaglow.com'
                );
              }
            }
          }}
          type="primary"
          size="xl"
          className="w-full"
        >
          {isLoading ? <SvgSpinner height={24} width={24} /> : 'Continuar'}
        </Button>
      )}
      {errors.includes(errorsConfig.ERROR_MISSING_FIELDS) && (
        <p className="text-red-500 text-left text-sm mt-2">
          {errorsConfig.ERROR_MISSING_FIELDS}
        </p>
      )}
    </div>
  );
};
export default RegistrationForm;
