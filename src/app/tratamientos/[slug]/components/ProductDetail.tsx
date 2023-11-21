'use client';

import { RefObject, useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { Product } from '@interface/product';
import ProductService from '@services/ProductService';
import Clinics from 'app/components/common/Clinics';
import Professionals from 'app/components/common/Professionals';
import FloatingBottomBar from 'app/components/home/FloatingBottomBar';
import Testimonials from 'app/components/home/Testimonials';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { useElementOnScreen } from 'app/utils/common';
import { isEmpty } from 'lodash';
import { fetchProduct } from 'utils/fetch';

import PsrpPage from '../../psrp';
import ProductCrosselling from './ProductCrosselling';
import ProductExplanation from './ProductExplanation';
import ProductFaqs from './ProductFaqs';
import ProductFreeAppointment from './ProductFreeAppointment';
import ProductHeader from './ProductHeader';
import ProductInfo from './ProductInfo';
import ProductPaymentOptions from './ProductPaymentOptions';
import ProductPrices from './ProductPrices';
import ProductResults from './ProductResults';
import ProductSuggestions from './ProductSuggestions';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string; isDashboard: boolean };
}) {
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { deviceSize } = useSessionStore(state => state);
  const [productsAreLoaded, setProductsAreLoaded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState('0');
  const { productHighlighted } = useCartStore(state => state);

  const { slug, isDashboard } = params;

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
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId);
      setProduct(productDetails);
    }

    const product = stateProducts.filter(
      product => product?.extraInformation?.slug === slug
    )[0];

    const productId = product?.id ?? '';

    setProductId(productId);

    if (productId !== '' && productsAreLoaded) {
      initProduct(productId);
      setProduct(isEmpty(product) ? null : product);
    }
  }, [productsAreLoaded, slug]);

  useEffect(() => {
    setProduct(null);

    const fetchProduct = async () => {
      try {
        if (productHighlighted?.id) {
          const data = await ProductService.getProduct(productHighlighted.id);
          setProductId(productHighlighted.id);
          setProduct(data);
        }
      } catch (error: any) {
        Bugsnag.notify(error);
      }
    };

    fetchProduct();
  }, [productHighlighted]);

  if (!productsAreLoaded) {
    return <></>;
  }

  if (product && product != undefined && !isEmpty(product)) {
    return (
      <>
        <div className="bg-hg-cream500 rounded-t-3xl pt-8">
          <ProductHeader product={product} isDashboard={isDashboard} />
          <ProductInfo product={product} />
          {isDashboard && !product.isPack && (
            <div ref={productPriceRef as RefObject<HTMLDivElement>}>
              <ProductPrices product={product} />
            </div>
          )}
        </div>

        {product.beforeAndAfterImages?.length > 0 && (
          <ProductResults product={product} />
        )}
        {!isDashboard && (
          <div ref={productPriceRef as RefObject<HTMLDivElement>}>
            <ProductPrices product={product} />
          </div>
        )}
        {!isDashboard && <ProductPaymentOptions totalPrice={product.price} />}
        {isDashboard && (
          <div className="bg-hg-turquoise/5 pt-12 pb-24 md:py-16">
            <Professionals />
          </div>
        )}
        {!isDashboard && (
          <>
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
          </>
        )}
      </>
    );
  } else if (productId == '') {
    return <PsrpPage slug={params.slug} isDashboard={false} />;
  }
}
