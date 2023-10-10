'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import Dropdown from 'app/components/forms/Dropdown';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { ROUTES } from 'app/utils/routes';
import { group } from 'console';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { SvgAdd, SvgArrow, SvgInjection, SvgMinus } from 'icons/IconsDs';
import * as icon from 'icons/IconsDs';
import { isEmpty } from 'lodash';

import ProductPriceCard from './ProductPriceCard';
import ProductSessionGroupedPriceCard from './ProductSessionGroupedPriceCard';
import ProductSessionPriceCard from './ProductSessionPriceCard';

export default function ProductPrices({ product }: { product: Product }) {
  const { deviceSize } = useGlobalPersistedStore(state => state);
  const [productItems, setProductITems] = useState<any>([]);
  const [isSessionProduct, setIsSessionProduct] = useState<any>(false);
  const [groupedSessionProducts, setGroupedSessionProducts] = useState<
    Product[][] | null
  >([]);

  useEffect(() => {
    if (product.upgrades) {
      const AllProducts = product.upgrades.map(item => item.product);

      setProductITems(AllProducts);
    }
  }, [product]);

  useEffect(() => {
    if (!isEmpty(productItems)) {
      setIsSessionProduct(
        productItems
          .map((item: Product) => item.title)
          .every((item: string) => item.includes(product.title))
      );
    }
  }, [productItems]);

  useEffect(() => {
    function groupProductsByTitle(arr: Product[]) {
      const groupedSessionProducts: { [key: string]: Product[] } = {};

      for (const item of arr) {
        if (!groupedSessionProducts[item.title]) {
          groupedSessionProducts[item.title] = [];
        }

        groupedSessionProducts[item.title].push(item);
      }

      return Object.values(groupedSessionProducts);
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
        <Title size="2xl" className="font-bold mb-6 md:mb-12">
          <Underlined color={HOLAGLOW_COLORS['primary']}>
            Personaliza
          </Underlined>{' '}
          tu experiencia
        </Title>

        {!isSessionProduct && (
          <Flex layout="col-left" className="md:flex-row mb-8 gap-8">
            <Accordion
              value={deviceSize.isMobile ? 'accordion-0' : 'value'}
              className="flex flex-col gap-4 mb-8 md:flex-row md:gap-16 items-start"
            >
              {productItems.map((item: Product, index: number) => (
                <ProductPriceCard
                  key={item.title}
                  product={item}
                  index={index}
                />
              ))}
            </Accordion>
          </Flex>
        )}

        {isSessionProduct && isEmpty(groupedSessionProducts) && (
          <Flex layout="col-left" className="md:flex-row mb-8 md:gap-8">
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
            className="w-full mb-8 gap-4 md:gap-12 md:flex-row"
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

        <Flex className="bg-white/30 md:bg-transparent p-4 rounded-xl w-full md:w-auto gap-8 justify-center">
          <Text>Comparte</Text>
          <icon.SvgInstagram />
          <icon.SvgFacebook />
          <icon.SvgX />
          <icon.SvgShare />
        </Flex>
      </Container>
    </div>
  );
}
