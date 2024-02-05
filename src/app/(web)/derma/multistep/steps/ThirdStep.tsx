'use client';

import { Client } from '@interface/client';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function ThirdStep({
  activeSlideIndex,
  client,
  setClient,
}: {
  activeSlideIndex: number;
  client: Client;
  setClient: any;
}) {
  return (
    <div>
      {activeSlideIndex === 4 && (
        <Container className="px-0">
          <Flex layout="col-left" className="w-full">
            <Flex
              layout="col-left"
              className="px-4 md:flex-row md:gap-16 w-full"
            >
              <Flex layout="col-left" className="w-full">
                <Text className="text-sm text-derma-primary500 mb-2">
                  Paso {activeSlideIndex + 1}. Formulario
                </Text>
                <Text className="font-gtUltraThin font-semibold mb-4 text-derma-tertiary text-xl md:text-2xl">
                  Solicita tu cita
                </Text>
                <Text className="text-hg-black500 text-sm mb-8 md:text-md">
                  Rellena tus datos de contacto para reservar tu consulta
                </Text>
                <RegistrationForm
                  showPostalCode={true}
                  redirect={false}
                  hasContinueButton={false}
                  formData={client}
                  setClientData={setClient}
                />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      )}
    </div>
  );
}
