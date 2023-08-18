'use client';

import { useEffect, useState } from 'react';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { usePathname } from 'next/navigation';

import { IsMobile } from './Breakpoint';
import Header from './Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHydrated, setISHydrated] = useState(false);
  const setIsMobile = useGlobalPersistedStore(state => state.setIsMobile);
  const pathname = usePathname();

  const HIDE_WEBHEADER_PATHS = [
    '/dashboard',
    '/user/budget',
    '/user/passport',
    '/form',
  ];

  useEffect(() => {
    setIsMobile(IsMobile());
    setISHydrated(true);
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  return (
    <>
      {!HIDE_WEBHEADER_PATHS.includes(pathname) && <Header />}
      {children}
    </>
  );
}
