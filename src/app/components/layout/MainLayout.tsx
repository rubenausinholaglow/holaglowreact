'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import CheckoutHeader from 'app/checkout/components/layout/CheckoutHeader';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
} from 'app/utils/constants';
import { isEmpty } from 'lodash';
import { fetchClinics, fetchProducts } from 'utils/fetch';

import { DeviceSize } from './Breakpoint';
import DashboardLayout from './DashboardLayout';
import { Footer } from './Footer';
import Header from './Header';

export default function MainLayout({
  isDashboard = false,
  isCheckout = false,
  hideTopBar = false,
  hideBackButton = false,
  hideContactButtons = false,
  hideProfessionalSelector = false,
  children,
}: {
  isDashboard?: boolean;
  isCheckout?: boolean;
  hideBackButton?: boolean;
  hideTopBar?: boolean;
  hideContactButtons?: boolean;
  hideProfessionalSelector?: boolean;
  children: React.ReactNode;
}) {
  const [isHydrated, setISHydrated] = useState(false);
  const {
    deviceSize,
    setDeviceSize,
    stateProducts,
    setStateProducts,
    clinics,
    setClinics,
  } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    setISHydrated(true);
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

  if (!isHydrated) {
    return <></>;
  }

  const mainLayoutTopPadding = () => {
    return `${
      deviceSize.isMobile || deviceSize.isTablet
        ? HEADER_HEIGHT_MOBILE
        : HEADER_HEIGHT_DESKTOP
    }px`;
  };

  if (isDashboard) {
    return (
      <DashboardLayout
        hideTopBar={hideTopBar}
        hideBackButton={hideBackButton}
        hideContactButtons={hideContactButtons}
        hideProfessionalSelector={hideProfessionalSelector}
      >
        {children}
      </DashboardLayout>
    );
  }

  if (isCheckout) {
    return (
      <>
        <CheckoutHeader />
        {children}
      </>
    );
  }

  return (
    <main style={{ paddingTop: mainLayoutTopPadding() }}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
