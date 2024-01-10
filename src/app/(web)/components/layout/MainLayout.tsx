'use client';

import { useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import { Analytics } from '@vercel/analytics/react';
import CheckoutHeader from 'app/(web)/checkout/components/CheckoutHeader';
import { useGlobalStore } from 'app/stores/globalStore';
import es from 'date-fns/locale/es';
import dayjs from 'dayjs';
import spanishConf from 'dayjs/locale/es';

import DashboardLayout from './DashboardLayout';
import { Footer } from './Footer';
import Header from './Header';
import React from 'react';
import Bugsnag from '@bugsnag/js';

dayjs.locale(spanishConf);
registerLocale('es', es);

Bugsnag.start({
  apiKey: 'ddc16c7fe2c290310470f8ce76dfa563',
  appVersion: '1.0.1',
});
class ErrorBoundary extends React.Component<any, any> {
  constructor(props: {} | Readonly<any>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    Bugsnag.notify(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default function MainLayout({
  isDashboard = false,
  isCheckout = false,
  hideBottomBar = false,
  hideHeader = false,
  hideBackButton = false,
  hideContactButtons = false,
  hasAnimatedBackground = false,
  showCart = false,
  hideProfessionalSelector = false,
  hideFooter = false,
  children,
}: {
  isDashboard?: boolean;
  isCheckout?: boolean;
  hideHeader?: boolean;
  hideBackButton?: boolean;
  hideBottomBar?: boolean;
  hideContactButtons?: boolean;
  hasAnimatedBackground?: boolean;
  showCart?: boolean;
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
      <ErrorBoundary>
        <DashboardLayout
          hideBottomBar={hideBottomBar}
          isCheckout={isCheckout}
          hideBackButton={hideBackButton}
          hideContactButtons={hideContactButtons}
          hideProfessionalSelector={hideProfessionalSelector}
          hasAnimatedBackground={hasAnimatedBackground}
          showCart={showCart}
        >
          {children}
        </DashboardLayout>
      </ErrorBoundary>
    );
  }

  if (isCheckout) {
    return (
      <ErrorBoundary>
        <>
          <CheckoutHeader
            loadCookies={hideHeader && hideFooter}
            hideHeader={hideHeader}
            hideBackButton={hideBackButton}
          />
          {children}
          <Analytics />
        </>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <>
        <main>
          {!hideHeader && <Header />}
          {children}
          {!hideFooter && <Footer />}
          <Analytics />
        </main>
      </>
    </ErrorBoundary>
  );
}
