'use client';

import { Dispatch, SetStateAction } from 'react';
import { Client } from '@interface/client';
import { DermaQuestions } from '@interface/derma/dermaquestions';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function ThirdStep({
  activeSlideIndex,
  client,
  setClient,
  dermaQuestions,
  setContinueDisabled = undefined,
}: {
  activeSlideIndex: number;
  client: Client;
  setClient: any;
  dermaQuestions: DermaQuestions;
  setContinueDisabled?: Dispatch<SetStateAction<boolean>>;
}) {
  const initialName = dermaQuestions.name;
  const spaceIndex = initialName?.indexOf(' ');
  let name, surName;

  if (spaceIndex !== undefined && spaceIndex !== -1) {
    name = initialName?.substring(0, spaceIndex) || '';
    surName = initialName?.substring(spaceIndex + 1) || '';
  } else {
    name = initialName || '';
    surName = '';
  }

  return (
    <div>
      {activeSlideIndex === 4 && (
        <Container className="px-0">
          <Flex layout="col-left" className="w-full">
            <Flex
              layout="col-left"
              className="px-4 md:flex-row md:gap-16 w-full"
            >
              <Flex layout="col-left" className="w-full md:w-1/2">
                <Text className="text-sm text-derma-primary500 mb-2">
                  Paso {activeSlideIndex + 1}. Formulario
                </Text>
                <Text className="font-gtUltraThin text-xl text-derma-primary md:text-2xl mb-4">
                  Solicita tu cita
                </Text>
                <Text className="text-hg-black500 text-sm mb-8 md:text-md">
                  Rellena tus datos de contacto para reservar tu consulta
                </Text>
              </Flex>
              <Flex layout="col-left" className="w-full md:w-1/2">
                <RegistrationForm
                  showPostalCode={true}
                  redirect={false}
                  hasContinueButton={false}
                  initialValues={{ ...client, name: name, surname: surName }}
                  setClientData={setClient}
                  setContinueDisabled={setContinueDisabled}
                />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      )}
    </div>
  );
}
