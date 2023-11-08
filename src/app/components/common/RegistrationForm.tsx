'use client';

import 'react-phone-input-2/lib/style.css';
import 'app/checkout/contactform/phoneInputStyle.css';

import { ChangeEvent, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { Client } from '@interface/client';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import * as errorsConfig from '@utils/textConstants';
import { phoneValidationRegex, validateEmail } from '@utils/validators';
import * as utils from '@utils/validators';
import { poppins } from 'app/fonts';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { SvgCheckSquare, SvgCheckSquareActive } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import TextInputField from '../../dashboard/components/TextInputField';
import { RegistrationFormProps } from '../../dashboard/utils/props';

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [showPhoneError, setShowPhoneError] = useState<null | boolean>(null);
  const [showEmailError, setShowEmailError] = useState<null | boolean>(null);

  const {
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
    selectedPacksTreatments,
    setCurrentUser,
  } = useGlobalPersistedStore(state => state);
  const { analyticsMetrics } = useSessionStore(state => state);

  const [formData, setFormData] = useState<Client>({
    email: '',
    phone: '',
    phonePrefix: '',
    name: '',
    surname: '',
    secondSurname: '',
    termsAndConditionsAccepted: false,
    receiveCommunications: false,
    page: '',
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
    },
    interestedTreatment: '',
    treatmentPrice: 0,
  });

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

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleContinue = async () => {
    const requiredFields = ['email', 'phone', 'name', 'surname'];
    const isEmailValid = utils.validateEmail(formData.email);
    const areAllFieldsFilled = requiredFields.every(
      field => formData[field] !== ''
    );

    if (
      areAllFieldsFilled &&
      isEmailValid &&
      formData.termsAndConditionsAccepted &&
      errors.length == 0
    ) {
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
  };

  function handlePhoneChange(
    event: any,
    country: any,
    formattedValue: string,
    value: string
  ) {
    if (event && event.nativeEvent && event.nativeEvent.inputType) {
      handleFieldChange(event, 'phone');
      event.target.value = '+' + country.dialCode;
      handleFieldChange(event, 'phonePrefix');
    } else {
      event.target.value = '+34' + value;
      handleFieldChange(event, 'phone');
      event.target.value = '+34';
      handleFieldChange(event, 'phonePrefix');
    }
  }

  const handleRegistration = async () => {
    await registerUser(formData);
  };

  const handleRequestError = (errors: Array<string>) => {
    localStorage.clear();
    setErrors(errors);
  };

  const registerUser = async (formData: Client) => {
    setIsLoading(true);
    const formDatacopy = { ...formData };
    formDatacopy.analyticsMetrics = analyticsMetrics;
    formDatacopy.phone = formData.phone
      .replace(formDatacopy.phonePrefix, '')
      .replaceAll(' ', '');
    formDatacopy.interestedTreatment = analyticsMetrics.treatmentText;
    if (analyticsMetrics.externalReference)
      formDatacopy.externalReference = analyticsMetrics.externalReference;
    const user = await UserService.registerUser(formDatacopy);
    if (user) {
      user.flowwwToken = user.clinicToken;
    }
    if (user) {
      setCurrentUser(user);
      if (selectedSlot && selectedClinic) {
        await ScheduleService.createAppointment(
          selectedTreatments,
          selectedSlot!,
          selectedDay,
          selectedClinic!,
          user,
          selectedPacksTreatments!,
          analyticsMetrics
        ).then(x => {
          router.push('/checkout/confirmation');
        });
      } else {
        router.push('/checkout/clinicas');
      }
    }
  };

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
          onChange={(value, data, event, formattedValue) => {
            handlePhoneChange(event, data, formattedValue, value);
          }}
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

            if (formData.phone === '+34') {
              setShowPhoneError(null);
            }
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
