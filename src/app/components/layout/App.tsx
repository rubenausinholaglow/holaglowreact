'use client';

import { ReactNode, useEffect } from 'react';
import { poppins } from 'app/fonts';
import {
  useGlobalPersistedStore,
  useGlobalStore,
} from 'app/stores/globalStore';
import { ModalBackground } from 'designSystem/Modals/Modal';
import { isEmpty } from 'lodash';
import { fetchClinics, fetchProducts } from 'utils/fetch';

import { Breakpoint, DeviceSize } from './Breakpoint';

export default function Html({ children }: { children: ReactNode }) {
  function getAnalyticsMetrics() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const deviceStr = params.get('device');
    const treatmentText = params.get('treatmentText');
    const loc_physical_ms = params.get('loc_physical_ms');
    const utm_adgroup = params.get('utm_adgroup');
    const utm_campaign = params.get('utm_campaign');
    const utm_medium = params.get('utm_medium');
    const utm_source = params.get('utm_source');
    const utm_term = params.get('utm_term');
    const utm_content = params.get('utm_content');
    if (deviceStr) {
      let device = 0;
      switch (deviceStr) {
        case 'm':
          device = 3;
          break;
        case 't':
          device = 2;
          break;
        case 'd':
          device = 1;
          break;
        default:
          device = 0;
          break;
      }
      analyticsMetrics.device = device;
    }
    if (loc_physical_ms) analyticsMetrics.locPhysicalMs = loc_physical_ms;
    if (utm_adgroup) analyticsMetrics.utmAdgroup = utm_adgroup;
    if (utm_campaign) analyticsMetrics.utmCampaign = utm_campaign;
    if (utm_medium) analyticsMetrics.utmMedium = utm_medium;
    if (utm_source) analyticsMetrics.utmSource = utm_source;
    if (utm_term) analyticsMetrics.utmTerm = utm_term;
    if (utm_content) analyticsMetrics.utmContent = utm_content;
    if (treatmentText) analyticsMetrics.treatmentText = treatmentText;
    setAnalyticsMetrics(analyticsMetrics);
  }

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
    analyticsMetrics,
    setAnalyticsMetrics,
  } = useGlobalPersistedStore(state => state);

  useEffect(() => {
    setDeviceSize(DeviceSize());
    getAnalyticsMetrics();
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
    <body
      className={`${poppins.className} min-h-screen ${
        isModalOpen || !isMainScrollEnabled
          ? 'overflow-hidden'
          : 'overflow-auto'
      }`}
    >
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
  );
}
