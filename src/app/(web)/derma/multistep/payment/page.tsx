'use client';

import { useEffect, useState } from 'react';
import { Client } from '@interface/client';
import { PaymentBank } from '@interface/payment';
import { usePayments } from '@utils/paymentUtils';
import { useRegistration } from '@utils/userUtils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import CheckoutPayment from 'app/(web)/checkout/components/CheckoutPayment';
import AppointmentResume from 'app/(web)/checkout/confirmation/components/AppointmentResume';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import App from 'app/(web)/components/layout/App';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
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

dayjs.locale(spanishConf);

export default function DermaPayment() {
  const searchParams = useSearchParams();
  const { selectedTreatments } = useSessionStore(state => state);
  const { activePayment, setActivePayment, user } = useGlobalPersistedStore(
    state => state
  );
  const { cart } = useCartStore(state => state);
  const [hideLayout] = useState(false);
  const [isProbadorVirtual, setisProbadorVirtual] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const [client, setClient] = useState<Client>({
    email: user?.email ?? '',
    phone: '+34' + user?.phone ?? '',
    phonePrefix: '',
    name: user?.firstName ?? '',
    surname: user?.lastName ?? '',
    secondSurname: user?.secondLastName ?? '',
    termsAndConditionsAccepted: true,
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
    city: user?.city ?? '',
    address: user?.address ?? '',
    postalCode: user?.postalCode ?? '',
  });
  const initializePayment = usePayments();
  const registerUser = useRegistration(client, false, false, false);

  useEffect(() => {
    setisProbadorVirtual(false);

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
        cart[0].price * 100,
        true,
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
    <DermaLayout hideButton={true}>
      <Container className="px-0 md:mt-8 md:pb-8">
        <Flex
          layout="col-left"
          className="gap-4 md:gap-16 md:flex-row bg-hg-cream500 md:bg-transparent rounded-t-2xl pt-4 md:pt-0"
        >
          <div className="w-full md:w-1/2 px-4 md:order-2">
            <AppointmentResume
              isProbadorVirtual={isProbadorVirtual}
              isDerma={true}
            />
          </div>
          <div className="w-full md:w-1/2 p-4 md:p-8 rounded-3xl">
            <Title
              size="xldr"
              className="font-light text-derma-primary mb-4 md:mb-6"
            >
              Formulario
            </Title>
            <Text className="text-sm md:text-md mb-4">
              Rellena tus datos de contacto para completar tu plan de cuidado
              facial
            </Text>
            <RegistrationForm
              redirect={hideLayout}
              hasContinueButton={isProbadorVirtual}
              initialValues={client}
              setClientData={setClient}
              showDni={true}
              showPostalCode={true}
              showAddress={true}
            />

            {!isProbadorVirtual && (
              <CheckoutPayment
                isDerma={true}
                hasError={hasError}
                className="mt-8"
                formData={client}
                checkAddress={true}
              />
            )}
          </div>
        </Flex>
      </Container>
      <div className="hidden md:block absolute left-0 right-0 -z-50 top-0 bottom-0">
        <div className="bg-derma-secondary300  w-1/2 h-full relative left-1/2"></div>
      </div>
    </DermaLayout>
  );
}
