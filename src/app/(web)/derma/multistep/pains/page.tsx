'use client';

import CheckHydration from '@utils/CheckHydration';
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
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { PAINS_AND_SYMPTOMS } from '../multistepConfig';
import NextMultistepButton from '../NextMultistepButton';

export default function Pains() {
  const router = useRouter();
  const { pain, setPain } = useDermaStore(state => state);

  return (
    <div className="bg-derma-secondary100 min-h-screen relative">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />

      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={1} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 1. Necesidades de tu piel"
              title="¿Cómo te podemos ayudar?"
            >
              <Text className="text-hg-black500 mt-2">
                Elige el aspecto principal de tu piel que quieres tratar
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <CheckHydration>
                <ul className="flex flex-col gap-4 w-full mb-8">
                  {PAINS_AND_SYMPTOMS.map(painItem => (
                    <li
                      className={`transition-all rounded-xl px-3 py-4 flex justify-between items-center gap-4 cursor-pointer ${
                        pain === painItem.value
                          ? 'bg-derma-primary/20'
                          : 'bg-derma-secondary400'
                      }`}
                      key={painItem.name}
                      onClick={() =>
                        setPain(pain === painItem.value ? 0 : painItem.value)
                      }
                    >
                      <Flex className="gap-3">
                        <Image
                          src={painItem.img}
                          height={64}
                          width={64}
                          alt={painItem.name}
                        />
                        {painItem.name}
                      </Flex>
                      {pain === painItem.value ? (
                        <SvgCheckSquareActive className="h-6 w-6" />
                      ) : (
                        <SvgCheckSquare className="h-6 w-6" />
                      )}
                    </li>
                  ))}
                </ul>

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
                    isDisabled={pain === undefined}
                    nextUrl={ROUTES.derma.multistep.symptoms}
                  />
                </Flex>
              </CheckHydration>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
