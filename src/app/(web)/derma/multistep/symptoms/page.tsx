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
      category.startsWith('Extra:')
    );

    if (hasExtraSymptom.length > 0) {
      setTextAreaValue(hasExtraSymptom[0].substring(6));
    }
  }, [symptoms]);

  function handleTextArea(event: ChangeEvent<HTMLTextAreaElement>) {
    const symptomsWithoutExtra = symptoms.filter(
      category => !category.startsWith('Extra:')
    );

    setSymptoms(symptomsWithoutExtra);

    if (event.target.value.length > 0) {
      setSymptoms([...symptomsWithoutExtra, `Extra: ${event.target.value}`]);
    }
  }

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={2} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 2. Síntomas"
              title="¿Sientes una sensación de ... en la zona ...?"
            />

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {PAINS_AND_SYMPTOMS.filter(
                  painItem => painItem.value === pain
                )[0].symptoms.map(symptom => (
                  <li
                    className={`transition-all rounded-xl p-3 flex items-center justify-between gap-4 cursor-pointer ${
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
                <li
                  className={`transition-all rounded-xl p-3 ${
                    textAreaValue.length > 0
                      ? 'bg-derma-primary/20'
                      : 'bg-derma-secondary400'
                  }`}
                >
                  <Text className="mb-2">Cuéntame tu vida</Text>
                  <textarea
                    className="w-full h-24 md:h-48 p-2 text-sm"
                    placeholder="Escribe aquí tus movidas"
                    onChange={event => {
                      handleTextArea(event);
                      setTextAreaValue(event.target.value);
                    }}
                    value={textAreaValue.replace(/^\s+/, '')}
                  />
                </li>
              </ul>
              <Flex className="justify-between">
                <Button
                  type="white"
                  customStyles="bg-transparent border-none"
                  onclick={() => router.back()}
                >
                  <SvgArrow className="h-4 w-4 rotate-180 mr-2" />
                  <Text className="text-derma-tertiary">Atrás</Text>
                </Button>
                <NextMultistepButton
                  nextUrl={ROUTES.derma.multistep.skinType}
                  isDisabled={symptoms.length === 0}
                />
              </Flex>
            </div>
          </Flex>
        </Container>
      </DermaLayout>
    </div>
  );
}
