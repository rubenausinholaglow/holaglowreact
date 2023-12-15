'use client';

import { useEffect, useState } from 'react';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import { SvgCalendar, SvgHour, SvgLocation } from 'app/icons/Icons';
import { SvgArrow, SvgCheck, SvgInjection } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Appointment } from 'app/types/appointment';
import { AnalyticsMetrics } from 'app/types/client';
import useRoutes from 'app/utils/useRoutes';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import AppointmentResume from './AppointmentResume';

export default function Confirmation({
  appointment,
  isDashboard,
}: {
  appointment?: Appointment;
  isDashboard?: boolean;
}) {
  const ROUTES = useRoutes();
  const { clinics } = useGlobalPersistedStore(state => state);
  const { setCurrentUser } = useGlobalPersistedStore(state => state);
  const {
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
    selectedPacksTreatments,
    setAnalyticsMetrics,
  } = useSessionStore(state => state);

  const [city, setCity] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const localSelectedDay = dayjs(
    appointment ? appointment.startTime : selectedDay
  );

  const startTime = appointment
    ? appointment?.startTime
      ? appointment.startTime.slice(-5)
      : ''
    : selectedSlot?.startTime;

  let selectedTreatmentsNames = '';

  if (selectedTreatments) {
    selectedTreatmentsNames = selectedTreatments.map(x => x.title).join(' + ');
  }

  useEffect(() => {
    setCurrentUser(undefined);
    const metrics: AnalyticsMetrics = {
      device: 0,
      locPhysicalMs: '',
      utmAdgroup: '',
      utmCampaign: '',
      utmContent: '',
      utmMedium: '',
      utmSource: '',
      utmTerm: '',
      treatmentText: '',
      externalReference: '',
      interestedTreatment: '',
      treatmentPrice: 0,
    };
    setAnalyticsMetrics(metrics);
  }, []);

  useEffect(() => {
    const appointmentClinic = appointment
      ? clinics.filter(clinic => clinic.flowwwId === appointment?.clinicId)[0]
      : undefined;

    const appointmentCity = appointmentClinic ? appointmentClinic.city : '';
    const appointmentAddress = appointmentClinic
      ? appointmentClinic.address
      : '';

    setCity(appointmentCity || selectedClinic?.city || '');
    setAddress(appointmentAddress || selectedClinic?.address || '');
  }, [clinics]);

  return (
    <Container className="mt-12 mb-4 md:mt-16">
      <div className="md:w-1/2 md:pr-8">
        <SvgCheck
          height={88}
          width={88}
          className="bg-hg-secondary300 text-hg-primary rounded-full p-3 mx-auto mb-8"
        />
      </div>
      <div className="md:grid grid-cols-2 gap-16">
        <div className="w-full">
          <Flex layout="col-left" className="w-full items-center">
            {appointment ? (
              <>
                <Text className="font-semibold text-center mb-4" size="xl">
                  ¡Gracias por confirmar tu cita!
                </Text>
                <Text className="text-center hidden md:block mb-4">
                  Te esperamos el día elegido en tu clínica Holaglow. No dudes
                  en contactar con nosotros antes si tienes cualquier duda. ¡Qué
                  ganas de verte!
                </Text>
              </>
            ) : (
              <>
                <Text className="font-semibold text-center" size="xl">
                  ¡Gracias!
                </Text>
                <Text className="font-semibold text-center mb-4" size="xl">
                  Tu cita ha sido realizada con éxito
                </Text>
                <Text className="text-center hidden md:block">
                  Nos alegramos de que confíes en nosotros para acompañarte,
                  aconsejarte y ayudarte a conseguir el efecto glow que deseas.
                  Nuestro propósito es que te mires bonito para que te sientas
                  aún mejor. ¡Qué ganas de verte!
                </Text>
              </>
            )}
          </Flex>
        </div>
        <div className="row-span-2 w-full">
          <AppointmentResume appointment={appointment} />

          <Text className="hidden md:block mb-6 text-xs">
            Resumen de tu cita
          </Text>
          <div className="bg-hg-black text-white p-4 gap-2 rounded-xl">
            <div className="w-full mt-3 pb-3 flex items-center">
              <SvgCalendar className="mr-2" />
              <Text className="font-semibold capitalize">
                {localSelectedDay.format('dddd')},{' '}
                {localSelectedDay.format('D')} de{' '}
                {localSelectedDay.format('MMMM')} de{' '}
                {localSelectedDay.format('YYYY')}
              </Text>{' '}
            </div>
            <div className="w-full pb-3 flex items-center">
              <SvgHour className="mr-2" />
              <Text className="font-semibold">{startTime}</Text>
            </div>
            <div
              className={`w-full flex items-start pb-3 ${
                !appointment ? 'border-b border-hg-black700' : ''
              }`}
            >
              <SvgLocation className="mr-2 mt-1" />
              <div className="flex flex-col">
                <Text className="font-semibold">{city}</Text>
                <Text size="xs">{address}</Text>
              </div>
            </div>
            {!appointment && (
              <div className="w-full flex items-start pt-4 text-hg-primary">
                <div className="flex flex-col">
                  <Text className="font-semibold">
                    {selectedTreatmentsNames}
                  </Text>
                  {selectedTreatments &&
                  selectedTreatments[0] &&
                  selectedTreatments[0].isPack ? (
                    <ul className="p-1">
                      {selectedPacksTreatments &&
                        selectedPacksTreatments.map(item => {
                          return <li key={item.title}>- {item.title}</li>;
                        })}
                    </ul>
                  ) : selectedTreatments[0] &&
                    !isEmpty(selectedTreatments[0].appliedProducts) ? (
                    selectedTreatments[0].appliedProducts.map(item => {
                      const iconName = item.icon.split('/')[0] || 'SvgCross';
                      const iconFamily:
                        | 'default'
                        | 'category'
                        | 'suggestion'
                        | 'service' =
                        (item.icon.split('/')[1] as 'default') || 'default';

                      return (
                        <Flex key={item.titlte} className="items-start mb-2">
                          <DynamicIcon
                            height={16}
                            width={16}
                            className="mr-2 mt-0.5 text-hg-primary shrink-0"
                            name={iconName}
                            family={iconFamily}
                          />

                          <Text>{item.titlte}</Text>
                        </Flex>
                      );
                    })
                  ) : (
                    <Flex className="items-start mb-2">
                      <SvgInjection
                        height={16}
                        width={16}
                        className="mr-2 mt-0.5 text-hg-secondary shrink-0"
                      />
                      {selectedTreatments[0] && (
                        <Text>{selectedTreatments[0].description}</Text>
                      )}
                    </Flex>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="pt-12">
            {!isDashboard && (
              <a href="/tratamientos">
                <Button
                  type="tertiary"
                  size="md"
                  className="hidden md:inline"
                  customStyles="group-hover:bg-hg-secondary100"
                  href={ROUTES.treatments}
                >
                  <Flex layout="row-center">
                    <span className="font-semibold">Ver tratamientos</span>
                    <SvgArrow height={18} width={18} className="ml-2" />
                  </Flex>
                </Button>
              </a>
            )}
          </div>
        </div>

        {!appointment && (
          <div className="w-full">
            <div className="w-full mb-6">
              <Text className="font-semibold  text-left" size="xl">
                A partir de ahora...
              </Text>
            </div>
            <Flex
              layout="col-left"
              className="bg-hg-secondary100 p-4 rounded-xl gap-4"
            >
              <Flex className="border-b border-hg-secondary300 pb-4 items-start">
                <Text className="bg-hg-black w-6 h-6 font-semibold items-center text-hg-primary shrink-0 rounded-full text-center mr-2">
                  1
                </Text>
                <div className="flex flex-col">
                  <Text className="font-semibold text-sm">
                    Confirmación de tu cita
                  </Text>
                  <Text className="text-sm text-hg-black500">
                    Desde este momento, estaremos en contacto contigo por
                    teléfono para resolver todas tus dudas y confirmar la cita.
                  </Text>
                </div>
              </Flex>
              <Flex className="border-b border-hg-secondary300 pb-4 items-start">
                <Text className="bg-hg-black w-6 h-6 font-semibold items-center text-hg-primary shrink-0 rounded-full text-center mr-2">
                  2
                </Text>
                <div className="flex flex-col">
                  <Text className="font-semibold text-sm">
                    Recomendaciones pretratamiento
                  </Text>
                  <Text className="text-sm text-hg-black500">
                    En la página web podrás consultar algunos consejos del
                    equipo médico para tener en cuenta antes de tu cita.
                  </Text>
                </div>
              </Flex>
              <Flex className="items-start">
                <Text className="bg-hg-black w-6 h-6 font-semibold items-center text-hg-primary shrink-0 rounded-full text-center mr-2">
                  3
                </Text>
                <div className="flex flex-col">
                  <Text className="font-semibold text-sm">
                    Distintos métodos de pago
                  </Text>
                  <Text className="text-sm text-hg-black500">
                    El día de tu visita a la clínica, podrás elegir el método de
                    pago que mejor se adapte a ti, incluso financiación sin
                    intereses.
                  </Text>
                </div>
              </Flex>
            </Flex>
          </div>
        )}
      </div>
    </Container>
  );
}
