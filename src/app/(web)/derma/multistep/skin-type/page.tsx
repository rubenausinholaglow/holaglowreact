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

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { SKIN_TYPES } from '../multistepConfig';
import NextMultistepButton from '../NextMultistepButton';

export default function SkinType({
  dermaStepHeaderIntro,
  dermaStepBarSteps,
  dermaStepBarStep,
}: {
  dermaStepHeaderIntro?: string;
  dermaStepBarSteps?: number;
  dermaStepBarStep?: number;
}) {
  const { pain, skinType, setSkinType } = useDermaStore(state => state);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar
          steps={dermaStepBarSteps ? dermaStepBarSteps : 7}
          step={dermaStepBarStep ? dermaStepBarStep : 3}
        />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro={
                dermaStepHeaderIntro
                  ? dermaStepHeaderIntro
                  : 'Paso 3. Tipo de piel'
              }
              title="¿Cómo describirías la piel de tu rostro?"
            />

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {SKIN_TYPES.map(item => (
                  <li
                    className={`transition-all rounded-xl p-3 flex items-center justify-between gap-4 cursor-pointer ${
                      skinType === item.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item.title}
                    onClick={() =>
                      setSkinType(skinType === item.value ? 0 : item.value)
                    }
                  >
                    <div>
                      {item.title}
                      <Text className="text-xs text-hg-black500">
                        {item.text}
                      </Text>
                    </div>

                    {skinType === item.value ? (
                      <SvgCheckSquareActive className="h-6 w-6 shrink-0" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6 shrink-0" />
                    )}
                  </li>
                ))}
              </ul>
              <Flex className="justify-between">
                <Button type="white" customStyles="bg-transparent border-none">
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <NextMultistepButton
                  nextUrl={
                    pain === 5
                      ? ROUTES.derma.multistep.ns.skinSensibility
                      : ROUTES.derma.multistep.skinSensibility
                  }
                  isDisabled={skinType === 0}
                />
              </Flex>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
