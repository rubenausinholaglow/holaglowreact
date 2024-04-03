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
import { LACTANCY } from '../multistepConfig';

export default function Lactancy({
  dermaStepHeaderIntro,
  dermaStepBarSteps,
  dermaStepBarStep,
}: {
  dermaStepHeaderIntro?: string;
  dermaStepBarSteps?: number;
  dermaStepBarStep?: number;
}) {
  const router = useRouter();
  const { pain, lactating, setLactating } = useDermaStore(state => state);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar
          steps={dermaStepBarSteps ? dermaStepBarSteps : 7}
          step={dermaStepBarStep ? dermaStepBarStep : 6}
        />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro={
                dermaStepHeaderIntro ? dermaStepHeaderIntro : 'Paso 8. Embarazo'
              }
              title="¿Actualmente estás en periodo de lactancia y/o embarazo?"
            />
            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {LACTANCY.map(item => (
                  <li
                    className={`transition-all rounded-xl p-3 flex items-center justify-between gap-4 cursor-pointer ${
                      lactating === item.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item.title}
                    onClick={() =>
                      setLactating(
                        lactating === item.value ? undefined : item.value
                      )
                    }
                  >
                    {item.title}
                    {lactating === item.value ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}
              </ul>

              <Flex className="justify-between pb-12">
                <Button
                  type="white"
                  customStyles="bg-transparent border-none"
                  onclick={() => router.back()}
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <Button
                  href={
                    pain === 4
                      ? ROUTES.derma.multistep.ns.form
                      : ROUTES.derma.multistep.pictures
                  }
                  type={lactating !== undefined ? 'dermaDark' : 'disabled'}
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
