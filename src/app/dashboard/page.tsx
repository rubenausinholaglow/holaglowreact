'use client';

import React, { useEffect, useState } from 'react';
import { Client } from '@interface/client';
import UserService from '@services/UserService';
import * as config from '@utils/textConstants';
import * as utils from '@utils/validators';
import { useRouter } from 'next/navigation';

import RegistrationForm from './RegistrationForm';
import SearchUser from './SearchUser';

export default function Page() {
  const router = useRouter();

  const [error, setError] = useState('');
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
  }, []);

  const handleCheckUser = async () => {
    const isEmailValid = utils.validateEmail(userEmail);

    if (!isEmailValid) {
      handleRequestError(config.ERROR_EMAIL_NOT_VALID);
      return null;
    }

    await UserService.checkUser(userEmail)
      .then(data => {
        if (data && data !== '') {
          redirectPage(data.name);
        } else {
          handleSearchError();
        }
      })
      .catch(error => {
        handleSearchError();
      });
  };

  const handleSearchError = async () => {
    handleRequestError(config.ERROR_AUTHENTICATION);
    setUserEmail('');
    setShowRegistration(true);
  };

  const handleRegistration = async () => {
    await registerUser(formData);
  };

  const registerUser = async (formData: Client) => {
    const isSuccess = await UserService.registerUser(formData);
    if (isSuccess) {
      redirectPage(formData.name);
    } else {
      handleRequestError(config.ERROR_REGISTRATION);
    }
  };

  const redirectPage = (name: string) => {
    localStorage.setItem('username', name);
    router.push('/dashboard/welcome');
  };

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
    const requiredFields = ['email', 'phone', 'name', 'surname'];
    const isEmailValid = utils.validateEmail(formData.email);
    const isPhoneValid = utils.validatePhone(formData.phone);
    const areAllFieldsFilled = requiredFields.every(
      field => formData[field] !== ''
    );

    if (areAllFieldsFilled && isEmailValid && isPhoneValid) {
      handleRegistration();
    } else {
      let errorMessage = '';
      if (!isEmailValid) {
        errorMessage = config.ERROR_EMAIL_NOT_VALID;
      } else if (!isPhoneValid) {
        errorMessage = config.ERROR_PHONE_NOT_VALID;
      } else {
        errorMessage = config.ERROR_MISSING_FIELDS;
      }
      handleRequestError(errorMessage);
    }
  };

  const handleRequestError = (error: string) => {
    localStorage.clear();
    setError(error);
  };

  return (
    <>
      {showRegistration ? (
        <RegistrationForm
          formData={formData}
          handleFieldChange={handleFormFieldChange}
          handleContinue={handleContinue}
        />
      ) : (
        <SearchUser
          email={userEmail}
          handleFieldChange={handleFieldEmailChange}
          handleCheckUser={handleCheckUser}
          error={error}
        />
      )}
    </>
  );
}
