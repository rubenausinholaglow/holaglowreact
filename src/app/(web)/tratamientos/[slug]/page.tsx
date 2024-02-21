'use client';
import AppWrapper from 'app/(web)/components/layout/AppWrapper';
import MainLayout from 'app/(web)/components/layout/MainLayout';

import ProductDetail from './components/ProductDetail';

export default function ProductPage({
  params,
}: {
  params: { slug: string; isDashboard: boolean };
}) {
  return (
    <AppWrapper>
      <MainLayout>
        <ProductDetail params={params}></ProductDetail>
      </MainLayout>
    </AppWrapper>
  );
}
