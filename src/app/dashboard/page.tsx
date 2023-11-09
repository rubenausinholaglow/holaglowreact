'use client';

import React, { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { useMessageSocket } from '@components/useMessageSocket';
import { Client } from '@interface/client';
import { MessageType } from '@interface/messageSocket';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import * as config from '@utils/textConstants';
import { ERROR_GETTING_DATA } from '@utils/textConstants';
import { clearLocalStorage } from '@utils/utils';
import * as utils from '@utils/validators';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { SvgSpinner } from 'icons/Icons';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

import RegistrationForm from '../components/common/RegistrationForm';
import AppointmentsListComponent from './Appointments';
import SearchUser from './SearchUser';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [showRegistration, setShowRegistration] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const messageSocket = useMessageSocket(state => state);
  const { setCurrentUser } = useGlobalPersistedStore(state => state);
  const {
    remoteControl,
    storedBoxId,
    storedClinicId,
    setBoxId,
    setClinicId,
    setRemoteControl,
  } = useGlobalPersistedStore(state => state);

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
      treatmentText: '',
      interestedTreatment: '',
      treatmentPrice: 0,
    },
    interestedTreatment: '',
    treatmentPrice: 0,
  });

  useEffect(() => {
    if (!remoteControl) {
      const existsMessageStartAppointment: any =
        messageSocket.messageSocket.filter(
          x => x.messageType == MessageType.StartAppointment
        );
      if (existsMessageStartAppointment.length > 0) {
        setIsLoadingUser(true);
        const finaldata = {
          ClinicId: existsMessageStartAppointment[0].ClinicId,
          BoxId: existsMessageStartAppointment[0].BoxId,
          FlowwwToken: existsMessageStartAppointment[0].FlowwwToken,
        };
        startAppointment(
          finaldata.ClinicId,
          finaldata.BoxId,
          finaldata.FlowwwToken
        );
        messageSocket.removeMessageSocket(existsMessageStartAppointment[0]);
      }
    }
  }, [messageSocket]);

  async function startAppointment(
    clinicId: string,
    boxId: string,
    flowwwToken: string
  ) {
    const guidClinic = localStorage.getItem('ClinicId') || '';
    const boxIdLocal = localStorage.getItem('BoxId') || '';

    if (
      guidClinic.toUpperCase() === clinicId.toUpperCase() &&
      String(boxId) === String(boxIdLocal)
    ) {
      await redirectPage('', '', flowwwToken);
    }

    setIsLoadingUser(false);
  }

  useEffect(() => {
    clearLocalStorage(false);
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    setBoxId(params.get('boxId') || '');
    setRemoteControl(params.get('remoteControl') == 'true');
    setClinicId(params.get('clinicId') || '');

    localStorage.setItem('ClinicId', params.get('clinicId') || '');
    localStorage.setItem('BoxId', params.get('boxId') || '');
  }, []);

  const handleCheckUser = async () => {
    setIsLoading(true);

    await UserService.checkUser(userEmail)
      .then(async data => {
        if (data && !isEmpty(data)) {
          setCurrentUser(data);
          await redirectPage(data.firstName, data.id, data.flowwwToken);
        } else {
          handleSearchError();
        }
      })
      .catch(error => {
        handleSearchError();
      });
    setIsLoading(false);
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
    const user = await UserService.registerUser(formData);
    if (user) {
      setCurrentUser(user);
      redirectPage(formData.name, formData.id, formData.flowwwToken);
      setIsLoading(false);
    } else {
      handleRequestError([config.ERROR_REGISTRATION]);
      setIsLoading(false);
    }
  };

  async function redirectPage(name: string, id: string, flowwwToken: string) {
    try {
      await ScheduleService.getClinicSchedule(flowwwToken).then(async data => {
        if (data != null) {
          localStorage.setItem('appointmentId', data.id);
          localStorage.setItem('appointmentFlowwwId', data.flowwwId ?? '');
          localStorage.setItem('ClinicId', data.clinic.id);
          localStorage.setItem('ClinicFlowwwId', data.clinic.flowwwId);
          localStorage.setItem(
            'ClinicProfessionalId',
            data.clinicProfessional.id
          );
          if (name == '') {
            name = data.lead.user.firstName;
            id = data.lead.user.id;
          }
          saveUserDetails(name, id, flowwwToken);
          if (remoteControl) {
            router.push('/dashboard/remoteControl');
          } else router.push('/dashboard/menu');
        } else {
          //TODO - Poner un mensaje de Error en UI
        }
      });
    } catch (err) {
      Bugsnag.notify(ERROR_GETTING_DATA + err);
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

  if (remoteControl)
    return (
      <MainLayout
        isDashboard
        hideBackButton
        hideContactButtons
        hideProfessionalSelector
      >
        <div className="w-full justify-center content-center px-11">
          <AppointmentsListComponent
            clinicId={storedClinicId}
            boxId={storedBoxId}
          />
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
            {isLoadingUser && <SvgSpinner />}
          </div>
        </div>
      </MainLayout>
    );

  if (!remoteControl)
    return (
      <MainLayout
        isDashboard
        hideBackButton
        hideContactButtons
        hideProfessionalSelector
      >
        <div className="fixed bottom-0 right-0 py-3 px-3">
          <Button
            onClick={() => setShowForm(!showForm)}
            type="tertiary"
            size="sm"
            className=""
          >
            Búsqueda Manual
          </Button>
        </div>
        {showForm && (
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
        )}
        {isLoadingUser && <SvgSpinner />}
      </MainLayout>
    );
}
