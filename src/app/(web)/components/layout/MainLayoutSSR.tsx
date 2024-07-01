import { ReactNode } from 'react';
import FloatingBottomBar from 'app/(web)/components/home/FloatingBottomBar';
import AppSSR from 'app/(web)/components/layout/AppSSR';
import Header from 'app/(web)/components/layout/Header';

import FooterSSR from './FooterSSR';

export default function MainLayoutSSR({
  hideHeader = false,
  hideAppointmentButton = false,
  hideFloatingBottomBar = false,
  hideFooter = false,
  className = '',
  children,
}: {
  hideHeader?: boolean;
  hideAppointmentButton?: boolean;
  hideFloatingBottomBar?: boolean;
  hideFooter?: boolean;
  className?: string;
  children: ReactNode;
}) {
  console.log(hideFloatingBottomBar);

  return (
    <AppSSR className={className}>
      <main>
        {!hideHeader && (
          <Header hideAppointmentButton={hideAppointmentButton} />
        )}
        {children}
        {!hideFloatingBottomBar && <FloatingBottomBar />}
        {!hideFooter && <FooterSSR />}
      </main>
    </AppSSR>
  );
}
