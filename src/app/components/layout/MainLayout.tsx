'use client';

import { useEffect, useState } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { usePathname } from 'next/navigation';

import { IsMobile } from './Breakpoint';
import { Footer } from './Footer';
import Header from './Header';

const HIDE_WEBHEADER_PATHS = ['/user/budget', '/user/passport', '/form'];
const HIDE_WEBHEADER_PATTERNS = ['/dashboard'];

const hideHeader = (path: string) => {
  return HIDE_WEBHEADER_PATHS.includes(path);
};

const isDashboard = (path: string) => {
  return HIDE_WEBHEADER_PATTERNS.some(item => path.startsWith(item));
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setISHydrated] = useState(false);
  const setIsMobile = useGlobalPersistedStore(state => state.setIsMobile);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobile(IsMobile());
    setISHydrated(true);
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  return (
    <>
      {hideHeader(pathname) || (!isDashboard(pathname) && <Header />)}
      {children}
      {!isDashboard(pathname) && <Footer />}
    </>
  );
}
