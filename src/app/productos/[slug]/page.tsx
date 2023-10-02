'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import Clinics from 'app/components/common/Clinics';
import Professionals from 'app/components/common/Professionals';
import FloatingBottomBar from 'app/components/home/FloatingBottomBar';
import Testimonials from 'app/components/home/Testimonials';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { isEmpty } from 'lodash';
import { fetchProduct } from 'utils/fetch';

import PsrpPage from '../psrp';
import ProductCrosselling from './components/ProductCrosselling';
import ProductExplanation from './components/ProductExplanation';
import ProductFaqs from './components/ProductFaqs';
import ProductHeader from './components/ProductHeader';
import ProductInfo from './components/ProductInfo';
import ProductPaymentOptions from './components/ProductPaymentOptions';
import ProductPrices from './components/ProductPrices';
import ProductResults from './components/ProductResults';
import ProductSuggestions from './components/ProductSuggestions';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const [productsAreLoaded, setProductsAreLoaded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState('0');

  useEffect(() => {
    if (!isEmpty(stateProducts)) {
      setProductsAreLoaded(true);
    }
  }, [stateProducts]);

  useEffect(() => {
    const productId =
      stateProducts.filter(
        product => product?.extraInformation?.slug === params.slug
      )[0]?.id ?? '';
    setProductId(productId);
    async function initProduct(productId: string) {
      const product = await fetchProduct(productId);

      setProduct(isEmpty(product) ? null : product);
    }
    if (productId != '') {
      if (productsAreLoaded) {
        initProduct(productId);
      }
    }
  }, [productsAreLoaded]);

  if (!productsAreLoaded) {
    return <></>;
  }

  if (product != undefined && !isEmpty(product)) {
    return (
      <MainLayout>
        <div className="bg-hg-cream500 rounded-t-3xl pt-8">
          <ProductHeader product={product} />
          <ProductInfo product={product} />
        </div>
        <ProductResults product={product} />
        <ProductPrices product={product} />
        <ProductExplanation product={product} />
        <ProductPaymentOptions totalPrice={product.price} />
        <div className="bg-hg-black50 md:mt-16">
          <Testimonials />
        </div>
        <div className="bg-hg-secondary300 pt-12 pb-8 md:py-16">
          <ProductSuggestions product={product} />
        </div>
        <ProductFaqs product={product} />
        <div className="bg-hg-cream500 pt-12 pb-24 md:py-16 md:pb-24">
          <ProductCrosselling product={product} />
        </div>
        <Clinics />
        <div className="bg-hg-turquoise/5 pt-12 pb-24 md:py-16">
          <Professionals />
        </div>
      </MainLayout>
    );
  } else if (productId == '') {
    return <PsrpPage slug={params.slug} />;
  }
}
