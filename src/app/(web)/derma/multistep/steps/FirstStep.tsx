import { useEffect } from 'react';
import TextInputField from '@dashboardComponents/TextInputField';
import { DermaQuestions } from '@interface/dermaquestions';
import { SvgWarning } from 'app/icons/IconsDs';
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
  showFirstStepErrors,
}: {
  activeSlideIndex: number;
  dermaQuestions: DermaQuestions;
  setDermaQuestions: any;
  setContinueDisabled: any;
  continueDisabled: boolean;
  showFirstStepErrors: boolean;
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
    const birthDate = dermaQuestions?.birthDate;

    if (!isEmpty(name) && !isEmpty(birthDate)) {
      const today = dayjs();
      const years = today.diff(dayjs(birthDate), 'years');
      setContinueDisabled(years < 18);
    } else {
      setContinueDisabled(true);
    }
  }, [dermaQuestions]);

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
                  <TextInputField
                    label="¿Cuándo naciste?"
                    labelClassName="absolute top-3 left-4 text-xs text-hg-black500"
                    inputClassName="pt-[22px] text-derma-tertiary placeholder-hg-black300 w-full bg-white shadow-none"
                    placeholder="Escribe aquí"
                    type="date"
                    value={dermaQuestions?.birthDate || ''}
                    onChange={event => handleFieldChange(event, 'birthDate')}
                    disableBgIcons
                  />
                </div>

                {showFirstStepErrors && continueDisabled && (
                  <Flex
                    layout="row-left"
                    className="gap-2 p-3 text-sm rounded-xl bg-hg-error300 text-hg-error w-full"
                  >
                    <SvgWarning className="w-4 h-4" />

                    {isEmpty(dermaQuestions.name) ||
                    isEmpty(dermaQuestions.birthDate)
                      ? 'Completa todos los campos para continuar'
                      : 'Debes ser mayor de edad para utilizar este servicio'}
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Container>
        </>
      )}
    </div>
  );
}
