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
import NextMultistepButton from '../NextMultistepButton';

export default function ExtraInfo() {
  const router = useRouter();
  const { extraInfo, setExtraInfo } = useDermaStore(state => state);

  const [textAreaValue, setTextAreaValue] = useState(extraInfo);

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block " />
      <div className="relative">
        <DermaStepBar steps={11} step={10} />
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
                Cuanta más información nos proporciones, mejor podremos ayudarte
                a conseguir tus objetivos.
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2 relative">
              <Text className="absolute top-4 left-4 text-hg-black500 text-sm">
                Cuéntanos
              </Text>
              <textarea
                className="w-full h-56 md:h-64 p-4 text-sm rounded-2xl border border-derma-secondary500 mb-8 pt-10 resize-none"
                placeholder="Cualquier información adicional que nos des, nos ayudará a diseñar la mejor rutina para ti."
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
                  onClick={() => router.back()}
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <NextMultistepButton
                  nextUrl={ROUTES.derma.multistep.form}
                  isDisabled={false}
                />
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
