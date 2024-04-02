'use client';

import { useState } from 'react';
import { Client } from '@interface/client';
import ROUTES from '@utils/routes';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
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
  const [client, setClient] = useState<Client>(CLIENT_INITIAL_VALUES);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={11} step={11} />
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
                <Button href={ROUTES.derma.multistep.symptoms} type="disabled">
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
