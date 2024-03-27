'use client';

import { useEffect, useState } from 'react';
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
import { ALERGIES } from '../multistepConfig';

export default function Inquietudes() {
  const router = useRouter();
  const { alergies, setAlergies } = useDermaStore(state => state);

  const [showAlergiesInfo, setShowEAlergiesExtraInfo] = useState(
    alergies === 'Sí'
  );

  useEffect(() => {
    if (alergies === 'Sí') {
      setShowAlergiesTextArea(true);
    }
  }, [alergies]);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={5} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16"
          >
            <DermaStepHeader
              intro="Paso 5. Alergias"
              title="¿Tienes alguna alergia?"
            />

            <div className="md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {ALERGIES.map(item => (
                  <li
                    className={`transition-all rounded-xl p-3 flex justify-between ${
                      alergies === item
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item}
                    onClick={() =>
                      setAlergies(alergies === item ? undefined : item)
                    }
                  >
                    {item}
                    {alergies === item ? (
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
                  href={ROUTES.derma.multistep.skinType}
                  type={alergies !== undefined ? 'dermaDark' : 'disabled'}
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
