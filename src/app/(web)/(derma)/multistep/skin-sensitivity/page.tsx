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
import { HandleNextMultistep } from '../NextMultistepButton';

export default function SkinSensitivity() {
  const router = useRouter();

  const { skinSensibility, setSkinSensibility } = useDermaStore(state => state);

  const nextStep = HandleNextMultistep(ROUTES.derma.multistep.skinColor);
  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block " />
      <div className="relative">
        <DermaStepBar steps={22} step={8} />

        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Sensibilidad"
              title="¿Cómo de sensible es tu piel?"
            >
              <Text className="text-hg-black500 mt-2">
                Depende de con qué frecuencia se irrita tu piel y aparecen
                señales como enrojecimiento, ardor, sequedad, o tirantez
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {SKIN_SENSITIVITIES.map(skin => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      skinSensibility === skin.value
                        ? 'bg-derma-primary500/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={skin.value}
                    onClick={async () => {
                      setSkinSensibility(
                        skinSensibility === skin.value ? 0 : skin.value
                      );
                      if (skinSensibility !== skin.value) await nextStep();
                    }}
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
                <Button
                  type="whiteDerma"
                  size="lg"
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
