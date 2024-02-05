import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Footer from 'app/(web)/components/layout/Footer';
import Header from 'app/(web)/components/layout/Header';
import dynamic from 'next/dynamic';

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
      <Analytics />
    </main>
  );
}
