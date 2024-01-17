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
  setContinueDisabled,
}: {
  activeSlideIndex: number;
  dermaQuestions: DermaQuestions;
  setDermaQuestions: any;
  setContinueDisabled: any;
}) {
  const [localDateSelected, setLocalDateSelected] = useState(new Date());
  const [showBirthDateCalendar, setShowBirthDateCalendar] =
    useState<boolean>(false);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setDermaQuestions((prevDermaQuestions: DermaQuestions) => ({
      ...prevDermaQuestions,
      [field]: event.target.value,
    }));
  };

  const selectDate = (x: Date) => {
    const dayjsDate = dayjs(x);
    const today = dayjs();
    const years = today.diff(dayjsDate, 'years');
    setLocalDateSelected(dayjsDate.toDate());
    setContinueDisabled(years < 18);
    dermaQuestions.birthDate = dayjsDate.format('DD-MM-YYYY');
    setDermaQuestions(dermaQuestions);
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
                <Text className="font-gtUltraThin font-bold text-xl text-derma-primary md:text-2xl">
                  Empecemos por ti
                </Text>
              </Flex>

              <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
                <div className="w-full">
                  <label className="text-sm text-hg-black500 pl-2">
                    ¿Cuál es tu nombre?
                  </label>
                  <TextInputField
                    placeholder="Escribe aquí"
                    value={dermaQuestions?.name || ''}
                    onChange={event => handleFieldChange(event, 'name')}
                    hasNoValidation
                  />
                </div>
                <div className="w-full">
                  <label className="text-sm text-hg-black500 pl-2">
                    ¿Cuándo naciste?
                  </label>
                  <Flex
                    layout="row-between"
                    className={`bg-white border border-hg-black300 rounded-2xl px-4 py-2 mr-4 w-full text-hg-black h-16 ${
                      dermaQuestions?.birthDate || showBirthDateCalendar
                        ? 'border-hg-black'
                        : ''
                    }`}
                    onClick={() => setShowBirthDateCalendar(true)}
                  >
                    {dermaQuestions?.birthDate ? (
                      <p>{dermaQuestions?.birthDate}</p>
                    ) : (
                      <p className="text-hg-black400">dd-mm-aaaa</p>
                    )}

                    <SvgCalendar className="h-6 w-6 text-derma-primary" />
                  </Flex>
                </div>
              </Flex>
            </Flex>
          </Container>

          <Flex
            layout="col-center"
            className={`w-full ${showBirthDateCalendar ? 'block' : 'hidden'}`}
          >
            <div
              id="datepickerWrapper"
              className={`datepickerDerma w-full mt-2 pb-2 ${
                showBirthDateCalendar ? 'block' : 'hidden'
              }`}
            >
              <DatePicker
                inline
                onChange={selectDate}
                onMonthChange={selectDate}
                onYearChange={selectDate}
                useWeekdaysShort
                calendarStartDay={1}
                locale="es"
                className="w-full"
                fixedHeight
                selected={localDateSelected}
                disabledKeyboardNavigation
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
              />
            </div>
            {(dermaQuestions?.birthDate || showBirthDateCalendar) && (
              <SvgClose
                className="bg-derma-primary p-1 rounded-full text-white h-10 w-10 mx-auto -mt-5 relative"
                onClick={() => setShowBirthDateCalendar(false)}
              />
            )}
          </Flex>
        </>
      )}
    </div>
  );
}
