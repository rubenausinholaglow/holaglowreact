'use client';

import { useEffect, useState } from 'react';
import { Appointment } from '@interface/appointment';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import ScheduleService from '@services/ScheduleService';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
import { isMobile } from 'app/(web)/components/layout/Breakpoint';
import { SvgCalendar, SvgLocation, SvgSpinner } from 'app/icons/Icons';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

export default function AppointmentList({
  setAppointmentToCancel,
  setShowCancelModal,
  cancelling,
  isDerma = false,
  isDashboard = false,
}: {
  setAppointmentToCancel: (appointment: Appointment) => void;
  setShowCancelModal: (value: boolean) => void;
  cancelling: boolean;
  isDerma?: boolean;
  isDashboard?: boolean;
}) {
  const router = useRouter();

  const [isHydrated, setIsHydrated] = useState(false);
  const [appointments, setAppointments] = useState([] as Appointment[]);
  const [currentToken, setCurrentToken] = useState('');

  const { clinics, setCurrentUser, stateProducts } = useGlobalPersistedStore(
    state => state
  );

  const { setSelectedTreatments, setPreviousAppointment, setSelectedClinic } =
    useSessionStore(state => state);

  let showPast = false;
  let token = '';

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    token = params.get('token') ?? '';
    setCurrentToken(token);
    showPast = params.get('showPast') == 'true';

    const getAppointments = async () => {
      if (token) {
        const res = await ScheduleService.next(token);
        setAppointments(res);
        setIsHydrated(true);
      }
    };

    getAppointments();
  }, []);

  const rescheduleAppointment = async (x: Appointment) => {
    setCurrentUser({
      flowwwToken: currentToken,
      firstName: '',
      email: '',
      id: '',
      phone: '',
      clinicToken: currentToken,
    });
    const treatments = x.treatment?.split(',');
    const products: Product[] = [];
    for (const treatment of treatments!) {
      let product = stateProducts.filter(y => y.id == treatment)[0];
      if (!product) {
        product = await ProductService.getProduct(treatment, false, false);
      }
      products.push(product);
    }
    const selectedClinic = clinics.filter(y => y.flowwwId == x.clinicId)[0];
    setSelectedTreatments(products);
    setPreviousAppointment(x);
    setSelectedClinic(selectedClinic);
    isDashboard
      ? router.push('/dashboard/checkin/agenda')
      : router.push('/checkout/agenda');
  };

  if (!isHydrated) {
    return <FullScreenLoading isDerma={isDerma} />;
  }

  return (
    <Container className="mt-6">
      <Text
        className={`text-xl mb-4 ${
          isDerma ? 'font-gtUltraThin' : 'font-semibold'
        }`}
      >
        Reagendar cita
      </Text>
      <Flex layout="col-left" className="gap-4">
        {appointments.map(appointment => {
          if (!appointment.isPast || (appointment.isPast && showPast)) {
            const hideButtons = isDerma; //&& dayjs(appointment.startTime) < dayjs().add(3, 'day');

            return (
              <Flex
                layout="col-left"
                key={appointment.id}
                className={`${
                  isDerma ? 'bg-derma-secondary300' : 'bg-hg-secondary100'
                } gap-2 p-4 md:p-6 rounded-2xl w-full justify-between items-start`}
              >
                <Flex layout="row-left" className="gap-2 items-center mb-2">
                  <Text className="font-semibold">
                    {appointment.treatmentText}
                  </Text>
                  {!appointment.isPast || (
                    <span className="bg-orange-600 p-1 text-white rounded-md text-xs">
                      Cita no asistida
                    </span>
                  )}
                  {!appointment.isCancelled || (
                    <span className="bg-red-600 py-1 px-2 text-white rounded-md text-xs">
                      Cita cancelada
                    </span>
                  )}
                </Flex>
                <Flex layout="row-left" className="">
                  <SvgCalendar className="mr-2" />
                  <div className="text-xs">
                    {dayjs(appointment.startTime).format('DD')} de{' '}
                    {dayjs(appointment.startTime).format('MMMM')} a las {}
                    {dayjs(appointment.startTime).format('HH:mm')}
                  </div>
                </Flex>
                {!isDerma && (
                  <Flex layout="row-left">
                    <SvgLocation height={16} width={16} className="mr-2" />
                    {clinics.length > 0 && (
                      <div className="text-xs">
                        {
                          clinics.filter(
                            clinic => clinic.flowwwId == appointment.clinicId
                          )[0].address
                        }
                      </div>
                    )}
                  </Flex>
                )}

                {!hideButtons && (
                  <Flex layout="row-between" className="w-full mt-6">
                    <Button
                      size={isMobile() ? 'sm' : 'md'}
                      id="button-addon2"
                      type={isDerma ? 'derma' : 'tertiary'}
                      customStyles={!isDerma ? 'bg-hg-primary' : ''}
                      onClick={() => {
                        rescheduleAppointment(appointment);
                      }}
                    >
                      <div>Reagendar</div>
                    </Button>
                    {appointment.treatment?.toUpperCase() !=
                      process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID &&
                      appointment.treatment?.toUpperCase() !=
                        process.env.NEXT_PUBLIC_VISITA_EVALUACION_ID &&
                      !appointment.isPast &&
                      !appointment.isCancelled && (
                        <>
                          <Button
                            size={isMobile() ? 'sm' : 'md'}
                            type="tertiary"
                            id="button-addon2"
                            onClick={() => {
                              setAppointmentToCancel(appointment);
                              setShowCancelModal(true);
                            }}
                          >
                            {!cancelling && <div id="cancelText">Cancelar</div>}
                            {cancelling && (
                              <SvgSpinner height={24} width={24} />
                            )}
                          </Button>
                        </>
                      )}
                  </Flex>
                )}
              </Flex>
            );
          }
        })}

        {appointments.length == 0 && (
          <div>
            ¡Ups! Parece que no tienes ninguna cita reservada. Para más dudas{' '}
            <a href="tel:682417208">llámanos</a>.
          </div>
        )}
      </Flex>
    </Container>
  );
}
