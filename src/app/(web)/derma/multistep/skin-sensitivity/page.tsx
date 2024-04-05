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
import { SKIN_SENSITIVITIES } from '../multistepConfig';
import NextMultistepButton from '../NextMultistepButton';

export default function SkinSensitivity() {
  const router = useRouter();

  const { skinSensibility, setSkinSensibility } = useDermaStore(state => state);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />

      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={4} />

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
              <Text className="text-hg-black500 mt-3">
                Adaptaremos tu rutina a la sensibilidad de tu piel
              </Text>
              <Text className="text-xs mt-1">
                1 = Poco sensible / 5 = Muy sensible
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {SKIN_SENSITIVITIES.map(skin => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      skinSensibility === skin.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={skin.value}
                    onClick={() =>
                      setSkinSensibility(
                        skinSensibility === skin.value ? 0 : skin.value
                      )
                    }
                  >
                    <span className="font-semibold pl-1">{skin.title}</span>
                    {skinSensibility === skin.value ? (
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
                  nextUrl={ROUTES.derma.multistep.allergy}
                  isDisabled={skinSensibility === undefined}
                />
              </Flex>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
