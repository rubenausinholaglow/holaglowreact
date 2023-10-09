'use client';

import './phoneInputStyle.css';

import { useEffect, useState } from 'react';
import { Appointment, User } from '@interface/appointment';
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
  const {
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
    setCurrentUser,
  } = useGlobalPersistedStore(state => state);
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
  let localUser: User | undefined = undefined;

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
  const handleContinue = async () => {
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
      await handleRegistration();
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

  const createAppointment = async () => {
    const appointments = [];
    const ids = selectedTreatments!.map(x => x.flowwwId).join(', ');
    appointments.push({
      box: selectedSlot!.box,
      endTime:
        selectedDay!.format(format) + ' ' + selectedSlot!.endTime + ':00',
      id: '0',
      startTime:
        selectedDay!.format(format) + ' ' + selectedSlot!.startTime + ':00',
      treatment: ids,
      clientId: localUser?.flowwwToken,
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
    let user = await UserService.checkUser(formData.email);

    if (!user) {
      user = await UserService.registerUser(formData);
    }
    setCurrentUser(user);
    localUser = user;
    await createAppointment();
    setIsLoading(false);
  };

  const handleRequestError = (errors: Array<string>) => {
    localStorage.clear();
    setErrors(errors);
  };

  return (
    <MainLayout isCheckout>
      <Container className="px-0 mt-6 md:mt-16">
        <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
          <div className="w-full md:w-1/2 bg-hg-black50 px-4 py-6 md:p-8 rounded-3xl">
            <Flex layout="col-left" className="gap-4 mb-8">
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
            </Flex>

            <RegistrationForm
              formData={formData}
              handleFieldChange={handleFormFieldChange}
              handleContinue={handleContinue}
              errors={errors}
              isLoading={isLoading}
            />
          </div>
          <div className="w-full md:w-1/2"></div>
        </Flex>
      </Container>
    </MainLayout>
  );
}
