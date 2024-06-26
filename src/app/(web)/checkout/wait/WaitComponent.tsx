'use client';

import { useEffect } from 'react';
import FinanceService from '@services/FinanceService';
import ScheduleService from '@services/ScheduleService';
import CheckHydration from '@utils/CheckHydration';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { SvgCheck, SvgEllipsis, SvgTimer } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { useRouter } from 'next/navigation';

dayjs.locale(spanishConf);

export default function WaitComponent({ isDerma }: { isDerma: boolean }) {
  const {
    selectedTreatments,
    selectedSlot,
    selectedDay,
    selectedClinic,
    selectedPacksTreatments,
    selectedPack,
    analyticsMetrics,
    payment,
    setAppointmentUrl,
  } = useSessionStore(state => state);

  const router = useRouter();
  const { cart } = useCartStore(state => state);

  const { user } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    let tries = 0;
    async function checkPaymentStatus(id: string) {
      await FinanceService.checkPaymentStatus(id, isDerma).then(async x => {
        tries++;
        if (x) {
          router.push('/checkout/confirmation');
        } else if (tries < 40) {
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

  const renderWeb = (isDerma: boolean) => (
    <>
      <meta name="robots" content="noindex,follow" />
      <div className="rounded-full overflow-hidden">
        <SvgTimer
          className={`${
            isDerma
              ? 'text-derma-primary bg-derma-primary300'
              : 'text-hg-primary bg-hg-secondary'
          } p-4`}
          width={88}
          height={88}
        />
      </div>
      <Flex
        className={`${
          isDerma ? 'text-derma-primary' : 'text-hg-secondary'
        } text-xl font-semibold gap-1`}
      >
        {payment !== null && payment !== undefined
          ? 'Procesando pago'
          : 'Pago procesado'}

        <SvgEllipsis
          className={`${
            isDerma ? 'text-derma-primary' : 'text-hg-secondary'
          } mt-2`}
          height={28}
          width={28}
        />
      </Flex>
    </>
  );

  const renderDash = (isDerma: boolean) => (
    <>
      <div className="rounded-full overflow-hidden">
        <SvgCheck
          className={`${
            isDerma
              ? 'text-derma-primary300 bg-derma-primary'
              : 'text-hg-primary bg-hg-secondary'
          } p-4`}
          width={88}
          height={88}
        />
      </div>
      <Flex
        className={`${
          isDerma ? 'text-derma-primary' : 'text-hg-secondary'
        } text-xl font-semibold gap-1`}
      >
        Pago procesado correctamente
      </Flex>
    </>
  );

  if (isDerma) {
    return (
      <CheckHydration>
        <div className="bg-derma-secondary300 min-h-screen">
          <Container>
            <Flex
              layout="col-center"
              className="absolute flex inset-0 justify-center items-center gap-4"
            >
              {payment !== null && payment !== undefined
                ? renderWeb(isDerma)
                : renderDash(isDerma)}
            </Flex>
          </Container>
        </div>
      </CheckHydration>
    );
  }

  return (
    <Container>
      <Flex
        layout="col-center"
        className="absolute flex inset-0 justify-center items-center gap-4"
      >
        {payment !== null && payment !== undefined
          ? renderWeb(isDerma)
          : renderDash(isDerma)}
      </Flex>
    </Container>
  );
}
