'use client';

import { useState } from 'react';
import { Appointment } from '@interface/appointment';
import { Client } from '@interface/client';
import ScheduleService from '@services/ScheduleService';
import UserService from '@services/UserService';
import * as config from '@utils/textConstants';
import * as utils from '@utils/validators';
import MainLayout from 'app/components/layout/MainLayout';
import RegistrationForm from 'app/dashboard/RegistrationForm';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCalendar, SvgLocation } from 'icons/Icons';
import { useRouter } from 'next/navigation';

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
    const requiredFields = ['name', 'surname', 'email', 'phone'];
    const isAllFieldsFilled = requiredFields.every(field => formData[field]);

    if (isAllFieldsFilled) {
      // Call your continue logic here
      console.log('Continue clicked');
    } else {
      // Set an error or show a message about missing fields
      console.error('Please fill in all required fields');
    }
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
                    <Text size="xs" className="w-full text-left pl-2">
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
