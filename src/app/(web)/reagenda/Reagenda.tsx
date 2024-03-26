'use client';

import { useEffect, useState } from 'react';
import ScheduleService from '@services/ScheduleService';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgHolaglowDerma } from 'app/icons/iconsDerma';
import { useGlobalStore } from 'app/stores/globalStore';
import { Appointment } from 'app/types/appointment';
import dayjs from 'dayjs';
import es from 'dayjs/locale/es';
import { Container } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

import App from '../components/layout/App';
import AppointmentList from './components/AppointmentList';
import CancelModal from './components/CancelModal';

export default function Reagenda({
  isDerma = false,
  isDashboard = false,
}: {
  isDerma?: boolean;
  isDashboard?: boolean;
}) {
  dayjs.locale(es);

  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] =
    useState<Appointment | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const [isHydrated, setIsHydrated] = useState(false);
  const { isModalOpen } = useGlobalStore(state => state);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const cancelAppointment = (x: Appointment) => {
    setCancelling(true);
    const months: Array<string> = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    ScheduleService.cancel(x).then(y => {
      const startTime = new Date(x.startTime!);
      const url =
        '/cita-cancelada?day=' +
        startTime.getDate() +
        '&month=' +
        months[startTime.getMonth()] +
        '&hour=' +
        startTime.getHours().toString().padStart(2, '0') +
        ':' +
        startTime.getMinutes().toString().padStart(2, '0');
      router.push(url);
    });
  };

  useEffect(() => {
    if (!isModalOpen) {
      setShowCancelModal(false);
    }
  }, [isModalOpen]);

  if (!isHydrated) {
    return <></>;
  }

  if (isDerma) {
    return (
      <div className="bg-derma-secondary100 min-h-screen">
        <meta name="robots" content="noindex,nofollow" />
        <header className="py-4 relative">
          <Container>
            <SvgHolaglowDerma className="w-[92px] h-[32px] md:w-[144px] md:h-[50px] mb-4" />
          </Container>
        </header>

        <CancelModal
          isDerma
          appointmentToCancel={appointmentToCancel}
          cancelAppointment={cancelAppointment}
          showCancelModal={showCancelModal}
        />

        <AppointmentList
          isDerma
          cancelling={cancelling}
          setAppointmentToCancel={setAppointmentToCancel}
          setShowCancelModal={setShowCancelModal}
        />
      </div>
    );
  }
  if (isDashboard) {
    return (
      <>
        <CancelModal
          appointmentToCancel={appointmentToCancel}
          cancelAppointment={cancelAppointment}
          showCancelModal={showCancelModal}
        />
        <AppointmentList
          isDashboard={true}
          cancelling={cancelling}
          setAppointmentToCancel={setAppointmentToCancel}
          setShowCancelModal={setShowCancelModal}
        />
      </>
    );
  }
  return (
    <App>
      <MainLayout isCheckout>
        <meta name="robots" content="noindex,nofollow" />
        <CancelModal
          appointmentToCancel={appointmentToCancel}
          cancelAppointment={cancelAppointment}
          showCancelModal={showCancelModal}
        />

        <AppointmentList
          cancelling={cancelling}
          setAppointmentToCancel={setAppointmentToCancel}
          setShowCancelModal={setShowCancelModal}
        />
      </MainLayout>
    </App>
  );
}
