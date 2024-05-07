'use client';

import { useEffect, useState } from 'react';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import DermaLayout from 'app/(web)/components/layout/DermaLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import dayjs from 'dayjs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { useSearchParams } from 'next/navigation';

export default function RescheduledAppointment() {
  const searchParams = useSearchParams();
  const { clinics } = useGlobalPersistedStore(state => state);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<string | undefined>(undefined);
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [endTime, setEndTime] = useState<string | undefined>(undefined);

  useEffect(() => {
    setCity(searchParams.get('city') || undefined);
    setDate(searchParams.get('date') || undefined);
    setStartTime(searchParams.get('startTime') || undefined);
    setEndTime(searchParams.get('endTime') || undefined);
  }, []);

  function getClinicAddress(city: string | undefined) {
    if (city) {
      let address;

      clinics?.map(clinic => {
        if (clinic.city.toLowerCase() === city.toLowerCase()) {
          address = clinic.address;
        }
      });
      return address;
    }

    return undefined;
  }

  return (
    <DermaLayout>
      <Container className="py-4 md:py-32">
        <Flex layout="col-left" className="md:flex-row">
          <div>
            <Title size="xl" className="mb-8 font-bold">
              ¡Genial! Hemos reprogramado tu cita
            </Title>
            <Text className="md:text-lg mb-4">
              Estamos deseando verte el{' '}
              <span className="font-semibold">
                {dayjs(date).format('dddd, D [de] MMMM')} a las {startTime}
              </span>{' '}
              en nuestra clínica en{' '}
              <span className="font-semibold">
                {getClinicAddress(city)}, {city}
              </span>
              .
            </Text>

            <Text className="md:text-lg mb-8">
              Cita actualizada correctamente
            </Text>

            <div className="mb-8">
              <AddToCalendarButton
                styleLight={`--btn-background: ${HOLAGLOW_COLORS['primary']}; --btn-border: ${HOLAGLOW_COLORS['black']}; --btn-shadow: none; --btn-text: ${HOLAGLOW_COLORS['black']};`}
                name="Cita en Holaglow"
                description="Ven a vivir la experiencia Holaglow en primera persona &#127775; Te esperamos en la clínica para ayudarte a lucir tu mejor versión de forma natural!  ¡Nos vemos!"
                startDate={date || undefined}
                startTime={startTime || undefined}
                endDate={date || undefined}
                endTime={endTime || undefined}
                timeZone="Europe/Madrid"
                location={getClinicAddress(city)}
                options={['Apple', 'Google', 'iCal', 'Outlook.com', 'Yahoo']}
                trigger="click"
                label="Agregar cita al calendario"
                buttonStyle="round"
                hideBackground
              ></AddToCalendarButton>
            </div>
          </div>

          <div
            className={`overflow-hidden max-w-full w-full md:w-2/5 md:mr-12 shrink-0 md:-order-1`}
            style={{ height: `333px` }}
          >
            <div id="g-mapdisplay" className="h-full w-full max-w-full">
              <iframe
                className="h-full w-full border-none"
                src={`https://www.google.com/maps/embed/v1/place?q=Holaglow,+${getClinicAddress(
                  city
                )},+España&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
              ></iframe>
            </div>
          </div>
        </Flex>
      </Container>
    </DermaLayout>
  );
}
