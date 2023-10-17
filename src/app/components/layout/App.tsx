'use client';

import { ReactNode, useEffect } from 'react';
import { poppins } from 'app/fonts';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { ModalBackground } from 'designSystem/Modals/Modal';
import { isEmpty } from 'lodash';
import Head from 'next/head';
import { fetchClinics, fetchProducts } from 'utils/fetch';

import { Breakpoint, DeviceSize } from './Breakpoint';

export default function Html({ children }: { children: ReactNode }) {
  const {
    isModalOpen,
    showModalBackground,
    setShowModalBackground,
    setIsModalOpen,
    isMainScrollEnabled,
  } = useGlobalStore(state => state);

  const {
    setDeviceSize,
    stateProducts,
    setStateProducts,
    clinics,
    setClinics,
  } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    setDeviceSize(DeviceSize());
  }, []);

  useEffect(() => {
    async function initProducts() {
      const products = await fetchProducts();
      setStateProducts(products);
    }

    if (isEmpty(stateProducts)) {
      initProducts();
    }
  }, [stateProducts]);

  useEffect(() => {
    async function initClinics() {
      const clinics = await fetchClinics();
      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
  }, [clinics]);

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
      <body className={`${poppins.className} overflow-hidden min-h-screen`}>
        <ModalBackground
          isVisible={showModalBackground}
          onClick={() => {
            setShowModalBackground(false);
            setIsModalOpen(false);
          }}
        />
        <Breakpoint />
        {children}
      </body>
    </html>
  );
}
