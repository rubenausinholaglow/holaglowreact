'use client';

import { useEffect } from 'react';
import Confirmation from 'app/checkout/confirmation/components/Confirmation';
import MainLayout from 'app/components/layout/MainLayout';
import useRoutes from 'app/utils/useRoutes';
import { useRouter } from 'next/navigation';

export default function ConfirmationCheckIn() {
  const router = useRouter();
  const routes = useRoutes();

  useEffect(() => {
    const timerId = setTimeout(() => {
      router.push(routes.dashboard.checkIn.root);
    }, 10000);

    return () => clearTimeout(timerId);
  }, [router, routes.dashboard.checkIn.root]);

  return (
    <MainLayout
      isDashboard
      hideBackButton
      hideContactButtons
      hideProfessionalSelector
      hideBottomBar
    >
      <Confirmation isDashboard={true} />
    </MainLayout>
  );
}
