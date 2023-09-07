'use client';

import { ReactNode } from 'react';
import { poppins } from 'app/fonts';
import { useGlobalStore } from 'app/stores/globalStore';
import { ModalBackground } from 'designSystem/Modals/Modal';
import Head from 'next/head';

import { Breakpoint } from './Breakpoint';

export default function Html({ children }: { children: ReactNode }) {
  const { isModalOpen, setIsModalOpen, isMainScrollEnabled } = useGlobalStore(
    state => state
  );

  return (
    <html
      lang="en"
      className={`max-h-screen h-full bg-white text-hg-black ${
        isModalOpen || !isMainScrollEnabled
          ? 'overflow-hidden'
          : 'overflow-auto'
      } `}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <body className={`${poppins.className} overflow-hidden`}>
        <ModalBackground
          isVisible={isModalOpen}
          onClick={() => {
            setIsModalOpen(false);
          }}
        />
        <Breakpoint />
        {children}
      </body>
    </html>
  );
}
