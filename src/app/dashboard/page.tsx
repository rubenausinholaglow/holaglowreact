'use client';

import React, { useEffect, useState } from 'react';
import { Client } from '@interface/client';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import * as config from '@utils/textConstants';
import { ERROR_GETTING_DATA } from '@utils/textConstants';
import * as utils from '@utils/validators';
import { useRouter } from 'next/navigation';

import RegistrationForm from './RegistrationForm';
import SearchUser from './SearchUser';

export default function Page() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [formData, setFormData] = useState<Client>({
    email: '',
    phone: '',
    name: '',
    surname: '',
    secondSurname: '',
    termsAndConditionsAccepted: false,
    receiveCommunications: false,
    page: '',
    externalReference: '14',
    analyticsMetrics: {
      device: 0,
      locPhysicalMs: '',
      utmAdgroup: '',
      utmCampaign: '',
      utmContent: '',
      utmMedium: '',
      utmSource: '',
      utmTerm: '',
    },
    interestedTreatment: '',
    treatmentPrice: 0,
  });

  useEffect(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('ClinicId');
    localStorage.removeItem('ClinicProfessionalId');
    localStorage.removeItem('id');
    localStorage.removeItem('flowwwToken');
  }, []);

  const handleCheckUser = async () => {
    setIsLoading(true);
    const isEmailValid = utils.validateEmail(userEmail);

    if (!isEmailValid) {
      handleRequestError([config.ERROR_EMAIL_NOT_VALID]);
      setIsLoading(false);
      return null;
    }

    await UserService.checkUser(userEmail)
      .then(data => {
        if (data && data !== '') {
          redirectPage(data.firstName, data.id, data.flowwwToken);
        } else {
          setIsLoading(false);
          handleSearchError();
        }
      })
      .catch(error => {
        setIsLoading(false);
        handleSearchError();
      });
  };

  const handleSearchError = async () => {
    handleRequestError([config.ERROR_AUTHENTICATION]);
    setUserEmail('');
    setShowRegistration(true);
  };

  const handleRegistration = async () => {
    await registerUser(formData);
  };

  const registerUser = async (formData: Client) => {
    setIsLoading(true);
    const isSuccess = await UserService.registerUser(formData);
    if (isSuccess) {
      redirectPage(formData.name, formData.id, formData.flowwwToken);
    } else {
      handleRequestError([config.ERROR_REGISTRATION]);
    }
  };

  async function redirectPage(name: string, id: string, flowwwToken: string) {
    try {
      const data = await ScheduleService.getClinicSchedule(flowwwToken);
      if (data != null) {
        localStorage.setItem('ClinicId', data.clinic.id);
        localStorage.setItem(
          'ClinicProfessionalId',
          data.clinicProfessional.id
        );
        saveUserDetails(name, id, flowwwToken);
        router.push('/dashboard/menu');
      } else {
        console.log('Error');
      }
    } catch (err) {
      console.error('Error redirecting to dashboard:', err);
    }
  }

  function saveUserDetails(name: string, id: string, flowwwToken: string) {
    localStorage.setItem('username', name);
    localStorage.setItem('id', id);
    localStorage.setItem('flowwwToken', flowwwToken);
  }

  const handleFormFieldChange = (
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

  const handleFieldEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setUserEmail(event.target.value);
  };

  const handleContinue = () => {
    setErrors([]);

    const requiredFields = ['email', 'phone', 'name', 'surname'];

    const isEmailValid = utils.validateEmail(formData.email);
    const isPhoneValid = utils.validatePhone(formData.phone);
    const areAllFieldsFilled = requiredFields.every(
      field => formData[field] !== ''
    );

    if (
      areAllFieldsFilled &&
      isEmailValid &&
      isPhoneValid &&
      formData.termsAndConditionsAccepted
    ) {
      handleRegistration();
    } else {
      const errorMessages = [];

      if (!isEmailValid && formData['email'].length > 0) {
        errorMessages.push(config.ERROR_EMAIL_NOT_VALID);
      }
      if (!isPhoneValid && formData['phone'].length > 0) {
        errorMessages.push(config.ERROR_PHONE_NOT_VALID);
      }
      if (requiredFields.some(field => formData[field] === '')) {
        errorMessages.push(config.ERROR_MISSING_FIELDS);
      }
      if (!formData.termsAndConditionsAccepted) {
        errorMessages.push(config.ERROR_TERMS_CONDITIONS_UNACCEPTED);
      }

      handleRequestError(errorMessages);
    }
  };

  const handleRequestError = (errors: Array<string>) => {
    localStorage.clear();
    setErrors(errors);
  };

  return (
    <div className="mt-8">
      {showRegistration ? (
        <RegistrationForm
          formData={formData}
          handleFieldChange={handleFormFieldChange}
          handleContinue={handleContinue}
          errors={errors}
          isLoading={isLoading}
        />
      ) : (
        <SearchUser
          email={userEmail}
          handleFieldChange={handleFieldEmailChange}
          handleCheckUser={handleCheckUser}
          errors={errors}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
