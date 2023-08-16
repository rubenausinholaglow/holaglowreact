'use client';

import { ReactNode, useEffect, useState } from 'react';
import { IsMobile } from 'app/components/common/Breakpoint';
import Header from 'app/components/common/Header';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/web/stores/globalStore';
import { ModalBackground } from 'designSystem/Modals/Modal';

export default function Layout({ children }: { children: ReactNode }) {
  const [isHydrated, setISHydrated] = useState(false);
  const isModalOpen = useGlobalStore(state => state.isModalOpen);
  const setIsModalOpen = useGlobalStore(state => state.setIsModalOpen);
  const setIsMobile = useGlobalPersistedStore(state => state.setIsMobile);

  useEffect(() => {
    setIsMobile(IsMobile());
    setISHydrated(true);
  }, []);

  if (!isHydrated) {
    return <></>;
  }

  return (
    <>
      <ModalBackground
        isVisible={isModalOpen}
        onClick={() => {
          setIsModalOpen(false);
        }}
      />
      <Header />
      {children}
    </>
  );
}
