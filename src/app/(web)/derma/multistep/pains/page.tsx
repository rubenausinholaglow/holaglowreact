'use client';

import CheckHydration from '@utils/CheckHydration';
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
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';

export default function Inquietudes() {
  const router = useRouter();
  const { pain, setPain } = useDermaStore(state => state);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={1} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16"
          >
            <div>
              <Image
                alt="Dr. Basart"
                src="/images/derma/multistep/Basart.png"
                height={192}
                width={192}
                className="mx-auto w-24 mb-4"
              />
              <Text className="text-xs text-derma-primary500 mb-1">
                Paso 1. Necesidades personales
              </Text>
              <Title className="text-derma-primary font-light mb-1">
                Selecciona las inquietudes que te gustaría resolver en tu
                consulta
              </Title>
              <Text className="text-sm text-hg-black500">
                Elige tantas opciones como desees
              </Text>
            </div>

            <div className="w-full">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {[
                  'Acné',
                  'Enrojecimiento / Rosácea',
                  'Melasma / Manchas',
                  'Dermatitis',
                  'No se lo que tengo',
                ].map(item => (
                  <li
                    className={`transition-all rounded-xl p-3 flex justify-between ${
                      pain === item
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item}
                    onClick={() => setPain(pain === item ? undefined : item)}
                  >
                    {item}
                    {pain === item ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}
              </ul>
              <CheckHydration>
                <Flex className="justify-between">
                  <Button
                    type="white"
                    customStyles="bg-transparent border-none"
                    onclick={() => router.back()}
                  >
                    <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                    <Text className="text-derma-tertiary">Atrás</Text>
                  </Button>
                  <Button
                    href={ROUTES.derma.multistep.categories}
                    type={pain !== undefined ? 'dermaDark' : 'disabled'}
                  >
                    Siguiente
                  </Button>
                </Flex>
              </CheckHydration>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
