'use client';

import { useState } from 'react';
import { Client } from '@interface/client';
import { DermaQuestions } from '@interface/derma/dermaquestions';
import { dermaService } from '@services/DermaService';
import ROUTES from '@utils/routes';
import { useRegistration } from '@utils/userUtils';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgSpinner } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';

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
    gender,
    lactating,
    age,
    skinType,
    skinSensibility,
    skinColor,
    allergy,
    allergyInfo,
    illness,
    illnessInfo,
    medication,
    medicationInfo,
    extraInfo,
    secondaryConcerns,
  } = useDermaStore(state => state);

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [client, setClient] = useState<Client>(CLIENT_INITIAL_VALUES);
  const registerUser = useRegistration(client, false, false, false);

  function handleFinishDermaFlow() {
    setIsLoading(true);

    client.origin = 'Derma';

    registerUser(client, false, false, false, true).then(user => {
      const dermaQuestions = {
        id,
        userId: undefined,
        name: client.name,
        birthDate: undefined,
        phone: client.phone.replaceAll(' ', '').replace(client.phonePrefix, ''),
        phonePrefix: client.phonePrefix,
        skinPain: pain,
        skinType,
        gender,
        lactating,
        ageRange: age,
        skinSensibility,
        skinColor,
        allergy,
        allergyInfo,
        illness,
        illnessInfo,
        medication,
        medicationInfo,
        skinConcerns: symptoms.map(x => ({ concern: x })),
        objectives: secondaryConcerns.map(x => ({ objective: x })),
        extraInfo,
      };
      dermaService.update(dermaQuestions as DermaQuestions);
      router.push(ROUTES.derma.multistep.thankyou);
    });
  }

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block " />
      <div className="relative">
        <DermaStepBar steps={22} step={22} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Datos de contacto"
              title="Rellena el formulario para solicitar el análisis médico de tu piel"
            />

            <div className="w-full md:w-1/2">
              <RegistrationForm
                setClientData={setClient}
                hasContinueButton={false}
                className="mb-8"
                setContinueDisabled={setIsDisabled}
                isDerma={true}
              />
              <Flex className="justify-between">
                <Button
                  type="whiteDerma"
                  size="lg"
                  customStyles="bg-transparent border-none"
                  onClick={() => router.back()}
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  size="lg"
                  onClick={() => handleFinishDermaFlow()}
                  type={isDisabled ? 'disabled' : 'dermaDark'}
                  className={isLoading ? 'pointer-events-none' : ''}
                >
                  {!isLoading ? 'Siguiente' : <SvgSpinner className="w-20" />}
                </Button>
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
