'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { fetchProduct } from '@utils/fetch';
import { Product } from 'app/types/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Accordion } from 'designSystem/Accordion/Accordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

import ProductPriceCard from './ProductPriceCard';
import ProductSessionGroupedPriceCard from './ProductSessionGroupedPriceCard';
import ProductSessionPriceCard from './ProductSessionPriceCard';

export default function ProductPrices({
  product,
  isDashboard = false,
}: {
  product: Product;
  isDashboard?: boolean;
}) {
  const [productItems, setProductITems] = useState<Product[]>([]);
  const [isSessionProduct, setIsSessionProduct] = useState<boolean>(false);
  const [groupedSessionProducts, setGroupedSessionProducts] = useState<
    Product[][] | null
  >([]);

  useEffect(() => {
    if (product.upgrades && !isDashboard) {
      product.upgrades = product.upgrades.sort((x, y) => x.order - y.order);

      const allProducts = product.upgrades.map(item => item.product);

      setProductITems(allProducts);
    }
  }, [product]);

  useEffect(() => {
    if (!isEmpty(productItems)) {
      setIsSessionProduct(
        productItems.length > 1 &&
          productItems
            .map((item: Product) => item.title)
            .every((item: string) =>
              item.toLowerCase().includes(product.title.toLowerCase())
            ) &&
          product.title.indexOf('Pack Wellaging') < 0 &&
          product.title.indexOf('Armonización facial') < 0
      );
    }
  }, [productItems]);

  useEffect(() => {
    function groupProductsByTitle(arr: Product[]) {
      const groupedArray: { [key: string]: Product[] } = {};

      productItems.forEach((product: Product) => {
        const title = product.title
          .replace(/ x[36]$/, '')
          .replace(' básico', '')
          .toLowerCase();

        if (!groupedArray[title]) {
          groupedArray[title] = [];
        }

        groupedArray[title].push(product);
      });

      return Object.values(groupedArray);
    }

    const groupedArrays: Product[][] = groupProductsByTitle(productItems);

    if (groupedArrays.length !== productItems.length) {
      setGroupedSessionProducts(groupedArrays);
    }
  }, [isSessionProduct]);

  useEffect(() => {
    async function initProduct(productId: string, isDashboard: boolean) {
      const productDetails = await fetchProduct(productId, isDashboard, false);

      if (productDetails.upgrades) {
        productDetails.upgrades = productDetails.upgrades.sort(
          (x, y) => x.order - y.order
        );
        const allProducts = productDetails.upgrades.map(item => item.product);
        setProductITems(allProducts);
      }
    }

    if (isDashboard) {
      initProduct(product.id, true);
    }
  }, []);

  if (isEmpty(productItems)) {
    return <></>;
  }

  return (
    <div
      className="bg-gradient from-hg-secondary500 to-hg-primary300"
      id="prices"
    >
      <Container className="py-12">
        {!isDashboard && (
          <Title isAnimated size="2xl" className="font-bold mb-6 md:mb-12">
            <Underlined color={HOLAGLOW_COLORS['primary']}>
              Personaliza
            </Underlined>{' '}
            tu experiencia
          </Title>
        )}

        {!isSessionProduct && (
          <Flex layout="col-left" className="md:flex-row gap-8">
            <Accordion
              defaultValue={isMobile ? 'accordion-0' : 'value'}
              className="flex flex-col gap-4 mb-8 md:flex-row md:gap items-start"
            >
              {productItems.map((item: Product, index: number) => (
                <ProductPriceCard
                  isDashboard={isDashboard}
                  key={item.title}
                  product={item}
                  parentProduct={product}
                  className={
                    productItems.length === 1 && !isMobile && !item.isPack
                      ? 'w-1/3'
                      : ''
                  }
                />
              ))}
            </Accordion>
          </Flex>
        )}

        {isSessionProduct && isEmpty(groupedSessionProducts) && (
          <Flex layout="col-left" className="md:flex-row md:gap-8">
            <Flex
              layout="col-left"
              className="bg-white p-3 md:p-0 rounded-2xl w-full shadow-centered-secondary md:bg-transparent md:shadow-none"
            >
              <Text className="p-3 font-semibold md:hidden">
                {product.title}
              </Text>

              <Flex
                layout="col-left"
                className="gap-4 p-3 w-full md:flex-row md:gap-12"
              >
                <ProductSessionPriceCard productItems={productItems} />
              </Flex>
            </Flex>
          </Flex>
        )}

        {isSessionProduct && !isEmpty(groupedSessionProducts) && (
          <Flex
            layout="col-left"
            className="w-full gap-4 md:gap-12 md:flex-row"
          >
            {groupedSessionProducts?.map((products, productIndex) => (
              <ProductSessionPriceCard
                isGroupedSessionProduct
                key={productIndex}
                productItems={products}
              />
            ))}
          </Flex>
        )}
      </Container>
    </div>
  );
}
