'use client';

import { useState } from 'react';
import { Client } from '@interface/client';
import CheckoutPayment from 'app/(web)/checkout/components/CheckoutPayment';
import AppointmentResume from 'app/(web)/checkout/confirmation/components/AppointmentResume';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

export default function FourthStep({
  activeSlideIndex,
  client,
  setClient,
}: {
  activeSlideIndex: number;
  client: Client;
  setClient: any;
}) {
  const [hasError] = useState<boolean>(false);
  console.log(client);

  return (
    <div>
      {activeSlideIndex === 5 && (
        <>
          <Container>
            <Text className="text-sm text-derma-primary500 mb-2">
              Último paso formulario y pago
            </Text>
            <Text className="font-gtUltraThin mb-2 font-bold text-xl text-derma-primary">
              Bien hecho, ¡{client?.name}! Estás a un paso de tener una piel más
              saludable
            </Text>
            <Text className="text-hg-black500 text-sm mb-8">
              Después de tu consulta, tu médico te recomendará una rutina
              personalizada de cuidado de la piel adaptada a tus metas, que
              podrás recibir en tu puerta según tu preferencia. Los detalles de
              tu cita online con el médico se proporcionarán por correo
              electrónico al pagar.
            </Text>
          </Container>

          <AppointmentResume isProbadorVirtual={false} isDerma />
          <Container>
            <Title size="xl" className="font-semibold mb-4">
              Reserva tu cita
            </Title>
            <RegistrationForm
              showPostalCode={true}
              redirect={false}
              hasContinueButton={false}
              formData={client}
              setClientData={setClient}
            />
            <CheckoutPayment
              hasError={hasError}
              className="mt-8"
              formData={client}
            />
          </Container>
        </>
      )}
    </div>
  );
}