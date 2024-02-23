import { ReactNode } from 'react';
import AppSSR from 'app/(web)/components/layout/AppSSR';
import Header from 'app/(web)/components/layout/Header';

import Footer from './FooterSSR';

export default function MainLayoutSSR({
  hideHeader = false,
  hideFooter = false,
  children,
}: {
  hideHeader?: boolean;
  hideFooter?: boolean;
  children: ReactNode;
}) {
  return (
    <AppSSR>
      <main>
        {!hideHeader && <Header />}
        {children}
        {!hideFooter && <Footer />}
      </main>
    </AppSSR>
  );
}
