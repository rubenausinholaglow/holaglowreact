'use client';

import { useEffect, useState } from 'react';
import { validTypesFilterCart } from '@utils/utils';
import Confirmation from 'app/(web)/checkout/confirmation/components/Confirmation';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgArrowSmallLeft } from 'app/icons/Icons';
import { SvgArrow } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { Flex } from 'designSystem/Layouts/Layouts';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCartStore } from '../../budgets/stores/userCartStore';

export default function ConfirmationCheckIn() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ROUTES = useRoutes();
  const { cart } = useCartStore(state => state);
  const { treatmentPacks } = useSessionStore(state => state);

  const isCheckin = searchParams.get('isCheckin') === 'true';
  const [isPendingProductsScheduler, setIsPendingProductsScheduler] =
    useState<boolean>(false);

  useEffect(() => {
    if (isCheckin) {
      const timerId = setTimeout(() => {
        router.push(ROUTES.dashboard.checkIn.root);
      }, 10000);

      return () => clearTimeout(timerId);
    }
    treatmentPacks.length > 0
      ? setIsPendingProductsScheduler(
          treatmentPacks.some(x => x.isScheduled == false)
        )
      : setIsPendingProductsScheduler(
          cart.some(
            x =>
              x.isScheduled === false && validTypesFilterCart.includes(x.type)
          )
        );
  }, []);

  return (
    <App>
      <MainLayout
        isDashboard
        hideBackButton
        hideContactButtons
        hideProfessionalSelector
        hideBottomBar
      >
        <Confirmation isDashboard={true} />
        <Flex className="gap-3">
          {!isCheckin && (
            <Button
              type="tertiary"
              customStyles="bg-hg-primary"
              className="mb-8"
              href={ROUTES.dashboard.menu}
            >
              <SvgArrowSmallLeft />
              Volver
            </Button>
          )}
          {isPendingProductsScheduler && (
            <Button
              type="tertiary"
              customStyles="bg-hg-primary"
              className="mb-8"
              href={ROUTES.dashboard.schedule}
            >
              Crear otra cita
              <SvgArrow height={18} width={18} className="ml-2" />
            </Button>
          )}
        </Flex>
      </MainLayout>
    </App>
  );
}
