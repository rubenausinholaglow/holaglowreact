'use client';

import { useEffect } from 'react';
import { fetchProduct } from '@utils/fetch';
import RegistrationForm from 'app/(web)/components/common/RegistrationForm';
import { useSessionStore } from 'app/stores/globalStore';

export default function LeadLandingRegistrationForm() {
  const {
    setSelectedTreatments,
    setSelectedSlot,
    setSelectedClinic,
    analyticsMetrics,
    setAnalyticsMetrics,
  } = useSessionStore(state => state);

  useEffect(() => {
    setSelectedSlot(undefined);
    setSelectedClinic(undefined);

    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId, false, false);
      setSelectedTreatments([productDetails]);
    }

    initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID!);
    analyticsMetrics.treatmentText = 'ProbadorVirtualPPC';
    analyticsMetrics.externalReference = 'Landing';
    analyticsMetrics.utmAdgroup = '';
    analyticsMetrics.utmCampaign = '';
    analyticsMetrics.utmContent = '';
    analyticsMetrics.utmMedium = '';
    analyticsMetrics.utmSource = '';
    analyticsMetrics.utmTerm = '';
    analyticsMetrics.locPhysicalMs = '';
    setAnalyticsMetrics(analyticsMetrics);
  }, []);

  return <RegistrationForm page="902" isDerma={false} lastStep={true} />;
}
