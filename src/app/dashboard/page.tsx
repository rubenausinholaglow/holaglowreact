'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Client } from './interface/client';
import RegistrationForm from './RegistrationForm';
import SearchUser from './SearchUser';
import * as utils from './utils/validators';
import * as config from './utils/textConstants';
import UserService from './utils/UserService';

export default function Page () {

  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const [searchUserEmail, setSearchUserEmail] = useState('');
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

    const isEmailValid = utils.validateEmail(searchUserEmail);

    if (!isEmailValid) {
      handleRequestError(config.ERROR_EMAIL_NOT_VALID, true);
      return null;
    }

    await UserService.checkUser(searchUserEmail)
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
    handleRequestError(config.ERROR_AUTHENTICATION, false);
    setSearchUserEmail('');
    setShow(true);
  };

  const handleRegistration = async () => {
    await registerUser(formData);
  };

  const registerUser = async (formData : Client) => {
    const isSuccess = await UserService.registerUser(formData);
    if (isSuccess) {
      redirectPage(formData.name);
    } else {
      handleRequestError(config.ERROR_REGISTRATION, false);
    }
  };

  const redirectPage = (name : string) => {
    localStorage.setItem('username', name);
    router.push('/dashboard/pages/welcome');
  }

  const handleFormFieldChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleFieldEmailChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setSearchUserEmail(event.target.value);
  };

  const handleContinue = () => {

    const requiredFields = ['email', 'phone', 'name', 'surname'];
    const isEmailValid = utils.validateEmail(formData.email);
    const isPhoneValid = utils.validatePhone(formData.phone);
    const areAllFieldsFilled = requiredFields.every(field => formData[field] !== '');

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
      handleRequestError(errorMessage,true);
    }
  };

  const handleRequestError = (error: string, show : boolean) => {
    localStorage.clear();
    console.log(error);
    setError(error);
    setShowPopup(show);
  };

  return (
    <section className='bg-hg-200 min-h-screen justify-center items-center'>
      <div className='flex flex-wrap justify-center items-center p-10'>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-red-500">{error}</p>
              <button
                className="text-blue-500 mt-4 px-4 py-2 rounded-lg bg-blue-200 hover:bg-blue-300 focus:outline-none"
                onClick={() => setShowPopup(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        <div className='w-full'>
          <Image className='mx-auto m-10' src='/images/dashboard/holaglow_white.png' height='200' width='950' alt='Holaglow'/>
        </div>
        <SearchUser email={searchUserEmail} handleFieldChange={handleFieldEmailChange} handleCheckUser={handleCheckUser} />
        <RegistrationForm formData={formData} handleFieldChange={handleFormFieldChange} handleContinue={handleContinue} isVisible={show} />
      </div>
    </section>
  );
};