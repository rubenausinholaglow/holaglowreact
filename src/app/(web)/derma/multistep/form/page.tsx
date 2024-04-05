'use client';

import { useState } from 'react';
import { Client } from '@interface/client';
import { DermaQuestions } from '@interface/derma/dermaquestions';
import { dermaService } from '@services/DermaService';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { useRegistration } from '@utils/userUtils';

const CLIENT_INITIAL_VALUES = {
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
  postalCode: '',
  origin: 'Derma',
  city: '',
  address: '',
};

export default function Form() {
  const router = useRouter();

  const {
    id,
    pain,
    symptoms,
    skinType,
    skinSensibility,
    allergy,
    allergyInfo,
    illness,
    illnessInfo,
    medication,
    medicationInfo,
    lactating,
    pictures,
    extraInfo,
  } = useDermaStore(state => state);

  const [isDisabled, setIsDisabled] = useState(false);
  const [client, setClient] = useState<Client>(CLIENT_INITIAL_VALUES);
  const registerUser = useRegistration(client, false, false, false);

  function handleFinishDermaFlow() {
    const formattedPain =
      symptoms.length > 0
        ? symptoms.map(symptom => ({
            skinPain: pain,
            optionsSkinPain: symptom,
          }))
        : [];

    const dermaQuestions = {
      id,
      userId: undefined,
      name: client.name,
      birthDate: undefined,
      phone: client.phone.replaceAll(' ', '').replace(client.phonePrefix, ''),
      phonePrefix: client.phonePrefix,
      pain: formattedPain,
      skinType,
      skinSensibility,
      allergy,
      allergyInfo,
      illness,
      illnessInfo,
      medication,
      medicationInfo,
      lactating,
      extraInfo,
    };
    dermaService.update(dermaQuestions as DermaQuestions);
    client.origin = 'Derma';
    registerUser(client, false, false, false).then(user => {
      pictures.forEach((x, y) => {
        dermaService.uploadImage(
          user!.flowwwToken,
          x.file!,
          'ImagePosition' + y
        );
      });
    });
    //REDIRECT TO NEXT PAGE
  }

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={1} step={1} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Último paso. Formulario"
              title="Solicita tu cita"
            >
              <Text className="mt-2 text-hg-black500 text-sm">
                Rellena tus datos de contacto para reservar tu consulta
              </Text>
            </DermaStepHeader>
            <div className="w-full md:w-1/2">
              <RegistrationForm
                setClientData={setClient}
                hasContinueButton={false}
                className="mb-8"
                setContinueDisabled={setIsDisabled}
              />
              <Flex className="justify-between">
                <Button
                  type="white"
                  customStyles="bg-transparent border-none"
                  onclick={() => router.back()}
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  onClick={() => handleFinishDermaFlow()}
                  type={isDisabled ? 'disabled' : 'dermaDark'}
                >
                  Siguiente
                </Button>
              </Flex>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
