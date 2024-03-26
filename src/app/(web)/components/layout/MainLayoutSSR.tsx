import { ReactNode } from 'react';
import AppSSR from 'app/(web)/components/layout/AppSSR';
import Header from 'app/(web)/components/layout/Header';

import Footer from './FooterSSR';

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
        {!hideFooter && <Footer />}
      </main>
    </AppSSR>
  );
}
