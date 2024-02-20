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
import { Text } from 'designSystem/Texts/Texts';

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
    selectedTreatments,
  } = useSessionStore(state => state);

  const [isProbadorVirtual, setisProbadorVirtual] = useState<boolean>(false);

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
        title: 'Detalles de videollamada',
        text: 'Antes de tu consulta, te enviaremos un whatsapp y un correo electrónico para recordarte el enlace de acceso a la videollamada.',
      },
      {
        title: 'Consejos para tu consulta',
        text: 'Te damos tres tips para que aproveches al máximo tu cita online con el médico: Buena conexión, buena luz y cara lavada.',
      },
      {
        title: 'Solución personalizada',
        text: 'Después, recibirás el plan de cuidado facial que el dermatólogo haya diseñado para ti y la receta de la crema formulada, si corresponde.',
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
    <Container className="mt-12 mb-4 md:mt-16">
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
          <Flex layout="col-left" className="w-full items-center">
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
                <Text
                  className={`${
                    isDerma
                      ? 'text-derma-primary font-gtUltraThin'
                      : 'text-hg-secondary font-semibold'
                  } text-center mb-4`}
                  size="xl"
                >
                  ¡Gracias!
                  <br />
                  Tu cita ha sido realizada con éxito
                </Text>
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
                    Nos alegramos de que confíes en nosotros para asesorarte y
                    acompañarte en este camino hacia una piel más sana. Nuestro
                    propósito es atender tus necesidades de manera personalizada
                    para garantizarte unos resultados efectivos y duraderos.
                    ¡Qué ganas de verte!
                  </Text>
                )}
              </>
            )}
          </Flex>
        </div>
        <div className="row-span-2 w-full">
          <div className="mb-8">
            {isDerma ? (
              <AppointmentResume isDerma />
            ) : (
              <AppointmentResume
                appointment={appointment}
                isProbadorVirtual={isProbadorVirtual}
                bgColor="bg-hg-secondary100"
              />
            )}
          </div>

          {isDerma && (
            <Flex
              layout="col-left"
              className="gap-4 w-full border border-derma-primary100 rounded-3xl bg-white p-6 mb-12"
            >
              <Button
                size="xl"
                type="tertiary"
                ref={addToCalendarRef}
                className="w-full"
                customStyles="border-none bg-derma-primary text-derma-primary100 font-normal justify-start pl-2"
                onClick={() =>
                  atcb_action(
                    {
                      name: 'Cita online - Derma by Holaglow',
                      description: 'Videollamada con tu dermatólogo estético',
                      startDate: dayjs(selectedDay).format('YYYY-MM-DD'),
                      startTime: selectedSlot?.startTime,
                      endTime: selectedSlot?.endTime,
                      options: [
                        'Apple',
                        'Google',
                        'iCal',
                        'Outlook.com',
                        'Yahoo',
                      ],
                      timeZone: 'Europe/Madrid',
                    },
                    addToCalendarRef.current
                      ? addToCalendarRef.current
                      : undefined
                  )
                }
              >
                <Flex
                  layout="row-center"
                  className="bg-derma-primary500 rounded-full h-12 w-12 mr-2"
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
                  type="tertiary"
                  size="md"
                  className="hidden md:flex"
                  customStyles="group-hover:bg-hg-secondary100"
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
          <div className="w-full pb-4">
            <div className="w-full mb-6">
              <Text className="font-semibold text-left" size="xl">
                A partir de ahora...
              </Text>
            </div>
            <Flex
              layout="col-left"
              className="bg-hg-cream500 p-4 rounded-xl gap-4"
            >
              {tips.map((item, index) => (
                <Flex
                  className="border-b border-hg-secondary300 pb-4 items-start"
                  key={item.title}
                >
                  <Text
                    className={`${
                      isDerma
                        ? 'bg-derma-secondary500 text-derma-primary500'
                        : 'bg-hg-black text-hg-primary'
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
            </Flex>

            <div className="pt-6 md:hidden">
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
        )}
      </div>
    </Container>
  );
}
