'use client';

import { useEffect, useState } from 'react';
import MainLayout from 'app/(web)/components/layout/MainLayout';

import ProductDetail from './components/ProductDetail';

export default function ProductPage({
  params,
}: {
  params: { slug: string; isDashboard: boolean };
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true), [];
  });

  if (!isHydrated) {
    return <></>;
  }

  return (
    <MainLayout>
      <ProductDetail params={params}></ProductDetail>
    </MainLayout>
  );
}
