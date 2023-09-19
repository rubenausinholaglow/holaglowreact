'use client';

import { useState } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';
import RegistrationForm from 'app/dashboard/RegistrationForm';
import { Client } from '@interface/client';
import * as utils from '@utils/validators';
import * as config from '@utils/textConstants';
import UserService from '@services/UserService';
import dayjs from 'dayjs';
import { Appointment } from '@interface/appointment';
import ScheduleService from '@services/ScheduleService';

export default function ConctactForm() {
  const router = useRouter();
  const { selectedTreatments } = useGlobalPersistedStore(state => state);
  const { selectedSlot } = useGlobalPersistedStore(state => state);
  const { selectedDay } = useGlobalPersistedStore(state => state);
  const { selectedClinic } = useGlobalPersistedStore(state => state);
  const [selectedTreatmentsNames, setSelectedTreatmentsNames] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Array<string>>([]);
  const { user } = useGlobalPersistedStore(state => state);
  const format = 'YYYY-MM-DD';
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
  const localSelectedDay = dayjs(selectedDay);
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

  const handleRegistration = async () => {
    await registerUser(formData);
  };

  const createAppointment = () => {
    const appointments = [];
    const ids = selectedTreatments!.map(x => x.flowwwId).join(', ');
    appointments.push({
      box: selectedSlot!.box,
      endTime: selectedDay!.format(format) + ' ' + selectedSlot!.endTime,
      id: '0',
      startTime: selectedDay!.format(format) + ' ' + selectedSlot!.startTime,
      treatment: ids,
      clientId: user?.flowwwToken,
      comment: '', //TODO: Pending
      treatmentText: '', //TODO: Pending
      referralId: '',
      externalReference: '', //TODO: Pending
      isPast: false,
      clinicId: selectedClinic,
      isCancelled: false,
    } as Appointment);
    ScheduleService.scheduleBulk(appointments).then(x => {
      router.push('/checkout/confirmation');
    });
  };
  const registerUser = async (formData: Client) => {
    setIsLoading(true);
    const isSuccess = await UserService.registerUser(formData);
    if (isSuccess) {
      createAppointment();
      setIsLoading(false);
    } else {
      handleRequestError([config.ERROR_REGISTRATION]);
      setIsLoading(false);
    }
  };
  const handleRequestError = (errors: Array<string>) => {
    localStorage.clear();
    setErrors(errors);
  };
  if (selectedTreatments && selectedTreatments.length > 0) {
    setSelectedTreatmentsNames(
      selectedTreatments!.map(x => x.title).join(' + ')
    );
  }
  return (
    <Flex layout="col-center">
      {localSelectedDay != undefined && (
        <Flex>
          Su cita para una {selectedTreatmentsNames} está confirmada para este{' '}
          <b>
            {' '}
            {localSelectedDay.format('dddd')}, {localSelectedDay.format('D')} de{' '}
            {localSelectedDay.format('MMMM')} {selectedSlot?.startTime}
          </b>
        </Flex>
      )}
      <RegistrationForm
        formData={formData}
        handleFieldChange={handleFormFieldChange}
        handleContinue={handleContinue}
        errors={errors}
        isLoading={isLoading}
      ></RegistrationForm>
    </Flex>
  );
}
