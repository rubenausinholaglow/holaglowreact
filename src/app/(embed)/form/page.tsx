'use client';

import { useEffect, useState } from 'react';
import RegistrationForm from 'app/components/common/RegistrationForm';
import { useSessionStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgCalendar, SvgLocation } from 'icons/Icons';

export default function Form() {
  const [hideLayout, setHideLayout] = useState(false);
  const [selectedTreatmentsNames, setSelectedTreatmentsNames] = useState('');

  const { selectedTreatments, selectedSlot, selectedDay, selectedClinic } =
    useSessionStore(state => state);

  const localSelectedDay = dayjs(selectedDay);

  useEffect(() => {
    if (selectedTreatments && selectedTreatments.length > 0) {
      setSelectedTreatmentsNames(
        selectedTreatments!.map(x => x.title).join(' + ')
      );
    }
    if (window) {
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      setHideLayout(params.get('hideLayout') == 'true');
    }
  }, []);

  return (
    <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
      <div className="w-full md:w-1/2 bg-hg-black50 px-4 py-6 md:p-8 rounded-3xl">
        <Flex layout="col-left" className="gap-4 mb-8">
          <Title size="xl" className="font-semibold">
            Reserva tu cita
          </Title>
          {localSelectedDay != undefined && (
            <>
              {!selectedSlot && (
                <Text size="sm">
                  Introduce tus datos de contacto para acceder a la agenda
                </Text>
              )}
              {selectedSlot && (
                <Text size="sm">
                  Introduce tus datos de contacto para la cita de{' '}
                  <span className="font-semibold w-full">
                    {selectedTreatmentsNames}
                  </span>
                </Text>
              )}
              {selectedClinic && selectedSlot && (
                <Flex className="">
                  <span>
                    <SvgLocation />
                  </span>
                  <Text size="xs" className="w-full text-left pl-2">
                    {selectedClinic.address}, {selectedClinic.city}
                  </Text>
                </Flex>
              )}
              {selectedSlot && (
                <Flex>
                  <span>
                    <SvgCalendar />
                  </span>
                  <Text size="xs" className="w-full text-left pl-2 capitalize">
                    {localSelectedDay.format('dddd')},{' '}
                    {localSelectedDay.format('D')} de{' '}
                    {localSelectedDay.format('MMMM')} {selectedSlot?.startTime}
                  </Text>
                </Flex>
              )}
            </>
          )}
        </Flex>

        <RegistrationForm redirect={hideLayout} />
      </div>
      <div className="w-full md:w-1/2"></div>
    </Flex>
  );
}
