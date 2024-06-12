'use client';

import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCircle } from 'app/icons/Icons';
import { SvgArrow, SvgRadioChecked } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { ROUTINES } from '../multistepConfig';

export default function Routine() {
  const router = useRouter();

  const { routine, setRoutine } = useDermaStore(state => state);

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={22} step={11} />

        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Tienes rutina"
              title="¿Sigues alguna rutina diaria actualmente?"
            />

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {ROUTINES.map(item => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      routine === item.value
                        ? 'bg-derma-primary500/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item.value}
                    onClick={() => {
                      setRoutine(routine === item.value ? 0 : item.value);
                      router.push(
                        [1, 2, 3].includes(item.value)
                          ? ROUTES.derma.multistep.routineProducts
                          : ROUTES.derma.multistep.sunScreen
                      );
                    }}
                  >
                    {item.title}
                    {routine === item.value ? (
                      <SvgRadioChecked className="h-7 w-7 shrink-0" />
                    ) : (
                      <SvgCircle className="h-7 w-7 shrink-0" />
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
