'use client';

import { useState } from 'react';
import ROUTES from '@utils/routes';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { SvgCircle } from 'app/icons/Icons';
import { SvgArrow, SvgRadioChecked } from 'app/icons/IconsDs';
import { useDermaStore } from 'app/stores/dermaStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

import DermaStepBar from '../../components/DermaStepBar';
import DermaStepHeader from '../../components/DermaStepHeader';
import { ALLERGIES } from '../multistepConfig';
import NextMultistepButton, {
  HandleNextMultistep,
} from '../NextMultistepButton';

export default function Allergies() {
  const router = useRouter();
  const { allergy, allergyInfo, setAllergy, setAllergyInfo } = useDermaStore(
    state => state
  );

  const [textAreaValue, setTextAreaValue] = useState(allergyInfo);

  const nextStep = HandleNextMultistep(ROUTES.derma.multistep.medication);
  return (
    <DermaLayout
      hideButton
      hideFooter
      hideNavigation
      className="bg-derma-secondary300 min-h-screen relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white hidden md:block " />
      <div className="relative">
        <DermaStepBar steps={22} step={16} />
        <Container>
          <Flex
            layout="col-left"
            className="w-full md:flex-row gap-6 md:gap-16 mb-8"
          >
            <DermaStepHeader
              intro="Alergias"
              title="¿Tienes alguna alergia conocida?"
            />

            <div className="w-full md:w-1/2">
              <ul className="flex flex-col gap-4 w-full mb-8">
                {ALLERGIES.map(item => (
                  <li
                    className={`transition-all rounded-xl px-3 py-4 flex items-center justify-between gap-4 cursor-pointer ${
                      allergy === item.value
                        ? 'bg-derma-primary500/20'
                        : 'bg-derma-secondary400'
                    }`}
                    key={item.title}
                    onClick={async () => {
                      setAllergy(allergy === item.value ? 0 : item.value);

                      if (
                        (item.value === 2 || item.value === 3) &&
                        allergy !== item.value
                      )
                        await nextStep();
                    }}
                  >
                    {item.title}
                    {allergy === item.value ? (
                      <SvgRadioChecked className="h-7 w-7 shrink-0" />
                    ) : (
                      <SvgCircle className="h-7 w-7 shrink-0" />
                    )}
                  </li>
                ))}
              </ul>
              {allergy === 1 && (
                <>
                  <Title className="font-light text-derma-primary mb-2">
                    Cuéntanos más sobre tus alergias
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
                      className="w-full h-56 md:h-64 p-4 text-sm rounded-2xl border border-derma-secondary500 mb-8 pt-10 resize-none"
                      placeholder="Qué tipo de alergia tienes, a algún medicamento, alimento..."
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
                  </div>
                </>
              )}
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
                {allergy === 1 && (
                  <NextMultistepButton
                    nextUrl={ROUTES.derma.multistep.medication}
                    isDisabled={allergyInfo.length === 0}
                  />
                )}
              </Flex>
            </div>
          </Flex>
        </Container>
      </div>
    </DermaLayout>
  );
}
