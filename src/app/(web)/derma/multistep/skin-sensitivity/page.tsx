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
import { SKIN_SENSITIVITIES } from '../multistepConfig';

export default function SkinSensitivity({
  dermaStepHeaderIntro,
  dermaStepBarSteps,
  dermaStepBarStep,
}: {
  dermaStepHeaderIntro?: string;
  dermaStepBarSteps?: number;
  dermaStepBarStep?: number;
}) {
  const { pain, skinSensibility, setSkinSensibility } = useDermaStore(
    state => state
  );

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar
          steps={dermaStepBarSteps ? dermaStepBarSteps : 7}
          step={dermaStepBarStep ? dermaStepBarStep : 4}
        />

        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 4. Sensibilidad"
              title="¿Qué tan sensible es tu piel?"
            >
              <Text className="text-hg-black500 mt-2">
                Con esto nos referimos a enrojecimiento/sarpullido, picazón
                frecuente, sensación de tensión o ardor
              </Text>
              <Text className="text-xs mt-2">
                1 = Poco sensible / 5 = Muy sensible
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {SKIN_SENSITIVITIES.map(skin => (
                  <li
                    className={`transition-all rounded-xl p-3 flex items-center justify-between gap-4 cursor-pointer ${
                      skinSensibility === skin.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={skin.value}
                    onClick={() =>
                      setSkinSensibility(
                        skinSensibility === skin.value ? undefined : skin.value
                      )
                    }
                  >
                    {skin.title}
                    {skinSensibility === skin.value ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}
              </ul>
              <Flex className="justify-between">
                <Button type="white" customStyles="bg-transparent border-none">
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  href={
                    pain === 4
                      ? ROUTES.derma.multistep.ns.lactating
                      : ROUTES.derma.multistep.allergy
                  }
                  type={
                    skinSensibility !== undefined ? 'dermaDark' : 'disabled'
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
