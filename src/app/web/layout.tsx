'use client';

import { ReactNode, useEffect, useState } from 'react';
import Header from 'app/components/Header';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/web/stores/globalStore';
import { ModalBackground } from 'designSystem/Modals/Modal';
import IsMobile from 'utils/IsMobile';

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
