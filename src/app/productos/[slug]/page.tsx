'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import Clinics from 'app/components/common/Clinics';
import Professionals from 'app/components/common/Professionals';
import Testimonials from 'app/components/home/Testimonials';
import MainLayout from 'app/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { isEmpty } from 'lodash';

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
  const [product, setProduct] = useState<Product | null>(null);
  const [slug, setSlug] = useState(params.slug);

  useEffect(() => {
    console.log(stateProducts);
  }, [stateProducts]);

  useEffect(() => {
    setSlug(params.slug);

    setProduct(
      stateProducts.filter(
        product => product.flowwwId.toString() === params.slug
      )[0]
    );
  }, [slug]);

  if (isEmpty(product)) {
    return <></>;
  }

  console.log(product);

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
      <ProductFaqs />
      <div className="bg-hg-cream500 pt-12 pb-8 md:py-16">
        <ProductCrosselling product={product} />
      </div>
      <Clinics />
      <div className="bg-hg-turquoise/5 pt-12 pb-8 md:py-16">
        <Professionals />
      </div>
    </MainLayout>
  );
}
