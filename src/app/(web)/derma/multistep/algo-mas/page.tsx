'use client';

import { useState } from 'react';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';

export default function AlgoMas() {
  const router = useRouter();
  const { extraInfo, setExtraInfo } = useDermaStore(state => state);

  const [textAreaValue, setTextAreaValue] = useState(extraInfo);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={8} step={7} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 10. Información adicional"
              title="¿Te gustaría contarnos algo más?"
            >
              <Text className="mt-2 text-hg-black500 text-sm">
                Cuanta más información nos proporciones, mejor podremos
                asesorarte sobre tus objetivos y preocupaciones de la piel.
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <textarea
                className="w-full h-24 md:h-48 p-2 text-sm border border-derma-secondary500 rounded-xl mb-8"
                placeholder="Por ejemplo: cualquier medicación (ten en cuenta que nuestros médicos no pueden recetar online antibióticos orales ni medicamentos, como Roaccutane y Spironolactone), tratamientos recibidos anteriormente, alergias, características de su estilo de vida, etc."
                onChange={event => {
                  setExtraInfo(event.target.value);
                  setTextAreaValue(event.target.value);
                }}
                value={
                  textAreaValue && textAreaValue.length > 0
                    ? textAreaValue.replace(/^\s+/, '')
                    : ''
                }
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
                <Button href={ROUTES.derma.multistep.form} type="dermaDark">
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
