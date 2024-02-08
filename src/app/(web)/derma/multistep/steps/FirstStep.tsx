import { useEffect, useState } from 'react';
import TextInputField from '@dashboardComponents/TextInputField';
import { DermaQuestions } from '@interface/dermaquestions';
import {
  SvgCheckSquare,
  SvgCheckSquareActive,
  SvgWarning,
} from 'app/icons/IconsDs';
import dayjs from 'dayjs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function FirstStep({
  activeSlideIndex,
  dermaQuestions,
  setDermaQuestions,
  setContinueDisabled,
  continueDisabled,
  is18YearsOld,
  setIs18YearsOld,
  setErrorMessage,
}: {
  activeSlideIndex: number;
  dermaQuestions: DermaQuestions;
  setDermaQuestions: any;
  setContinueDisabled: any;
  continueDisabled: boolean;
  is18YearsOld: boolean;
  setIs18YearsOld: (value: boolean) => void;
  setErrorMessage: (value: string) => void;
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

  useEffect(() => {
    const name = dermaQuestions?.name;
    setContinueDisabled(!(!isEmpty(name) && is18YearsOld));
  }, [is18YearsOld]);

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
                  />
                </div>

                <div className="w-full">
                  {/* <TextInputField
                    label="¿Cuándo naciste?"
                    labelClassName="absolute top-3 left-4 text-xs text-hg-black500"
                    inputClassName="pt-[22px] text-derma-tertiary placeholder-hg-black300 w-full bg-white shadow-none"
                    placeholder="Escribe aquí"
                    type="date"
                    value={dermaQuestions?.birthDate || ''}
                    onChange={event => handleFieldChange(event, 'birthDate')}
                    disableBgIcons
                  /> */}

                  <label
                    htmlFor="termsAndConditionsAccepted"
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id="termsAndConditionsAccepted"
                      checked={is18YearsOld}
                      onChange={() => {
                        setIs18YearsOld(!is18YearsOld);
                      }}
                      className="hidden"
                    />
                    {is18YearsOld ? (
                      <SvgCheckSquareActive className="mr-2" />
                    ) : (
                      <SvgCheckSquare className="mr-2" />
                    )}
                    <span className="text-sm text-hg-black500">
                      Sí, confirmo que soy mayor de 18 años.
                    </span>
                  </label>
                </div>
              </Flex>
            </Flex>
          </Container>
        </>
      )}
    </div>
  );
}
