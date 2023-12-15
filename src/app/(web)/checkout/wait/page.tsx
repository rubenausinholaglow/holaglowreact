'use client';

import { useEffect, useState } from 'react';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgSpinner } from 'app/icons/Icons';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import FinanceService from '@services/FinanceService';
import ScheduleService from '@services/ScheduleService';
import { useRouter } from 'next/router';

dayjs.locale(spanishConf);

export default function Wait() {
  const {
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
    selectedPacksTreatments,
    analyticsMetrics,
  } = useSessionStore(state => state);
  const { user } = useGlobalPersistedStore(state => state);

  const router = useRouter();

  useEffect(() => {
    async function checkPaymentStatus(id: string) {
      await FinanceService.checkPaymentStatus(id).then(async x => {
        if (x) {
          await ScheduleService.createAppointment(
            selectedTreatments,
            selectedSlot!,
            selectedDay,
            selectedClinic!,
            user!,
            selectedPacksTreatments!,
            analyticsMetrics
          ).then(x => {
            router.push('/checkout/confirmation');
          });
        }
      });
    }

    checkPaymentStatus(''); //TODO: Id del pago
  }, []);

  return (
    <MainLayout isCheckout={!false} hideHeader={false} hideFooter={false}>
      <SvgSpinner className="w-full justify-center" />
    </MainLayout>
  );
}
