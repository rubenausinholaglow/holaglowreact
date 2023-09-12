'use client';

import { useEffect, useState } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';

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
  const deviceSize = useGlobalPersistedStore(state => state.deviceSize);

  useEffect(() => {
    setDeviceSize(DeviceSize());
    setISHydrated(true);
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  const mainLayoutTopPadding = () => {
    return `${
      deviceSize.isMobile || deviceSize.isTablet
        ? HEADER_HEIGHT_MOBILE
        : HEADER_HEIGHT_DESKTOP
    }px`;
  };

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
        <main style={{ paddingTop: mainLayoutTopPadding() }}>
          <Header />
          {children}
          <Footer />
        </main>
      )}
    </>
  );
}
