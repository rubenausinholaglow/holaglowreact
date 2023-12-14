'use client';

import { useEffect, useState } from 'react';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgCalendar, SvgLocation } from 'app/icons/Icons';
import { useSessionStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';

dayjs.locale(spanishConf);

export default function ConctactForm() {
  const { selectedTreatments, selectedSlot, selectedDay, selectedClinic } =
    useSessionStore(state => state);
  const [selectedTreatmentsNames, setSelectedTreatmentsNames] = useState('');
  const [hideLayout, setHideLayout] = useState(false);

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
    <MainLayout
      isCheckout={!hideLayout}
      hideHeader={hideLayout}
      hideFooter={hideLayout}
    >
      <Container className="px-0 mt-6 md:mt-16">
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
                      <Text
                        size="xs"
                        className="w-full text-left pl-2 capitalize"
                      >
                        {localSelectedDay.format('dddd')},{' '}
                        {localSelectedDay.format('D')} de{' '}
                        {localSelectedDay.format('MMMM')}{' '}
                        {selectedSlot?.startTime}
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
      </Container>
    </MainLayout>
  );
}
