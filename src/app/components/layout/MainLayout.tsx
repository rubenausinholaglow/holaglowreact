'use client';

import { useEffect, useState } from 'react';
import CheckoutHeader from 'app/checkout/components/layout/CheckoutHeader';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';

import DashboardLayout from './DashboardLayout';
import { Footer } from './Footer';
import Header from './Header';

import es from 'date-fns/locale/es';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';
import { registerLocale } from 'react-datepicker';
dayjs.locale(spanishConf);
registerLocale('es', es);
export default function MainLayout({
  isDashboard = false,
  isCheckout = false,
  hideTopBar = false,
  hideBackButton = false,
  hideContactButtons = false,
  hideProfessionalSelector = false,
  hideFooter = false,
  children,
}: {
  isDashboard?: boolean;
  isCheckout?: boolean;
  hideBackButton?: boolean;
  hideTopBar?: boolean;
  hideContactButtons?: boolean;
  hideProfessionalSelector?: boolean;
  hideFooter?: boolean;
  children: React.ReactNode;
}) {
  const [isHydrated, setISHydrated] = useState(false);
  const { deviceSize } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    setISHydrated(true);
  }, []);

  const mainLayoutTopPadding = () => {
    return `${
      deviceSize.isMobile || deviceSize.isTablet
        ? HEADER_HEIGHT_MOBILE
        : HEADER_HEIGHT_DESKTOP
    }px`;
  };

  if (!isHydrated) {
    return <></>;
  }

  if (isDashboard) {
    return (
      <DashboardLayout
        hideTopBar={hideTopBar}
        hideBackButton={hideBackButton}
        hideContactButtons={hideContactButtons}
        hideProfessionalSelector={hideProfessionalSelector}
      >
        {children}
      </DashboardLayout>
    );
  }

  if (isCheckout) {
    return (
      <>
        <CheckoutHeader />
        {children}
      </>
    );
  }

  return (
    <main style={{ paddingTop: mainLayoutTopPadding() }}>
      <Header />
      {children}

      {!hideFooter && <Footer />}
    </main>
  );
}
