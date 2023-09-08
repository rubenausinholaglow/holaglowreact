'use client';

import { useEffect, useState } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';

import { DeviceSize } from './Breakpoint';
import DashboardLayout from './DashboardLayout';
import { Footer } from './Footer';
import Header from './Header';

export default function MainLayout({
  isDashboard = false,
  hideTopBar = false,
  hideBackButton = false,
  hideContactButtons = false,
  hideProfessionalSelector = false,
  children,
}: {
  isDashboard?: boolean;
  hideBackButton?: boolean;
  hideTopBar?: boolean;
  hideContactButtons?: boolean;
  hideProfessionalSelector?: boolean;
  children: React.ReactNode;
}) {
  const [isHydrated, setISHydrated] = useState(false);
  const setDeviceSize = useGlobalPersistedStore(state => state.setDeviceSize);

  useEffect(() => {
    setDeviceSize(DeviceSize());
    setISHydrated(true);
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  return (
    <>
      {isDashboard ? (
        <DashboardLayout
          hideTopBar={hideTopBar}
          hideBackButton={hideBackButton}
          hideContactButtons={hideContactButtons}
          hideProfessionalSelector={hideProfessionalSelector}
        >
          {children}
        </DashboardLayout>
      ) : (
        <>
          <Header />
          {children}
          <Footer />
        </>
      )}
    </>
  );
}
