'use client';

import { useEffect } from 'react';
import FinanceService from '@services/FinanceService';
import ScheduleService from '@services/ScheduleService';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgCheck, SvgEllipsis, SvgTimer } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import { useRouter } from 'next/navigation';

dayjs.locale(spanishConf);

export default function Wait() {
  const {
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
    selectedPacksTreatments,
    analyticsMetrics,
    payment,
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
            analyticsMetrics,
            id
          ).then(x => {
            router.push('/checkout/confirmation');
          });
        } else if (tries < 3) {
          setTimeout(async () => {
            await checkPaymentStatus(id);
          }, 15000);
        } else {
          router.push('/checkout/contactform?error=true');
        }
      });
    }

    if (payment) {
      checkPaymentStatus(payment!.id);
    } else {
      setTimeout(() => {
        router.push('https://www.holaglow.com');
      }, 5000);
    }
  }, []);

  const renderWeb = () => (
    <>
      <div className="rounded-full overflow-hidden">
        <SvgTimer
          className="text-hg-primary bg-hg-secondary p-4"
          width={88}
          height={88}
        />
      </div>
      <Flex className="text-hg-secondary text-xl font-semibold gap-1">
        {payment !== null && payment !== undefined
          ? 'Procesando pago'
          : 'Pago procesado'}

        <SvgEllipsis
          className="text-hg-secondary mt-2"
          height={28}
          width={28}
        />
      </Flex>
    </>
  );

  const renderDash = () => (
    <>
      <div className="rounded-full overflow-hidden">
        <SvgCheck
          className="text-hg-primary bg-hg-secondary p-4"
          width={88}
          height={88}
        />
      </div>
      <Flex className="text-hg-secondary text-xl font-semibold gap-1">
        Pago procesado correctamente
      </Flex>
    </>
  );

  return (
    <MainLayout
      isCheckout={!false}
      hideHeader={false}
      hideFooter={false}
      hideBackButton
    >
      <Flex
        layout="col-center"
        className="absolute flex inset-0 justify-center items-center gap-4"
      >
        {payment !== null && payment !== undefined ? renderWeb() : renderDash()}
      </Flex>
    </MainLayout>
  );
}
