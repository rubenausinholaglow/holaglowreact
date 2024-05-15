'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Appointment } from '@interface/appointment';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import ScheduleService from '@services/ScheduleService';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
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
import AppointmentElement from './AppointmentElement';

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
  const [isHydrated, setIsHydrated] = useState(false);
  const [appointments, setAppointments] = useState([] as Appointment[]);
  const [currentToken, setCurrentToken] = useState('');

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
            const hideButtons = isDerma;

            return (
              <AppointmentElement
                appointment={appointment}
                isDashboard={isDashboard}
                setAppointmentToCancel={setAppointmentToCancel}
                setShowCancelModal={setShowCancelModal}
                cancelling={cancelling}
              ></AppointmentElement>
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
