'use client';

import { Client } from '@interface/client';
import CheckoutPayment from 'app/(web)/checkout/components/CheckoutPayment';
import AppointmentResume from 'app/(web)/checkout/confirmation/components/AppointmentResume';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

export default function ThirdStep({
  activeSlideIndex,
  name,
  client,
  setClient,
}: {
  activeSlideIndex: number;
  name: string;
  client: Client;
  setClient: any;
}) {
  return (
    <div>
      {activeSlideIndex === 3 && (
        <Container className="px-0 md:px-4">
          <Flex layout="col-left" className="w-full md:flex-row md:gap-16">
            <Container className="mt-8">
              <Text className="font-gtUltraThin font-semibold mb-4 text-derma-tertiary text-xl md:text-2xl">
                Reserva tu cita
              </Text>
              <RegistrationForm
                showPostalCode={true}
                redirect={false}
                hasContinueButton={false}
                formData={client}
                setClientData={setClient}
              />
            </Container>
          </Flex>
        </Container>
      )}
    </div>
  );
}
