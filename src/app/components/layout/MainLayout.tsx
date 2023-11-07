'use client';

import React, { useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import BugsnagPerformance from '@bugsnag/browser-performance';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import { Analytics } from '@vercel/analytics/react';
import CheckoutHeader from 'app/checkout/components/layout/CheckoutHeader';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import es from 'date-fns/locale/es';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';

import DashboardLayout from './DashboardLayout';
import { Footer } from './Footer';
import Header from './Header';

dayjs.locale(spanishConf);
registerLocale('es', es);
export default function MainLayout({
  isDashboard = false,
  isCheckout = false,
  hideTopBar = false,
  hideHeader = false,
  hideBackButton = false,
  hideContactButtons = false,
  hideProfessionalSelector = false,
  hideFooter = false,
  children,
}: {
  isDashboard?: boolean;
  isCheckout?: boolean;
  hideHeader?: boolean;
  hideBackButton?: boolean;
  hideTopBar?: boolean;
  hideContactButtons?: boolean;
  hideProfessionalSelector?: boolean;
  hideFooter?: boolean;
  children: React.ReactNode;
}) {
  const [isHydrated, setISHydrated] = useState(false);
  const { deviceSize } = useGlobalPersistedStore(state => state);
  const { setIsModalOpen, setIsMainScrollEnabled } = useGlobalStore(
    state => state
  );

  useEffect(() => {
    setIsModalOpen(false);
    setIsMainScrollEnabled(true);
    setISHydrated(true);
    Bugsnag.start({
      apiKey: 'bd4b9a1e96dd2a5c39cbf8d487763afc',
      plugins: [new BugsnagPluginReact()],
    });
  }, []);

  const mainLayoutTopPadding = () => {
    if (hideHeader) {
      return '0px';
    }

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
        <Analytics />
      </>
    );
  }

  return (
    <main style={{ paddingTop: mainLayoutTopPadding() }}>
      {!hideHeader && <Header />}

      {children}

      {!hideFooter && <Footer />}

      <Analytics />
    </main>
  );
}
