'use client';

import { useState } from 'react';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import {
  SvgArrow,
  SvgCheckSquare,
  SvgCheckSquareActive,
} from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { MEDICINES } from '../multistepConfig';

export default function Medicines() {
  const router = useRouter();
  const { medication, medicationInfo, setMedication, setMedicationInfo } =
    useDermaStore(state => state);

  const [textAreaValue, setTextAreaValue] = useState(medicationInfo);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={6} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 7. Fármacos"
              title="¿Estás tomando algún fármaco actualmente?"
            />

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {MEDICINES.map(medicine => (
                  <li
                    className={`transition-all rounded-xl p-3 flex items-center justify-between gap-4 cursor-pointer ${
                      medication === medicine.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={medicine.title}
                    onClick={() =>
                      setMedication(
                        medication === medicine.value
                          ? undefined
                          : medicine.value
                      )
                    }
                  >
                    {medicine.title}
                    {medication === medicine.value ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}
              </ul>
              {medication === 0 && (
                <>
                  <Title className="font-light text-derma-primary mb-2">
                    Explícanos más acerca del fármaco que estás tomando
                  </Title>
                  <Text className="mb-4 text-hg-black400 text-sm">
                    Cuanta más información nos proporciones, mejor podremos
                    asesorarte sobre tus objetivos y preocupaciones de la piel.
                  </Text>
                  <textarea
                    className="w-full h-24 md:h-48 p-2 text-sm border border-derma-secondary500 rounded-xl mb-8"
                    placeholder="Escribe aquí tus movidas"
                    onChange={event => {
                      setMedicationInfo(event.target.value);
                      setTextAreaValue(event.target.value);
                    }}
                    value={
                      textAreaValue && textAreaValue.length > 0
                        ? textAreaValue.replace(/^\s+/, '')
                        : ''
                    }
                  />
                </>
              )}
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
                  href={ROUTES.derma.multistep.lactating}
                  type={
                    (medication !== 0 && medication) ||
                    (medication === 0 &&
                      medicationInfo &&
                      medicationInfo?.length > 0)
                      ? 'dermaDark'
                      : 'disabled'
                  }
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
