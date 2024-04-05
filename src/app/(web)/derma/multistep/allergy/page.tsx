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
import NextMultistepButton from '../NextMultistepButton';

export default function Allergies() {
  const router = useRouter();
  const { allergy, allergyInfo, setAllergy, setAllergyInfo } = useDermaStore(
    state => state
  );

  const [textAreaValue, setTextAreaValue] = useState(allergyInfo);

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
                {ALLERGIES.map(item => (
                  <li
                    className={`transition-all rounded-xl p-3 flex items-center justify-between gap-4 cursor-pointer ${
                      allergy === item.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item.title}
                    onClick={() =>
                      setAllergy(allergy === item.value ? 0 : item.value)
                    }
                  >
                    {item.title}
                    {allergy === item.value ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}
              </ul>
              {allergy === 1 && (
                <>
                  <Title className="font-light text-derma-primary mb-2">
                    Explícanos tus alergias
                  </Title>
                  <Text className="mb-4 text-hg-black400 text-sm">
                    Cuanta más información nos proporciones, mejor podremos
                    asesorarte sobre tus objetivos y preocupaciones de la piel.
                  </Text>
                  <textarea
                    className="w-full h-24 md:h-48 p-2 text-sm rounded-2xl border border-derma-secondary500 mb-8"
                    placeholder="Escribe aquí tus movidas"
                    onChange={event => {
                      setAllergyInfo(event.target.value);
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
                  onClick={() => router.back()}
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <NextMultistepButton
                  nextUrl={ROUTES.derma.multistep.illness}
                  isDisabled={
                    allergy === 0 || (allergy === 1 && allergyInfo.length === 0)
                  }
                />
              </Flex>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
