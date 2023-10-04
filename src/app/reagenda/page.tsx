'use client';

import { useEffect, useState } from 'react';
import ScheduleService from '@services/ScheduleService';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { Appointment } from '@interface/appointment';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { Product } from '@interface/product';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const [appointments, setAppointments] = useState([] as Appointment[]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const { clinics, setCurrentUser, setSelectedTreatments, stateProducts } =
    useGlobalPersistedStore(state => state);
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
    var treatments = x.treatment?.split(',');
    var products: Product[] = [];
    treatments?.forEach(treatment => {
      products.push(
        stateProducts.filter(y => y.flowwwId == Number(treatment))[0]
      );
    });
    setSelectedTreatments(products);
    router.push('/checkout/agenda');
  };

  return (
    <>
      <Flex className="justify-center h-screen">
        {appointments.map(x => {
          if (!x.isPast || (x.isPast && showPast)) {
            return (
              <div className="col">
                <div className="row">
                  <div>
                    <span>{x.treatmentText}</span>
                    <div>
                      {!x.isPast || <span>Cita no asistida</span>}
                      {!x.isCancelled || <span>Cita cancelada</span>}
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <button
                      id="button-addon2"
                      onClick={() => {
                        rescheduleAppointment(x);
                      }}
                    >
                      <div>Reagendar</div>
                    </button>
                  </div>
                  {!x.isPast && !x.isCancelled && (
                    <div>
                      <button
                        id="button-addon2"
                        onClick={() => {
                          cancelAppointment(x);
                        }}
                      >
                        {!cancelling && <div id="cancelText">Cancelar</div>}
                      </button>
                      {cancelling && <SvgSpinner height={24} width={24} />}
                    </div>
                  )}
                </div>

                <div>
                  {dayjs(x.startTime).daysInMonth()} de {}
                  {dayjs(x.startTime).month()} a las {}
                  {dayjs(x.startTime).format('HH:mm')}
                  <p>
                    {clinics.length > 0 && (
                      <div>
                        {
                          clinics.filter(
                            clinic => clinic.flowwwId == x.clinicId
                          )[0].address
                        }
                      </div>
                    )}
                  </p>
                </div>
              </div>
            );
          }
        })}
        {loading && <SvgSpinner height={24} width={24} />}
        {appointments.length == 0 && !loading && (
          <div>
            ¡Ups! Parece que no tienes ninguna cita reservada. Para más dudas
            <a href="https://api.whatsapp.com/send?phone=930346565">llámanos</a>
            .
          </div>
        )}
      </Flex>
    </>
  );
}
