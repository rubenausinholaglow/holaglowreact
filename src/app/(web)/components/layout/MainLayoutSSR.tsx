import { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';

import { Footer } from './Footer';
import Header from './Header';

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
