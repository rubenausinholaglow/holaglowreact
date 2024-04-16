'use client';

import { useEffect, useRef, useState } from 'react';
import { atcb_action } from 'add-to-calendar-button';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgCalendar } from 'app/icons/Icons';
import { SvgArrow, SvgCheck } from 'app/icons/IconsDs';
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
import { Text, Title } from 'designSystem/Texts/Texts';

import AppointmentResume from './AppointmentResume';

export default function Confirmation({
  appointment,
  isDashboard,
  isDerma,
}: {
  appointment?: Appointment;
  isDashboard?: boolean;
  isDerma?: boolean;
}) {
  const ROUTES = useRoutes();
  const { setCurrentUser } = useGlobalPersistedStore(state => state);
  const { resetCart } = useCartStore(state => state);
  const {
    setAnalyticsMetrics,
    setPayment,
    selectedSlot,
    selectedDay,
    selectedClinic,
    selectedTreatments,
  } = useSessionStore(state => state);

  const [isProbadorVirtual, setisProbadorVirtual] = useState<boolean>(false);

  let selectedTreatmentsNames = '';
  let selectedTreatmentsDescription = '';

  if (selectedTreatments) {
    selectedTreatmentsNames = selectedTreatments.map(x => x.title).join(' + ');
    selectedTreatmentsDescription = selectedTreatments
      .map(x => x.description)
      .join(' + ');
  }

  const ADD_TO_CALENDAR_CONFIG: object = {
    name: isDerma
      ? 'Cita online - Derma by Holaglow'
      : `${selectedTreatmentsNames} - Holaglow`,
    description: isDerma
      ? 'Videollamada con tu dermatólogo estético'
      : selectedTreatmentsDescription || '',
    startDate: dayjs(selectedDay).format('YYYY-MM-DD'),
    startTime: selectedSlot?.startTime,
    endTime: selectedSlot?.endTime,
    options: ['Apple', 'Google', 'iCal', 'Outlook.com', 'Yahoo'],
    timeZone: 'Europe/Madrid',
    location: isDerma
      ? 'Videoconsulta online'
      : selectedClinic
      ? `${selectedClinic?.address}, ${selectedClinic?.city}`
      : '',
  };

  const addToCalendarRef = useRef(null);

  let tips = [
    {
      title: 'Confirmación de tu cita',
      text: 'Desde este momento, estaremos en contacto contigo por teléfono para resolver todas tus dudas y confirmar la cita.',
    },
    {
      title: 'Recomendaciones pretratamiento',
      text: 'En la página web podrás consultar algunos consejos del equipo médico para tener en cuenta antes de tu cita.',
    },
    {
      title: 'Distintos métodos de pago',
      text: 'El día de tu visita a la clínica, podrás elegir el método de pago que mejor se adapte a ti, incluso financiación sin intereses.',
    },
  ];

  if (isDerma) {
    tips = [
      {
        title: 'Análisis médico',
        text: 'Tu médico revisará la información del formulario y tus fotos. Nos pondremos en contacto contigo si hiciera falta más información.',
      },
      {
        title: 'Resultados en 48h',
        text: 'Te enviaremos por WhatsApp el acceso a tu área de usuario con tu diagnóstico y la rutina personalizada diseñada por tu médico.',
      },
      {
        title: 'Pide tu crema en la farmacia',
        text: 'Descarga la receta de tu área de usuario y pide la crema en tu farmacia más cercana. Si has elegido tu rutina completa o trimestral, el resto de cremas te llegarán a casa en los siguientes 3-5 días hábiles.',
      },
    ];
  }

  useEffect(() => {
    if (!isDashboard) {
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
      resetCart();
      setPayment(undefined);
    }

    setisProbadorVirtual(
      selectedTreatments.length > 0 &&
        selectedTreatments[0].id ===
          process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID?.toLowerCase()
    );
  }, []);

  return (
    <Container className="px-0 md:px-4 mt-12 mb-4 md:mt-16">
      <div className="md:w-1/2 md:pr-8">
        <SvgCheck
          height={88}
          width={88}
          className={`${
            isDerma
              ? 'bg-derma-primary text-derma-primary100'
              : 'bg-hg-secondary text-hg-primary'
          } rounded-full p-3 mx-auto mb-8`}
        />
      </div>
      <div className="md:grid grid-cols-2 gap-16">
        <div className="w-full">
          <Flex layout="col-left" className="w-full items-center px-4 md:px-0">
            {appointment ? (
              <>
                <Text
                  className={`${
                    isDerma
                      ? 'text-derma-primary font-gtUltraThin'
                      : 'text-hg-secondary font-semibold'
                  } text-center mb-4`}
                  size="xl"
                >
                  ¡Gracias por confirmar tu cita!
                </Text>
                <Text className="text-center hidden text-hg-black500 md:block mb-4">
                  Te esperamos el día elegido en tu clínica Holaglow. No dudes
                  en contactar con nosotros antes si tienes cualquier duda. ¡Qué
                  ganas de verte!
                </Text>
              </>
            ) : (
              <>
                <Title
                  size="xldr"
                  className={`${
                    isDerma ? 'text-derma-primary' : ''
                  } text-center mb-4 font-light`}
                >
                  Pago recibido.
                </Title>
                {!isDerma && (
                  <Text className="text-center text-hg-black500 hidden md:block">
                    Nos alegramos de que confíes en nosotros para acompañarte,
                    aconsejarte y ayudarte a conseguir el efecto glow que
                    deseas. Nuestro propósito es que te mires bonito para que te
                    sientas aún mejor. ¡Qué ganas de verte!
                  </Text>
                )}
                {isDerma && (
                  <Text className="text-center text-hg-black500 hidden md:block">
                    Tu médico analizará tu caso y te haremos llegar la rutina
                    personalizada
                  </Text>
                )}
              </>
            )}
          </Flex>
        </div>
        <div className="row-span-2 w-full px-4 md:px-0">
          <div className="mb-8">
            {isDerma ? (
              <AppointmentResume isDerma />
            ) : (
              <AppointmentResume
                appointment={appointment}
                isProbadorVirtual={isProbadorVirtual}
                isDashboard={isDashboard}
                bgColor="bg-hg-black100"
                isConfirmation
              />
            )}
          </div>
          {!isDashboard && !isDerma && (
            <Flex
              layout="col-left"
              className={`${
                isDerma
                  ? 'gap-4 w-full border border-derma-primary100 rounded-3xl bg-white p-6 mb-12'
                  : ''
              }`}
            >
              <Button
                size="xl"
                type={isDerma ? 'derma' : 'primary'}
                ref={addToCalendarRef}
                className="w-full"
                customStyles="justify-start"
                onClick={() =>
                  atcb_action(
                    ADD_TO_CALENDAR_CONFIG,
                    addToCalendarRef.current
                      ? addToCalendarRef.current
                      : undefined
                  )
                }
              >
                <Flex
                  layout="row-center"
                  className={` rounded-full h-12 w-12 mr-2 ${
                    isDerma ? 'bg-derma-primary500' : 'bg-transparent'
                  }`}
                >
                  <SvgCalendar />
                </Flex>
                Añadir a mi calendario
              </Button>
            </Flex>
          )}
          {!isDashboard && !isDerma && (
            <div className="pt-12">
              <a href="/tratamientos" className="hidden md:block">
                <Button
                  type="white"
                  size="md"
                  className="hidden md:flex"
                  href={ROUTES.treatments}
                >
                  <Flex layout="row-center">
                    <span className="font-semibold">Ver tratamientos</span>
                    <SvgArrow height={18} width={18} className="ml-2" />
                  </Flex>
                </Button>
              </a>
            </div>
          )}
        </div>

        {!appointment && (
          <>
            <Flex
              layout="col-left"
              className="bg-derma-secondary500 py-6 px-4 md:rounded-xl gap-4 md:mb-8"
            >
              <Title
                className="font-light text-left mb-4 text-derma-primary"
                size="xldr"
              >
                A partir de ahora...
              </Title>
              {tips.map((item, index) => (
                <Flex
                  className={`pb-4 items-start ${
                    index + 1 !== tips.length
                      ? 'border-b border-hg-secondary300 pb-4'
                      : ''
                  }`}
                  key={item.title}
                >
                  <Text
                    className={`${
                      isDerma
                        ? 'bg-derma-secondary300 text-derma-primary500'
                        : 'bg-derma-secondary500 text-hg-secondary'
                    } w-6 h-6 font-semibold items-center  shrink-0 rounded-full text-center mr-2`}
                  >
                    {index + 1}
                  </Text>
                  <div className="flex flex-col">
                    <Text className="font-semibold text-sm">{item.title}</Text>
                    <Text className="text-sm text-hg-black500">
                      {item.text}
                    </Text>
                  </div>
                </Flex>
              ))}
              {!isDashboard && (
                <a href="/tratamientos" className="md:hidden">
                  <Button type="white" size="md" href={ROUTES.treatments}>
                    <Flex layout="row-center">
                      Ver tratamientos
                      <SvgArrow height={18} width={18} className="ml-2" />
                    </Flex>
                  </Button>
                </a>
              )}
            </Flex>
          </>
        )}
      </div>
    </Container>
  );
}
