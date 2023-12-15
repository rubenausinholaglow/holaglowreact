'use client';

import { useEffect, useState } from 'react';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgSpinner } from 'app/icons/Icons';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import FinanceService from '@services/FinanceService';
import ScheduleService from '@services/ScheduleService';

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
    let tries = 0;
    async function checkPaymentStatus(id: string) {
      await FinanceService.checkPaymentStatus(id).then(async x => {
        tries++;
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
        } else if (tries < 3) {
          setTimeout(async () => {
            await checkPaymentStatus(id);
          }, 15000);
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
