import { ReactNode } from 'react';
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
    <main>
      {!hideHeader && <Header />}
      {children}
      {!hideFooter && <Footer />}
    </main>
  );
}
