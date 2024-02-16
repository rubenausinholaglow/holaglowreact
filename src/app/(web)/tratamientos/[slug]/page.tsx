'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import CheckHydration from '@utils/CheckHydration';
import { setSeoMetaData } from '@utils/common';
import { fetchProduct } from '@utils/fetch';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import isEmpty from 'lodash/isEmpty';
import { redirect } from 'next/navigation';

import ProductDetail from './components/ProductDetail';

export default function ProductPage({
  params,
}: {
  params: { slug: string; isDashboard: boolean };
}) {
  const { slug } = params;

  const { stateProducts } = useGlobalPersistedStore(state => state);

  const [product, setProduct] = useState<Product | null>(null);
  const [productsAreLoaded, setProductsAreLoaded] = useState(false);
  const [productId, setProductId] = useState('0');

  useEffect(() => {
    if (!isEmpty(stateProducts)) {
      setProductsAreLoaded(true);
    }
  }, [stateProducts]);

  useEffect(() => {
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId);

      setProduct(productDetails);

      console.log(productDetails.upgrades);

      setSeoMetaData(
        productDetails.extraInformation.seoTitle,
        productDetails.extraInformation.seoMetaDescription
      );
    }

    let product = undefined;
    product = stateProducts.filter(
      product => product?.extraInformation?.slug === slug
    )[0];

    const productId = product?.id ?? '';
    setProductId(productId);

    if (productId !== '' && productsAreLoaded) {
      initProduct(productId);
      setProduct(isEmpty(product) ? null : product);
    }
  }, [productsAreLoaded, slug]);

  console.log(product?.upgrades);

  if (!productId) {
    redirect('/tratamientos');
  }

  return (
    <MainLayout>
      <CheckHydration>
        <ProductDetail params={params} productData={product} />
      </CheckHydration>
    </MainLayout>
  );
}
