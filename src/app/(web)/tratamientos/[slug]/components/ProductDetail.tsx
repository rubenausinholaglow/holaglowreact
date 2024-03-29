'use client';

import { RefObject, useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import ProductService from '@services/ProductService';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import Professionals from 'app/(web)/components/common/Professionals';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import { setSeoMetaData, useElementOnScreen } from 'app/utils/common';
import { fetchProduct } from 'app/utils/fetch';
import { isEmpty } from 'lodash';

import PsrpPage from '../../psrp';
import ProductHeader from './ProductHeader';
import ProductInfo from './ProductInfo';
import ProductPrices from './ProductPrices';
import ProductResults from './ProductResults';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string; isDashboard: boolean };
}) {
  const { stateProducts, dashboardProducts } = useGlobalPersistedStore(
    state => state
  );
  const { productHighlighted } = useCartStore(state => state);

  const [bottomBarThreshold, setBottomBarThreshold] = useState(1200);
  const [isHydrated, setIsHydrated] = useState(false);
  const [productsAreLoaded, setProductsAreLoaded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [productId, setProductId] = useState('0');
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
    if (!isEmpty(dashboardProducts)) {
      setProductsAreLoaded(true);
    }
  }, [stateProducts, dashboardProducts]);

  useEffect(() => {
    async function initProduct(productId: string, isDashboard: boolean) {
      const productDetails = await fetchProduct(productId, false, false);
      setProduct(productDetails);
      setSeoMetaData(
        productDetails.extraInformation.seoTitle,
        productDetails.extraInformation.seoMetaDescription
      );
      setIsHydrated(true);
    }
    let product = undefined;
    if (isDashboard) {
      product = dashboardProducts.filter(
        product =>
          product?.id.toUpperCase() === productHighlighted?.id.toUpperCase()
      )[0];
    } else {
      product = stateProducts.filter(
        product => product?.extraInformation?.slug === slug
      )[0];
    }

    const productId = product?.id ?? '';

    setProductId(productId);

    if (productId !== '' && productsAreLoaded) {
      initProduct(productId, false);
      setProduct(isEmpty(product) ? null : product);
    }
  }, [productsAreLoaded, slug]);

  useEffect(() => {
    setProduct(null);

    const fetchProduct = async () => {
      try {
        if (productHighlighted?.id) {
          const data = await ProductService.getProduct(
            productHighlighted.id,
            false,
            false
          );
          setProductId(productHighlighted.id);
          setProduct(data);
          setIsHydrated(true);
        }
      } catch (error: any) {
        Bugsnag.notify(error);
      }
    };

    fetchProduct();
  }, [productHighlighted]);

  if (!productsAreLoaded || !isHydrated) {
    return <></>;
  }

  if (product && product != undefined && !isEmpty(product)) {
    return (
      <>
        <div
          className={`bg-hg-cream500 rounded-t-3xl pt-8 ${
            !isDashboard ? 'pb-12' : ''
          }`}
        >
          <ProductHeader product={product} isDashboard={isDashboard} />
          <ProductInfo
            product={product}
            isDashboard={isDashboard}
            setBottomBarThreshold={setBottomBarThreshold}
          />
          {isDashboard && product.type != 3 && product.upgrades?.length > 1 && (
            <div ref={productPriceRef as RefObject<HTMLDivElement>}>
              <ProductPrices product={product} isDashboard />
            </div>
          )}
        </div>
        {product.beforeAndAfterImages?.length > 0 && (
          <ProductResults product={product} />
        )}

        <div className="bg-hg-turquoise/5 pt-12 pb-24 md:py-16">
          <Professionals />
        </div>
      </>
    );
  } else if (productId == '') {
    return <PsrpPage slug={params.slug} isDashboard={false} />;
  }
}
