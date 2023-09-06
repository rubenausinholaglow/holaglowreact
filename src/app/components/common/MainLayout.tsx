'use client';

import { useEffect, useState } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { usePathname } from 'next/navigation';

import { IsMobile } from './Breakpoint';
import Header from './Header';

const HIDE_WEBHEADER_PATHS = ['/user/budget', '/user/passport', '/form'];
const HIDE_WEBHEADER_PATTERNS = ['/dashboard', '/appointment'];

const showWebHeader = (path: string) => {
  if (HIDE_WEBHEADER_PATHS.includes(path)) {
    return false;
  }

  return !HIDE_WEBHEADER_PATTERNS.some(item => path.startsWith(item));
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
      {showWebHeader(pathname) && <Header />}
      {children}
    </>
  );
}
