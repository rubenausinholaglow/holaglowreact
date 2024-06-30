'use client';

import { RefObject, useEffect, useState } from 'react';
import { ProfessionalDashboardCarousel } from 'app/(dashboard)/dashboard/(pages)/budgets/ProfessionalsModal';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import { setSeoMetaData, useElementOnScreen } from 'app/utils/common';
import { fetchProduct } from 'app/utils/fetch';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import PsrpPage from '../../psrp';
import ProductHeader from './ProductHeader';
import ProductImagesCarouselDashboard from './ProductImagesCarouselDashboard';
import ProductInfo from './ProductInfo';
import ProductPrices from './ProductPrices';
import ProductResults from './ProductResults';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { dashboardProducts } = useGlobalPersistedStore(state => state);
  const { productHighlighted } = useCartStore(state => state);

  const [, setBottomBarThreshold] = useState(1200);
  const [isHydrated, setIsHydrated] = useState(false);
  const [productsAreLoaded, setProductsAreLoaded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const { slug } = params;

  const [productPriceRef] = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  useEffect(() => {
    if (!isEmpty(dashboardProducts)) {
      setProductsAreLoaded(true);
    }
  }, [dashboardProducts]);

  useEffect(() => {
    async function initProduct(productId: string, isDashboard: boolean) {
      const productDetails = await fetchProduct(productId, isDashboard, false);
      setProduct(productDetails);
      setIsHydrated(true);
      setSeoMetaData(
        productDetails.extraInformation.seoTitle,
        productDetails.extraInformation.seoMetaDescription
      );
      setIsHydrated(true);
    }
    let product = undefined;

    product = dashboardProducts.filter(
      product =>
        product?.id.toUpperCase() === productHighlighted?.id.toUpperCase()
    )[0];

    const productId = product?.id ?? '';

    if (productId !== '' && productsAreLoaded) {
      initProduct(productId, true);
      setProduct(isEmpty(product) ? null : product);
    }
  }, [productsAreLoaded, slug]);

  if (!productsAreLoaded || !isHydrated) {
    return <></>;
  }

  if (product && product != undefined && !isEmpty(product)) {
    return (
      <>
        <div className="bg-hg-cream500 rounded-t-3xl pt-8">
          <ProductHeader product={product} isDashboard={true} />
          {product.beforeAndAfterImages.length > 0 && (
            <div className="mb-6 md:mb-0 md:row-start-2 md:col-start-1 md:col-end-3">
              <ProductImagesCarouselDashboard product={product} />
            </div>
          )}
          <ProductInfo
            product={product}
            isDashboard={true}
            setBottomBarThreshold={setBottomBarThreshold}
          />
          {product.type != 3 && product.upgrades?.length > 1 && (
            <div ref={productPriceRef as RefObject<HTMLDivElement>}>
              <ProductPrices product={product} isDashboard />
            </div>
          )}
        </div>
        {product.beforeAndAfterImages?.length > 0 && (
          <ProductResults product={product} />
        )}

        <div className="pt-12 pb-20">
          <Container className="md:px-6">
            <Title
              isAnimated
              size="2xl"
              className="text-left font-bold mb-6 md:mb-8"
            >
              Nuestras Profesionales
            </Title>
            <Text isAnimated className="text-hg-black500 mb-8 md:text-lg">
              En Holaglow defendemos una medicina estética que cuida y, para
              ello, la profesionalidad y la empatía son fundamentales. Todos
              nuestros doctores comparten el mismo compromiso: ponerse en tu
            </Text>
          </Container>

          <ProfessionalDashboardCarousel />
        </div>
      </>
    );
  }
}
