'use client';

import { useState } from 'react';
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
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { ALLERGIES } from '../multistepConfig';

export default function Allergies() {
  const router = useRouter();
  const { allergies, allergiesInfo, setAllergies, setAllergiesInfo } =
    useDermaStore(state => state);

  const [textAreaValue, setTextAreaValue] = useState(allergiesInfo);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={5} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 5. Alergias"
              title="¿Tienes alguna alergia?"
            />

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {ALLERGIES.map(allergy => (
                  <li
                    className={`transition-all rounded-xl p-3 flex items-center justify-between gap-4 cursor-pointer ${
                      allergies === allergy.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={allergy.title}
                    onClick={() =>
                      setAllergies(
                        allergies === allergy.value ? undefined : allergy.value
                      )
                    }
                  >
                    {allergy.title}
                    {allergies === allergy.value ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}
              </ul>
              {allergies === 0 && (
                <>
                  <Title className="font-light text-derma-primary mb-2">
                    Explícanos tus alergias
                  </Title>
                  <Text className="mb-4 text-hg-black400 text-sm">
                    Cuanta más información nos proporciones, mejor podremos
                    asesorarte sobre tus objetivos y preocupaciones de la piel.
                  </Text>
                  <textarea
                    className="w-full h-24 md:h-48 p-2 text-sm border border-derma-secondary500 rounded-xl mb-8"
                    placeholder="Escribe aquí tus movidas"
                    onChange={event => {
                      setAllergiesInfo(event.target.value);
                      setTextAreaValue(event.target.value);
                    }}
                    value={
                      textAreaValue && textAreaValue.length > 0
                        ? textAreaValue.replace(/^\s+/, '')
                        : ''
                    }
                  />
                </>
              )}
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
                  href={ROUTES.derma.multistep.illnesses}
                  type={
                    (allergies !== 0 && allergies) ||
                    (allergies === 0 &&
                      allergiesInfo &&
                      allergiesInfo.length > 0)
                      ? 'dermaDark'
                      : 'disabled'
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
