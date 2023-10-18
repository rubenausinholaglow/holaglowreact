'use client';

import { useEffect, useState } from 'react';
import { Appointment } from '@interface/appointment';
import { Product } from '@interface/product';
import ScheduleService from '@services/ScheduleService';
import MainLayout from 'app/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import dayjs from 'dayjs';
import es from 'dayjs/locale/es';
import { Button } from 'designSystem/Buttons/Buttons';
import { ButtonDefault } from 'designSystem/Buttons/Buttons.stories';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal } from 'designSystem/Modals/Modal';
import { Text, Title } from 'designSystem/Texts/Texts';
import {
  SvgCalendar,
  SvgLocation,
  SvgMapMarker,
  SvgSpinner,
} from 'icons/Icons';
import { SvgCross } from 'icons/IconsDs';
import { useRouter } from 'next/navigation';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  dayjs.locale(es);

  const { deviceSize } = useGlobalPersistedStore(state => state);
  const router = useRouter();
  const [appointments, setAppointments] = useState([] as Appointment[]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] =
    useState<Appointment | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const { isModalOpen } = useGlobalStore(state => state);
  const {
    clinics,
    setCurrentUser,
    setSelectedTreatments,
    stateProducts,
    setPreviousAppointment,
  } = useGlobalPersistedStore(state => state);

  let showPast = false;
  let token = '';

  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    token = params.get('token') ?? '';
    showPast = params.get('showPast') == 'true';

    const getAppointments = async () => {
      if (token) {
        const res = await ScheduleService.next(token);
        setAppointments(res);
        setLoading(false);
      }
    };

    getAppointments();
  }, []);

  const cancelAppointment = (x: Appointment) => {
    setCancelling(true);
  };

  const rescheduleAppointment = (x: Appointment) => {
    setCurrentUser({
      flowwwToken: token,
      firstName: '',
      email: '',
      id: '',
      phone: '',
    });
    const treatments = x.treatment?.split(',');
    const products: Product[] = [];
    treatments?.forEach(treatment => {
      products.push(
        stateProducts.filter(y => y.flowwwId == Number(treatment))[0]
      );
    });
    setSelectedTreatments(products);
    setPreviousAppointment(x);
    router.push('/checkout/agenda');
  };

  useEffect(() => {
    if (!isModalOpen) {
      setShowCancelModal(false);
    }
  }, [isModalOpen]);

  return (
    <MainLayout isCheckout>
      <Modal
        type="center"
        height="h-auto"
        width="w-full"
        className="max-w-sm mx-auto"
        isVisible={showCancelModal}
      >
        <Flex layout="col-center" className="p-4">
          <SvgCross className="self-end mb-12" />
          <Title className="mb-6">
            ¿Estás segurx que quieres cancelar la cita?
          </Title>

          <Flex
            layout="col-center"
            className="bg-hg-black100 w-full rounded-xl p-4 gap-4 mb-12"
          >
            <SvgCalendar height={32} width={32} className="text-hg-secondary" />
            <Text className="font-semibold">
              {appointmentToCancel?.treatmentText}
            </Text>
            <Text className="text-sm text-center">
              {dayjs(appointmentToCancel?.startTime).daysInMonth()} de{' '}
              {dayjs(appointmentToCancel?.startTime).format('MMMM')} a las {}
              {dayjs(appointmentToCancel?.startTime).format('HH:mm')}
            </Text>
          </Flex>
          <Flex layout="row-between" className="w-full">
            <Button
              className="cursor-pointer"
              type="tertiary"
              customStyles="bg-hg-primary"
              onClick={() => {
                if (appointmentToCancel) {
                  cancelAppointment(appointmentToCancel);
                }
              }}
            >
              Si, cancelar cita
            </Button>
            <Button type="tertiary">Volver</Button>
          </Flex>
        </Flex>
      </Modal>

      <Container className="mt-6">
        <Title className="mb-4">Reagendar cita</Title>
        <Flex layout="col-left" className="gap-4">
          {appointments.map(appointment => {
            if (!appointment.isPast || (appointment.isPast && showPast)) {
              return (
                <Flex
                  layout="col-left"
                  key={appointment.id}
                  className="bg-hg-secondary100 gap-2 p-4 md:p-6 rounded-2xl w-full justify-between items-start"
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
                      {dayjs(appointment.startTime).daysInMonth()} de{' '}
                      {dayjs(appointment.startTime).format('MMMM')} a las {}
                      {dayjs(appointment.startTime).format('HH:mm')}
                    </div>
                  </Flex>
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
                  <Flex layout="row-between" className="w-full mt-6">
                    <Button
                      size={deviceSize.isMobile ? 'sm' : 'md'}
                      type="tertiary"
                      id="button-addon2"
                      customStyles="bg-hg-primary"
                      onClick={() => {
                        rescheduleAppointment(appointment);
                      }}
                    >
                      <div>Reagendar</div>
                    </Button>

                    {!appointment.isPast && !appointment.isCancelled && (
                      <>
                        <Button
                          size={deviceSize.isMobile ? 'sm' : 'md'}
                          type="tertiary"
                          id="button-addon2"
                          onClick={() => {
                            setAppointmentToCancel(appointment);
                            setShowCancelModal(true);
                          }}
                        >
                          {!cancelling && <div id="cancelText">Cancelar</div>}
                        </Button>
                        {cancelling && <SvgSpinner height={24} width={24} />}
                      </>
                    )}
                  </Flex>
                </Flex>
              );
            }
          })}

          {loading && <SvgSpinner height={24} width={24} />}
          {appointments.length == 0 && !loading && (
            <div>
              ¡Ups! Parece que no tienes ninguna cita reservada. Para más dudas
              <a href="https://api.whatsapp.com/send?phone=930346565">
                llámanos
              </a>
              .
            </div>
          )}
        </Flex>
      </Container>
    </MainLayout>
  );
}
