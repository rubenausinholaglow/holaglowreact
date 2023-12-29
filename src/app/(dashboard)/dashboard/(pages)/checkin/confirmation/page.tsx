'use client';

import { useEffect } from 'react';
import Confirmation from 'app/(web)/checkout/confirmation/components/Confirmation';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgArrowSmallLeft } from 'app/icons/Icons';
import useRoutes from 'app/utils/useRoutes';
import { Button } from 'designSystem/Buttons/Buttons';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ConfirmationCheckIn() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ROUTES = useRoutes();

  const isCheckin = searchParams.get('isCheckin') === 'true';

  useEffect(() => {
    if (isCheckin) {
      console.log('redirect');

      const timerId = setTimeout(() => {
        router.push(ROUTES.dashboard.checkIn.root);
      }, 10000);

      return () => clearTimeout(timerId);
    }
  }, []);

  return (
    <MainLayout
      isDashboard
      hideBackButton
      hideContactButtons
      hideProfessionalSelector
      hideBottomBar
    >
      <Confirmation isDashboard={true} />

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
    </MainLayout>
  );
}
