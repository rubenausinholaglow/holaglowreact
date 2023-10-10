'use client';

import { useEffect, useState } from 'react';
import { Appointment } from '@interface/appointment';
import { Product } from '@interface/product';
import ScheduleService from '@services/ScheduleService';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import dayjs from 'dayjs';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgSpinner } from 'icons/Icons';
import { useRouter } from 'next/navigation';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { deviceSize } = useGlobalPersistedStore(state => state);
  const router = useRouter();
  const [appointments, setAppointments] = useState([] as Appointment[]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
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

  return (
    <MainLayout isCheckout>
      <Container>
        <Flex layout="col-left" className="gap-4 mt-8">
          {appointments.map(appointment => {
            if (!appointment.isPast || (appointment.isPast && showPast)) {
              return (
                <Flex
                  key={appointment.id}
                  className="border border-hg-black300 p-4 md:p-6 rounded-2xl w-full justify-between items-start"
                >
                  <Flex layout="col-left">
                    <Flex layout="col-left" className="mb-8 gap-2 md:flex-row">
                      <Text className="font-semibold text-lg">
                        {appointment.treatmentText}
                      </Text>
                      {!appointment.isPast || (
                        <span className="bg-orange-600 p-1 text-white rounded-md text-sm">
                          Cita no asistida
                        </span>
                      )}
                      {!appointment.isCancelled || (
                        <span className="bg-red-600 py-1 px-2 text-white rounded-md text-sm">
                          Cita cancelada
                        </span>
                      )}
                    </Flex>
                    <Flex layout="col-left">
                      <Text className="font-semibold">
                        {dayjs(appointment.startTime).daysInMonth()} de {}
                        {dayjs(appointment.startTime).month()} a las {}
                        {dayjs(appointment.startTime).format('HH:mm')}
                      </Text>
                      <Text className="text-hg-black500">
                        {clinics.length > 0 && (
                          <div>
                            {
                              clinics.filter(
                                clinic =>
                                  clinic.flowwwId == appointment.clinicId
                              )[0].address
                            }
                          </div>
                        )}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex layout="col-right" className="gap-4 shrink-0 ml-4">
                    <Button
                      className="w-full"
                      size={`${deviceSize.isMobile ? 'md' : 'lg'}`}
                      type="secondary"
                      id="button-addon2"
                      onClick={() => {
                        rescheduleAppointment(appointment);
                      }}
                    >
                      <div>Reagendar</div>
                    </Button>

                    {!appointment.isPast && !appointment.isCancelled && (
                      <>
                        <Button
                          className="w-full"
                          size={`${deviceSize.isMobile ? 'md' : 'lg'}`}
                          type="tertiary"
                          id="button-addon2"
                          onClick={() => {
                            cancelAppointment(appointment);
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
