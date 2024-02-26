'use client';

import { useEffect, useState } from 'react';
import { Client } from '@interface/client';
import { PaymentBank } from '@interface/payment';
import { usePayments } from '@utils/paymentUtils';
import { useRegistration } from '@utils/userUtils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useSearchParams } from 'next/navigation';

import CheckoutPayment from '../components/CheckoutPayment';
import AppointmentResume from '../confirmation/components/AppointmentResume';

dayjs.locale(spanishConf);

export default function ConctactForm() {
  const searchParams = useSearchParams();
  const { selectedTreatments } = useSessionStore(state => state);
  const { activePayment, setActivePayment } = useGlobalPersistedStore(
    state => state
  );
  const { cart } = useCartStore(state => state);
  const [hideLayout, setHideLayout] = useState(false);
  const [isProbadorVirtual, setisProbadorVirtual] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

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
    origin: '',
    city: '',
    address: '',
  });
  const initializePayment = usePayments();
  const registerUser = useRegistration(client, false, false, false);

  useEffect(() => {
    if (window) {
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      setHideLayout(params.get('hideLayout') == 'true');
    }

    setisProbadorVirtual(
      selectedTreatments[0].id ===
        process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID?.toLowerCase()
    );

    setHasError(!isEmpty(searchParams.get('error')));

    setActivePayment(PaymentBank.None);
  }, []);

  useEffect(() => {
    async function checkout() {
      const createdUser = await registerUser(client, false, false, false);
      await initializePayment(
        activePayment,
        createdUser!,
        false,
        undefined,
        undefined,
        undefined,
        false
      );
    }
    if (
      activePayment != PaymentBank.None &&
      cart.length > 0 &&
      client.email != ''
    )
      checkout();
  }, [activePayment]);

  return (
    <MainLayout
      isCheckout={!hideLayout}
      hideHeader={hideLayout}
      hideFooter={hideLayout}
    >
      <Container className="px-0 md:mt-8 md:pb-8">
        <Flex
          layout="col-left"
          className="gap-4 md:gap-16 md:flex-row bg-hg-cream500 md:bg-transparent rounded-t-2xl pt-4 md:pt-0"
        >
          <div className="w-full md:w-1/2 p-4 md:order-2">
            <Text className="font-semibold text-lg hidden md:block pl-4">
              Detalle de tu tratamiento
            </Text>
            <AppointmentResume isProbadorVirtual={isProbadorVirtual} />
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-8 rounded-3xl">
            <Title size="xl" className="font-semibold mb-4">
              Reserva tu cita
            </Title>
            <RegistrationForm
              redirect={hideLayout}
              hasContinueButton={isProbadorVirtual}
              initialValues={client}
              setClientData={setClient}
            />

            {!isProbadorVirtual && (
              <CheckoutPayment
                hasError={hasError}
                className="mt-8"
                formData={client}
              />
            )}
          </div>
        </Flex>
      </Container>
      <div className="hidden md:block absolute left-0 right-0 -z-50 top-0 bottom-0">
        <div className="bg-hg-cream500 w-1/2 h-full"></div>
      </div>
    </MainLayout>
  );
}
