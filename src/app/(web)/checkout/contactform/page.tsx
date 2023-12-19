'use client';

import { useEffect, useState } from 'react';
import { Client } from '@interface/client';
import { PaymentBank } from '@interface/payment';
import { usePayments } from '@utils/paymentUtils';
import useRegistration from '@utils/userUtils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgCalendar, SvgLocation } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

import CheckoutPayment from '../components/CheckoutPayment';
import AppointmentResume from '../confirmation/components/AppointmentResume';

dayjs.locale(spanishConf);

export default function ConctactForm() {
  const { selectedTreatments, selectedSlot, selectedDay, selectedClinic } =
    useSessionStore(state => state);
  const [selectedTreatmentsNames, setSelectedTreatmentsNames] = useState('');
  const [hideLayout, setHideLayout] = useState(false);
  const { activePayment, user } = useGlobalPersistedStore(state => state);

  const [client, setClient] = useState<Client>({
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
      interestedTreatment: '',
      treatmentPrice: 0,
    },
    interestedTreatment: '',
    treatmentPrice: 0,
  });

  const registerUser = useRegistration(client, false, false);
  const initializePayment = usePayments();

  const localSelectedDay = dayjs(selectedDay);

  useEffect(() => {
    if (selectedTreatments && selectedTreatments.length > 0) {
      setSelectedTreatmentsNames(
        selectedTreatments!.map(x => x.title).join(' + ')
      );
    }
    if (window) {
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      setHideLayout(params.get('hideLayout') == 'true');
    }
  }, []);

  async function checkout() {
    await registerUser(client, false, false, false);
  }

  useEffect(() => {
    async function initPayment() {
      await initializePayment(translateActivePayment(activePayment));
    }

    initPayment();
  }, [user]);

  function translateActivePayment(payment: any) {
    switch (payment) {
      case 'creditCard':
        return PaymentBank.CreditCard;
      default:
        return PaymentBank.None;
    }
  }

  return (
    <MainLayout
      isCheckout={!hideLayout}
      hideHeader={hideLayout}
      hideFooter={hideLayout}
    >
      <Container className="px-0 mt-6 md:mt-16 pb-16">
        <Flex
          layout="col-left"
          className="gap-8 md:gap-16 md:flex-row bg-hg-cream500 rounded-t-2xl pt-4"
        >
          <div className="w-full md:w-1/2 md:order-2">
            <AppointmentResume />
          </div>
          <div className="w-full md:w-1/2 bg-hg-black50 px-4 py-6 md:p-8 rounded-3xl">
            <Flex layout="col-left" className="gap-4 mb-8">
              <Title size="xl" className="font-semibold">
                Reserva tu cita
              </Title>
              {localSelectedDay != undefined && (
                <>
                  {!selectedSlot && (
                    <Text size="sm">
                      Introduce tus datos de contacto para acceder a la agenda
                    </Text>
                  )}
                  {selectedSlot && (
                    <Text size="sm">
                      Introduce tus datos de contacto para la cita de{' '}
                      <span className="font-semibold w-full">
                        {selectedTreatmentsNames}
                      </span>
                    </Text>
                  )}
                  {selectedClinic && selectedSlot && (
                    <Flex className="">
                      <span>
                        <SvgLocation />
                      </span>
                      <Text size="xs" className="w-full text-left pl-2">
                        {selectedClinic.address}, {selectedClinic.city}
                      </Text>
                    </Flex>
                  )}
                  {selectedSlot && (
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
                  )}
                </>
              )}
            </Flex>

            <RegistrationForm
              redirect={hideLayout}
              hasContinueButton={false}
              formData={client}
              setClientData={setClient}
            />

            <CheckoutPayment className="mt-8" client={client} />
          </div>
          <div>
            <Button
              className="self-end"
              type="tertiary"
              customStyles="bg-hg-primary gap-2"
              onClick={checkout}
            >
              Continuar
              <SvgArrow height={16} width={16} />
            </Button>
          </div>
        </Flex>
      </Container>
    </MainLayout>
  );
}
