'use client';

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
import { SOMETHING_ELSE } from '../multistepConfig';
import { HandleNextMultistep } from '../NextMultistepButton';

export default function SomethingElse() {
  const router = useRouter();
  const { anotherConcern, setAnotherConcern, setFeedbackStep } = useDermaStore(
    state => state
  );

  const nextStep = HandleNextMultistep(ROUTES.derma.multistep.feedback);

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={11} step={3} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 3. Tipo de piel"
              title="¿Te gustaría tratar algo más?"
            >
              <Text className="text-hg-black500 mt-2">
                En ocasiones podemos tratar más de un síntoma con una misma
                crema añadiendo más ingredientes
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {SOMETHING_ELSE.map(item => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      anotherConcern === item.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item.title}
                    onClick={async () => {
                      setAnotherConcern(
                        anotherConcern === item.value ? 0 : item.value
                      );
                      if (anotherConcern !== item.value) {
                        setFeedbackStep(4);
                        await nextStep();
                      }
                    }}
                  >
                    {item.title}
                    {anotherConcern === item.value ? (
                      <SvgCheckSquareActive className="h-6 w-6 " />
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
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
