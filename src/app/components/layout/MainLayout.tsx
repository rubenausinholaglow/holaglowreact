'use client';

import { useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import { Analytics } from '@vercel/analytics/react';
import CheckoutHeader from 'app/(web)/checkout/components/layout/CheckoutHeader';
import { useGlobalStore } from 'app/stores/globalStore';
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
  const [isHydrated, setIsHydrated] = useState(false);
  const { setIsModalOpen, setIsMainScrollEnabled } = useGlobalStore(
    state => state
  );

  useEffect(() => {
    setIsModalOpen(false);
    setIsMainScrollEnabled(true);
    setIsHydrated(true);
  }, []);

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
        <CheckoutHeader loadCookies={hideHeader && hideFooter} />
        {children}
        <Analytics />
      </>
    );
  }

  return (
    <>
      <main>
        {!hideHeader && <Header />}
        {children}
        {!hideFooter && <Footer />}
        <Analytics />
      </main>
    </>
  );
}
