'use client';

import './phoneInputStyle.css';

import { useEffect, useState } from 'react';
import { Appointment } from '@interface/appointment';
import { Client } from '@interface/client';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import * as config from '@utils/textConstants';
import * as utils from '@utils/validators';
import RegistrationForm from 'app/components/common/RegistrationForm';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCalendar, SvgLocation } from 'icons/Icons';
import { useRouter } from 'next/navigation';

dayjs.locale(spanishConf);

export default function ConctactForm() {
  const router = useRouter();
  const { selectedTreatments, selectedSlot, selectedDay, selectedClinic } =
    useGlobalPersistedStore(state => state);
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

  useEffect(() => {
    if (selectedTreatments && selectedTreatments.length > 0) {
      setSelectedTreatmentsNames(
        selectedTreatments!.map(x => x.title).join(' + ')
      );
    }
  }, []);

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
    const areAllFieldsFilled = requiredFields.every(
      field => formData[field] !== ''
    );

    if (
      areAllFieldsFilled &&
      isEmailValid &&
      formData.termsAndConditionsAccepted
    ) {
      handleRegistration();
    } else {
      const errorMessages = [];

      if (!isEmailValid && formData['email'].length > 0) {
        errorMessages.push(config.ERROR_EMAIL_NOT_VALID);
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
    const appointments: Appointment[] = [];
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
      clinicId: selectedClinic?.flowwwId,
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

  return (
    <MainLayout isCheckout>
      <Container className="p-0 md:px-4">
        <Flex layout="col-left" className="mt-9 md:mt-16 md:flex-row items-end">
          <div className="w-full md:w-1/2 bg-hg-black50 p-8 rounded-xl ">
            <Flex layout="col-left" className="gap-6">
              <Title size="xl" className="font-semibold">
                Reserva tu cita
              </Title>
              {localSelectedDay != undefined && (
                <>
                  <Text size="sm">
                    Introduce tus datos de contacto para la cita de{' '}
                    <span className="font-semibold w-full">
                      {selectedTreatmentsNames}
                    </span>
                  </Text>
                  {selectedClinic && (
                    <Flex className="">
                      <span>
                        <SvgLocation />
                      </span>
                      <Text size="xs" className="w-full text-left pl-2">
                        {selectedClinic.address}, {selectedClinic.city}
                      </Text>
                    </Flex>
                  )}
                  <Flex>
                    <span>
                      <SvgCalendar />
                    </span>
                    <Text
                      size="xs"
                      className="w-full text-left pl-2 capitalize"
                    >
                      {localSelectedDay.format('dddd')},{' '}
                      {localSelectedDay.format('D')} de{' '}
                      {localSelectedDay.format('MMMM')}{' '}
                      {selectedSlot?.startTime}
                    </Text>
                  </Flex>
                </>
              )}
              <RegistrationForm
                formData={formData}
                handleFieldChange={handleFormFieldChange}
                handleContinue={handleContinue}
                errors={errors}
                isLoading={isLoading}
              ></RegistrationForm>
            </Flex>
          </div>
          <div className="w-full md:w-1/2"></div>
        </Flex>
      </Container>
    </MainLayout>
  );
}
