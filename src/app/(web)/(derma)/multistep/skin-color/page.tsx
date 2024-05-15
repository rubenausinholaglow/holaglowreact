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
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { SKIN_COLORS } from '../multistepConfig';
import { HandleNextMultistep } from '../NextMultistepButton';

export default function SkinColor() {
  const router = useRouter();

  const { skinColor, setSkinColor, setFeedbackStep } = useDermaStore(
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
        <DermaStepBar steps={22} step={9} />

        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Fototipo"
              title="¿Que tono de color tiene tu piel?"
            />

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-2 w-full mb-8">
                {SKIN_COLORS.map(color => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      skinColor === color.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={color.value}
                    onClick={async () => {
                      setSkinColor(
                        skinColor === color.value ? undefined : color.value
                      );
                      if (skinColor !== color.value) {
                        setFeedbackStep(3);
                        await nextStep();
                      }
                    }}
                  >
                    <div
                      className="rounded-xl h-10 w-10 shrink-0 self-start mt-1"
                      style={{ backgroundColor: color.color }}
                    />

                    <div className="mr-auto">
                      {color.title}
                      <Text className="text-xs md:text-sm">
                        {color.description}
                      </Text>
                    </div>

                    {skinColor === color.value ? (
                      <SvgCheckSquareActive className="h-6 w-6 shrink-0" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6 shrink-0" />
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
