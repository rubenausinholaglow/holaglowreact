'use client';

import { useEffect } from 'react';
import Confirmation from 'app/(web)/checkout/confirmation/components/Confirmation';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import useRoutes from 'app/utils/useRoutes';
import { useRouter } from 'next/navigation';

export default function ConfirmationCheckIn() {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { remoteControl } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    const timerId = setTimeout(() => {
      router.push(
        remoteControl ? ROUTES.dashboard.home : ROUTES.dashboard.checkIn.root
      );
    }, 10000);

    return () => clearTimeout(timerId);
  }, [router, ROUTES.dashboard.checkIn.root]);

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
