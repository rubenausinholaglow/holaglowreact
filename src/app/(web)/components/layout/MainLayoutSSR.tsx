import { ReactNode } from 'react';
import FloatingBottomBar from 'app/(web)/components/home/FloatingBottomBar';
import AppSSR from 'app/(web)/components/layout/AppSSR';
import Header from 'app/(web)/components/layout/Header';

import FooterSSR from './FooterSSR';

export default function MainLayoutSSR({
  hideHeader = false,
  hideAppointmentButton = false,
  hideFooter = false,
  children,
}: {
  hideHeader?: boolean;
  hideAppointmentButton?: boolean;
  hideFooter?: boolean;
  children: ReactNode;
}) {
  return (
    <AppSSR>
      <main>
        {!hideHeader && (
          <Header hideAppointmentButton={hideAppointmentButton} />
        )}
        {children}

        <FloatingBottomBar />
        {!hideFooter && <FooterSSR />}
      </main>
    </AppSSR>
  );
}
