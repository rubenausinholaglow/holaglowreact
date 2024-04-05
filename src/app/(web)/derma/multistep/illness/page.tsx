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
import { ILLNESSES } from '../multistepConfig';
import NextMultistepButton from '../NextMultistepButton';

export default function Illnesses() {
  const router = useRouter();
  const { illness, illnessInfo, setIllness, setIllnessInfo } = useDermaStore(
    state => state
  );

  const [textAreaValue, setTextAreaValue] = useState(illnessInfo);

  return (
    <div className="bg-derma-secondary100 min-h-screen">
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block" />

      <DermaLayout hideButton hideFooter>
        <DermaStepBar steps={7} step={6} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Paso 6. Enfermedades"
              title="¿Actualmente tienes alguna enfermedad conocida?"
            />

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {ILLNESSES.map(item => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      illness === item.value
                        ? 'bg-derma-primary/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item.title}
                    onClick={() =>
                      setIllness(illness === item.value ? 0 : item.value)
                    }
                  >
                    {item.title}
                    {illness === item.value ? (
                      <SvgCheckSquareActive className="h-6 w-6" />
                    ) : (
                      <SvgCheckSquare className="h-6 w-6" />
                    )}
                  </li>
                ))}
              </ul>
              {illness === 1 && (
                <>
                  <Title className="font-light text-derma-primary mb-2">
                    Cuéntanos más sobre la enfermedad
                  </Title>
                  <Text className="mb-4 text-hg-black400 text-sm">
                    Necesitamos información lo más precisa posible para adaptar
                    tu rutina si fuera necesario
                  </Text>
                  <div className="relative">
                    <Text className="absolute top-4 left-4 text-hg-black500 text-sm">
                      Cuéntanos
                    </Text>
                    <textarea
                      className="w-full h-56 md:h-64 p-4 text-sm rounded-2xl border border-derma-secondary500 mb-8 pt-10"
                      placeholder="Qué enfermedad tienes, desde hace cuánto..."
                      onChange={event => {
                        setIllnessInfo(event.target.value);
                        setTextAreaValue(event.target.value);
                      }}
                      value={
                        textAreaValue && textAreaValue.length > 0
                          ? textAreaValue.replace(/^\s+/, '')
                          : ''
                      }
                    />
                  </div>
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
                  nextUrl={ROUTES.derma.multistep.medication}
                  isDisabled={
                    illness === 0 || (illness === 1 && illnessInfo.length === 0)
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
