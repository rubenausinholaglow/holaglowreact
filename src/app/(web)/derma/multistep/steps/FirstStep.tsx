'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import TextInputField from '@dashboardComponents/TextInputField';
import { DermaQuestions } from '@interface/dermaquestions';
import { SvgCalendar, SvgClose } from 'app/icons/Icons';
import { useGlobalStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';

export default function FirstStep({
  activeSlideIndex,
  dermaQuestions,
  setDermaQuestions,
}: {
  activeSlideIndex: number;
  dermaQuestions: DermaQuestions;
  setDermaQuestions: any;
}) {
  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setDermaQuestions((prevDermaQuestions: DermaQuestions) => ({
      ...prevDermaQuestions,
      [field]: event.target.value,
    }));
  };

  return (
    <div>
      {activeSlideIndex === 0 && (
        <>
          <Container>
            <Flex layout="col-left" className="w-full md:flex-row md:gap-16">
              <Flex layout="col-left" className="w-full gap-4 md:w-1/2">
                <Text className="text-sm text-derma-primary500">
                  Paso {activeSlideIndex + 1}. Información básica del paciente
                </Text>
                <Text className="font-gtUltraThin text-xl text-derma-primary md:text-2xl mb-4">
                  Empecemos por ti
                </Text>
              </Flex>

              <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
                <div className="w-full">
                  <TextInputField
                    label="¿Cuál es tu nombre?"
                    labelClassName="absolute top-3 left-4 text-xs text-hg-black500"
                    inputClassName="pt-[22px] text-derma-tertiary placeholder-hg-black300"
                    placeholder="Escribe aquí"
                    value={dermaQuestions?.name || ''}
                    onChange={event => handleFieldChange(event, 'name')}
                    hasNoValidation
                  />
                </div>

                <div className="w-full">
                  <TextInputField
                    label="¿Cuándo naciste?"
                    labelClassName="absolute top-3 left-4 text-xs text-hg-black500"
                    inputClassName="pt-[22px] text-derma-tertiary placeholder-hg-black300"
                    placeholder="Escribe aquí"
                    type="date"
                    value={dermaQuestions?.birthDate || ''}
                    onChange={event => handleFieldChange(event, 'birthDate')}
                    hasNoValidation
                  />
                </div>
              </Flex>
            </Flex>
          </Container>
        </>
      )}
    </div>
  );
}
