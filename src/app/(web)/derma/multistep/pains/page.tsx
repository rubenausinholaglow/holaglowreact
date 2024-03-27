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
import DermaStepHeader from '../../components/DermaStepHeader';
import { PAINS_AND_SYMPTOMS } from '../multistepConfig';

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
            <DermaStepHeader
              intro="Paso 1. Necesidades personales"
              title="Selecciona las inquietudes que te gustaría resolver en tu
                consulta"
            />

            <div className="md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {PAINS_AND_SYMPTOMS.map(painItem => (
                  <li
                    className={`transition-all rounded-xl p-3 flex justify-between ${
                      pain === painItem.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={painItem.name}
                    onClick={() =>
                      setPain(
                        pain === painItem.value ? undefined : painItem.value
                      )
                    }
                  >
                    {painItem.name}
                    {pain === painItem.value ? (
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
                    href={ROUTES.derma.multistep.symptoms}
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
