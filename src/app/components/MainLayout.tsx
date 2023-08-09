'use client';

import { useEffect, useState } from 'react';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { ModalBackground } from 'components/Modals/Modal';

import { IsMobile } from './Breakpoint';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {children}
    </>
  );
}
