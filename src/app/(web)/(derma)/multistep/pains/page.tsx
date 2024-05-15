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
import { HandleNextMultistep } from '../NextMultistepButton';

export default function Pains() {
  const router = useRouter();
  const { pain, setPain } = useDermaStore(state => state);

  const nextStep = HandleNextMultistep(ROUTES.derma.multistep.symptoms);

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block " />
      <div className="relative">
        <DermaStepBar steps={22} step={1} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Necesidades de tu piel"
              title="¿Cómo te podemos ayudar?"
            >
              <Text className="text-hg-black500 mt-2">
                Elige el aspecto principal de tu piel que quieres tratar
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <CheckHydration>
                <ul className="grid grid-cols-2 grid-rows-2 gap-4 w-full mb-8">
                  {PAINS_AND_SYMPTOMS.map(painItem => (
                    <li
                      className={`flex flex-col justify-start transition-all rounded-xl p-3 items-center gap-4 cursor-pointer relative ${
                        pain === painItem.value
                          ? 'bg-derma-primary500/20'
                          : 'bg-derma-secondary400'
                      }`}
                      key={painItem.name}
                      onClick={async () => {
                        setPain(painItem.value);
                        await nextStep();
                      }}
                    >
                      <Image
                        src={painItem.img}
                        height={600}
                        width={600}
                        alt={painItem.name}
                        className="rounded-xl w-full"
                      />
                      <div className="absolute top-6 right-6 bg-white rounded-xl">
                        {pain === painItem.value ? (
                          <SvgCheckSquareActive className="h-6 w-6" />
                        ) : (
                          <SvgCheckSquare className="h-6 w-6" />
                        )}
                      </div>
                      {painItem.name}
                    </li>
                  ))}
                </ul>

                <Flex className="justify-between">
                  <Button
                    size="lg"
                    type="whiteDerma"
                    customStyles="bg-transparent border-none"
                    onClick={() => router.back()}
                  >
                    <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                    <Text className="text-derma-tertiary">Atrás</Text>
                  </Button>
                </Flex>
              </CheckHydration>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
