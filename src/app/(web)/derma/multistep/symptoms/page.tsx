'use client';

import { ChangeEvent, useEffect, useState } from 'react';
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
import { PAINS_AND_SYMPTOMS } from '../multistepConfig';
import NextMultistepButton from '../NextMultistepButton';

export default function Symptoms() {
  const router = useRouter();
  const { pain, symptoms, setSymptoms } = useDermaStore(state => state);

  const [textAreaValue, setTextAreaValue] = useState('');

  useEffect(() => {
    const hasExtraSymptom = symptoms.filter(category =>
      category.startsWith('Otros:')
    );

    if (hasExtraSymptom.length > 0) {
      setTextAreaValue(hasExtraSymptom[0].substring(6));
    }
  }, [symptoms]);

  function handleTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    const symptomsWithoutExtra = symptoms.filter(
      category => !category.startsWith('Otros:')
    );

    setSymptoms(symptomsWithoutExtra);

    if (event.target.value.length > 0) {
      setSymptoms([...symptomsWithoutExtra, `Otros: ${event.target.value}`]);
    }
  }

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />

      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={2} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 2. Síntomas"
              title="¿Qué síntomas ves en tu piel?"
            >
              <Text className="text-hg-black500 mt-2">
                Selecciona todos los que apliquen
              </Text>
            </DermaStepHeader>

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {PAINS_AND_SYMPTOMS.filter(
                  painItem => painItem.value === pain
                )[0].symptoms.map(symptom => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      symptoms.includes(symptom)
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={symptom}
                    onClick={() => {
                      if (symptoms.includes(symptom)) {
                        setSymptoms(symptoms.filter(item => item !== symptom));
                      } else {
                        setSymptoms([...symptoms, symptom]);
                      }
                    }}
                  >
                    {symptom}
                    {symptoms.includes(symptom) ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}

                {pain === 5 && (
                  <li
                    className={`transition-all rounded-xl p-3 ${
                      textAreaValue.length > 0
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                  >
                    <Text className="mb-2">Otros</Text>
                    <textarea
                      className="w-full h-24 md:h-48 p-2 text-sm rounded-2xl rounded-2xl"
                      placeholder="Escribe aquí tus movidas"
                      onChange={event => {
                        handleTextArea(event);
                        setTextAreaValue(event.target.value);
                      }}
                      value={textAreaValue.replace(/^\s+/, '')}
                    />
                  </li>
                )}
              </ul>
              {pain === 5 ? (
                <div className="bg-white p-4 rounded-2xl text-hg-black500 text-sm">
                  <Text className="mb-1 font-semibold">
                    Lamentablemente, no podemos ayudarte ahora :(
                  </Text>
                  <Text className="mb-6">
                    Actualmente solo tratamos casos de Melasma, Acné, Rosácea o
                    Calidad de la piel en general.
                  </Text>

                  <Button
                    type="white"
                    customStyles="bg-transparent border-none"
                    onClick={() => router.back()}
                  >
                    <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                    <Text className="text-derma-tertiary">Atrás</Text>
                  </Button>
                </div>
              ) : (
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
                    nextUrl={ROUTES.derma.multistep.skinType}
                    isDisabled={symptoms.length === 0}
                  />
                </Flex>
              )}
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
