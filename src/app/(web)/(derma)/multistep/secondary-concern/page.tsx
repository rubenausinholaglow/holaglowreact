'use client';

import { useEffect } from 'react';
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
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { SECONDARY_CONCERNS } from '../multistepConfig';
import NextMultistepButton, {
  HandleNextMultistep,
} from '../NextMultistepButton';

export default function SecondaryConcern() {
  const router = useRouter();
  const { secondaryConcerns, setSecondaryConcerns, setFeedbackStep } =
    useDermaStore(state => state);

  const nextStep = HandleNextMultistep(ROUTES.derma.multistep.feedback);

  useEffect(() => {
    setFeedbackStep(4);
  }, []);

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={22} step={10.33} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Objetivos"
              title="¿Te gustaría tratar algo más?"
            >
              <Text className="text-hg-black500 mt-2">
                En ocasiones podemos tratar más de un síntoma con una misma
                crema añadiendo más ingredientes
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {SECONDARY_CONCERNS.map(concern => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      secondaryConcerns.includes(concern)
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={concern}
                    onClick={() => {
                      if (secondaryConcerns.includes(concern)) {
                        setSecondaryConcerns(
                          secondaryConcerns.filter(item => item !== concern)
                        );
                      } else {
                        setSecondaryConcerns([...secondaryConcerns, concern]);
                      }
                    }}
                  >
                    {concern}
                    {secondaryConcerns.includes(concern) ? (
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
                <NextMultistepButton
                  nextUrl={ROUTES.derma.multistep.feedback}
                  isDisabled={secondaryConcerns.length === 0}
                />
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
