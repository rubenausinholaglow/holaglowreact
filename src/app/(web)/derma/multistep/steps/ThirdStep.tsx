'use client';

import { Dispatch, SetStateAction } from 'react';
import { Client } from '@interface/client';
import { DermaQuestions } from '@interface/derma/dermaquestions';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

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
                <Title className="text-derma-primary mb-4">
                  Pide tu rutina personalizada
                </Title>
                <Text className="text-hg-black500 text-sm mb-8 md:text-md">
                  Rellena tus datos de contacto y dirección de entrega
                </Text>
              </Flex>
              <Flex layout="col-left" className="w-full md:w-1/2">
                <RegistrationForm
                  showPostalCode
                  redirect={false}
                  hasContinueButton={false}
                  initialValues={{ ...client, name: name, surname: surName }}
                  setClientData={setClient}
                  setContinueDisabled={setContinueDisabled}
                  showAddress
                  showCity
                />
              </Flex>
            </Flex>
          </Flex>
        </Container>
      )}
    </div>
  );
}
