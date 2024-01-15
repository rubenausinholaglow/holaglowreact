'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import TextInputField from '@dashboardComponents/TextInputField';
import { DermaQuestions } from '@interface/dermaquestions';
import { SvgCalendar, SvgClose } from 'app/icons/Icons';
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
            <Text className="text-sm text-derma-primary500 mb-2">
              Paso {activeSlideIndex + 1}, validación de usuario
            </Text>
            <Text className="font-gtUltraThin mb-2 font-bold text-xl text-derma-primary">
              Primero, comencemos con tu información básica
            </Text>
            <Text className="text-hg-black500 text-sm mb-8">
              Ten en cuenta que nuestros profesionales de la salud no podrán
              recetar antibióticos orales o medicamentos, como Roaccutane y
              Spironolactone, en línea, ya que esto requiere una consulta en
              persona. Nuestros médicos solo pueden abordar preocupaciones
              relacionadas con tu piel.
            </Text>

            <div className="grid grid-cols-1 gap-4 w-full">
              <div>
                <label className="text-sm text-hg-black500 pl-2">Nombre</label>
                <TextInputField
                  placeholder="Escribe aquí"
                  value={dermaQuestions?.name || ''}
                  onChange={event => handleFieldChange(event, 'name')}
                  hasNoValidation
                />
              </div>
              <div>
                <label className="text-sm text-hg-black500 pl-2">
                  Fecha de nacimiento
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
            </div>
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
