'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Client } from './types';
import RegistrationForm from './RegistrationForm';
import SearchUser from './SearchUser';

import * as utils from './utils';
import * as config from './config';

const { API_URL } = config;

export default function Page () {

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
    localStorage.clear();
  }, []);

  const handleCheckUser = async () => {
    await checkUser(searchUserEmail);
	};

  const checkUser = async (email : string) => {
    const isEmailValid = utils.validateEmail(email);
  
    if (!isEmailValid) {
      handleRequestError(config.ERROR_EMAIL_NOT_VALID, true);
      return null;
    }
  
    try {
      const res = await fetch(`${API_URL.login}?search=${email}`);
      if (res.ok) {
        const data = await res.json();
        redirectPage(data.name);
      } else {
        handleSearchError();
      }
    } catch (err) {
      handleSearchError();
    }
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
    try {
      const res = await fetch(API_URL.newuser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        redirectPage(formData.name);
      } else {
        handleRequestError(config.ERROR_REGISTRATION, false);
      }
    } catch (err) {
      handleRequestError(config.ERROR_REGISTRATION, false);
    }
  };

  const redirectPage = (name : string) => {
    localStorage.setItem('username', name);
    window.location.href = '/dashboard/welcome';
  }

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
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

    const requiredFields = ['email', 'phone', 'name', 'surname', 'secondSurname'];
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
        <RegistrationForm formData={formData} handleFieldChange={handleFieldChange} handleContinue={handleContinue} show={show} />
      </div>
    </section>
 
  );
};