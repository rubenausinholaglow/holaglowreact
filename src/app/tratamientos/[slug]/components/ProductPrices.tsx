'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import { useCartStore } from 'app/dashboard/(pages)/budgets/stores/userCartStore';
import { useSessionStore } from 'app/stores/globalStore';
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
  const { deviceSize } = useSessionStore(state => state);
  const [productItems, setProductITems] = useState<Product[]>([]);
  const [isSessionProduct, setIsSessionProduct] = useState<boolean>(false);
  const [groupedSessionProducts, setGroupedSessionProducts] = useState<
    Product[][] | null
  >([]);
  const { productHighlighted } = useCartStore(state => state);

  useEffect(() => {
    if (product.upgrades) {
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
            .every((item: string) => item.includes(product.title))
      );
    }
  }, [productItems]);

  useEffect(() => {
    function groupProductsByTitle(arr: Product[]) {
      const groupedArray: { [key: string]: Product[] } = {};

      productItems.forEach((product: Product) => {
        const title = product.title.replace(/ x[36]$/, '');

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

  if (isEmpty(productItems)) {
    return <></>;
  }

  return (
    <div
      className="bg-gradient from-hg-secondary500 to-hg-primary300"
      id="prices"
    >
      <Container className="py-12">
        {!productHighlighted && (
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
              defaultValue={deviceSize.isMobile ? 'accordion-0' : 'value'}
              className="flex flex-col gap-4 mb-8 md:flex-row md:gap-8 items-start"
            >
              {productItems.map((item: Product, index: number) => (
                <ProductPriceCard
                  isDashboard={isDashboard}
                  fullWidthPack={productItems.length === 1 && item.isPack}
                  key={item.title}
                  product={item}
                  index={index}
                  parentProduct={product}
                  className={
                    productItems.length === 1 &&
                    !deviceSize.isMobile &&
                    !item.isPack
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
                {productItems.map((item: Product, index: number) => {
                  if (item.price > 0) {
                    return (
                      <ProductSessionPriceCard
                        isDashboard={isDashboard}
                        key={item.title}
                        product={item}
                        index={index}
                      />
                    );
                  }
                })}
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
              <Flex
                layout="col-left"
                className="w-full md:flex-row md:gap-8"
                key={`productGroup-${productIndex}`}
              >
                <Flex
                  layout="col-left"
                  className="bg-white p-3 rounded-2xl w-full shadow-centered-secondary "
                >
                  <Text className="p-3 font-semibold md:text-lg">
                    {products[0].title}
                  </Text>

                  <Flex layout="col-left" className="gap-4 w-full">
                    {products.map((item: Product, index: number) => {
                      if (item.price > 0) {
                        return (
                          <ProductSessionGroupedPriceCard
                            key={`product-card-${index}`}
                            product={item}
                          />
                        );
                      }
                      return null;
                    })}
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Flex>
        )}
      </Container>
    </div>
  );
}
