'use client';

import { useEffect, useState } from 'react';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgSpinner } from 'app/icons/Icons';
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
import { ROUTINE_PRODUCTS } from '../multistepConfig';
import { HandleNextMultistep } from '../NextMultistepButton';

export default function RoutineProducts() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { routineProducts, setRoutineProducts } = useDermaStore(state => state);

  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />
      <div className="relative">
        <DermaStepBar steps={22} step={12} />

        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Productos de tu rutina actual"
              title="¿Qué productos usas en tu rutina?"
            />

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {ROUTINE_PRODUCTS.map(routine => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      routineProducts.includes(routine.title)
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={routine.value}
                    onClick={() => {
                      if (routineProducts.includes(routine.title)) {
                        setRoutineProducts(
                          routineProducts.filter(item => item !== routine.title)
                        );
                      } else {
                        setRoutineProducts([...routineProducts, routine.title]);
                      }
                    }}
                  >
                    {routine.title}
                    {routineProducts.includes(routine.title) ? (
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
                <Button
                  size="lg"
                  onClick={() => {
                    setIsLoading(true);
                  }}
                  href={ROUTES.derma.multistep.routineTime}
                  type={routineProducts.length === 0 ? 'disabled' : 'dermaDark'}
                  className={isLoading ? 'pointer-events-none' : ''}
                >
                  {isLoading ? (
                    <SvgSpinner className="min-w-16" />
                  ) : (
                    'Siguiente'
                  )}
                </Button>
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
