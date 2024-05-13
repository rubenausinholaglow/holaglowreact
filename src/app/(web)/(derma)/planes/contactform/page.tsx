'use client';

import { useEffect, useState } from 'react';
import { Client } from '@interface/client';
import { PaymentBank } from '@interface/payment';
import UserService from '@services/UserService';
import { usePayments } from '@utils/paymentUtils';
import { getTotalFromCart } from '@utils/utils';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import CheckoutPayment from 'app/(web)/checkout/components/CheckoutPayment';
import AppointmentResume from 'app/(web)/checkout/confirmation/components/AppointmentResume';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
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

export default function ConctactForm() {
  const searchParams = useSearchParams();
  const { selectedTreatments } = useSessionStore(state => state);
  const { activePayment, setActivePayment, user } = useGlobalPersistedStore(
    state => state
  );
  const { cart, priceDiscount, percentageDiscount, manualPrice } = useCartStore(
    state => state
  );
  const [hideLayout, setHideLayout] = useState(false);
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
      await UserService.updateUser(
        {
          address: client.address,
          birthday: '1990-01-01',
          city: client.city,
          country: '',
          dni: '',
          email: client.email,
          firstName: client.name,
          id: user!.id,
          lastName: client.surname,
          phone: client.phone,
          postalCode: client.postalCode!,
          province: '',
        },
        true
      );
      let price = getTotalFromCart(
        cart,
        percentageDiscount,
        priceDiscount,
        manualPrice
      );
      price = price.replaceAll(' ', '').replaceAll('€', '');
      await initializePayment(
        activePayment,
        user!,
        false,
        Number(price) * 100,
        true
      );
    }
    if (
      activePayment != PaymentBank.None &&
      cart.length > 0 &&
      client.email != ''
    )
      checkout();
  }, [activePayment]);

  const showExtraFields =
    cart.findIndex(x => x.title.indexOf('Rutina facial') > -1) > -1;

  return (
    <DermaLayout
      className="bg-derma-secondary100"
      hideButton={true}
      hideFooter={hideLayout}
    >
      <Container className="px-0 md:mt-8 md:pb-8">
        <Flex
          layout="col-left"
          className="gap-4 md:gap-16 md:flex-row pt-4 md:pt-0"
        >
          <div className="w-full md:w-1/2 p-4 md:order-2">
            <Title size="xl" className="text-derma-primary mb-4">
              ¡Ya casi lo tienes, {client.name}!{' '}
            </Title>
            <Text className="text-hg-black500 text-sm mb-2">
              Como bien sabes, conseguir una piel saludable es un compromiso a
              largo plazo. Gracias por confiar en nosotros para acompañarte en
              este camino.
            </Text>
            <Text className="text-hg-black500 text-sm mb-8">
              Los detalles de tu revisión online se proporcionarán por Whatsapp
              y correo electrónico al pagar.
            </Text>
            <AppointmentResume
              isProbadorVirtual={isProbadorVirtual}
              isDerma
              isUpselling
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <Title size="xl" className="font-semibold mb-4">
              Reserva tu cita
            </Title>
            <RegistrationForm
              redirect={hideLayout}
              hasContinueButton={isProbadorVirtual}
              initialValues={client}
              setClientData={setClient}
              showPostalCode={true}
              showCity={showExtraFields}
              showAddress={showExtraFields}
              isDerma={true}
            />

            {!isProbadorVirtual && (
              <CheckoutPayment
                checkAddress={showExtraFields}
                hasError={hasError}
                className="mt-8"
                formData={client}
                isDerma={true}
              />
            )}
          </div>
        </Flex>
      </Container>
      <div className="hidden md:block absolute left-0 right-0 -z-50 top-0 bottom-0">
        <div className="bg-hg-cream500 w-1/2 h-full"></div>
      </div>
    </DermaLayout>
  );
}
