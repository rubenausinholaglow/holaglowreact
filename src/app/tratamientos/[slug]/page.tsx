'use client';

import { RefObject, useEffect, useState } from 'react';
import { Product } from '@interface/product';
import Clinics from 'app/components/common/Clinics';
import Professionals from 'app/components/common/Professionals';
import FloatingBottomBar from 'app/components/home/FloatingBottomBar';
import Testimonials from 'app/components/home/Testimonials';
import MainLayout from 'app/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { useElementOnScreen } from 'app/utils/common';
import { isEmpty } from 'lodash';
import { fetchProduct } from 'utils/fetch';

import PsrpPage from '../psrp';
import ProductCrosselling from './components/ProductCrosselling';
import ProductExplanation from './components/ProductExplanation';
import ProductFaqs from './components/ProductFaqs';
import ProductFreeAppointment from './components/ProductFreeAppointment';
import ProductHeader from './components/ProductHeader';
import ProductInfo from './components/ProductInfo';
import ProductPaymentOptions from './components/ProductPaymentOptions';
import ProductPrices from './components/ProductPrices';
import ProductResults from './components/ProductResults';
import ProductSuggestions from './components/ProductSuggestions';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { deviceSize } = useSessionStore(state => state);
  const [productsAreLoaded, setProductsAreLoaded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState('0');

  const [productPriceRef, isProductPriceVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  useEffect(() => {
    if (!isEmpty(stateProducts)) {
      setProductsAreLoaded(true);
    }
  }, [stateProducts]);

  useEffect(() => {
    const product = stateProducts.filter(
      product => product?.extraInformation?.slug === params.slug
    )[0];

    const productId = product?.id ?? '';

    setProductId(productId);
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId);
      setProduct(productDetails);
    }
    if (productId !== '' && productsAreLoaded) {
      initProduct(productId);
      setProduct(isEmpty(product) ? null : product);
    }
  }, [productsAreLoaded]);

  if (!productsAreLoaded) {
    return <></>;
  }

  if (product && product != undefined && !isEmpty(product)) {
    return (
      <MainLayout>
        <div className="bg-hg-cream500 rounded-t-3xl pt-8">
          <ProductHeader product={product} />
          <ProductInfo product={product} />
        </div>
        {product.beforeAndAfterImages?.length > 0 && (
          <ProductResults product={product} />
        )}
        <div ref={productPriceRef as RefObject<HTMLDivElement>}>
          <ProductPrices product={product} />
        </div>
        <ProductPaymentOptions totalPrice={product.price} />
        <ProductExplanation product={product} />
        <ProductFreeAppointment />
        <div className="bg-hg-black50">
          <Testimonials />
        </div>
        <ProductSuggestions product={product} />
        <ProductFaqs product={product} />

        {product.relatedProducts?.length > 0 && (
          <div className="bg-hg-cream500 pt-12 pb-24 md:py-16 md:pb-24">
            <ProductCrosselling product={product} />
          </div>
        )}
        <Clinics />
        <div className="bg-hg-turquoise/5 pt-12 pb-24 md:py-16">
          <Professionals />
        </div>
        {deviceSize.isMobile && (
          <FloatingBottomBar
            product={product}
            isVisible={!isProductPriceVisible}
          />
        )}
      </MainLayout>
    );
  } else if (productId == '') {
    return <PsrpPage slug={params.slug} />;
  }
}
