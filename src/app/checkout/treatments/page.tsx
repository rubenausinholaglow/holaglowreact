'use client';

import { useEffect, useState } from 'react';
import { Product } from '@interface/product';
import CategoryIcon from 'app/components/common/CategoryIcon';
import MainLayout from 'app/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { ROUTES } from 'app/utils/routes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { SvgAngle, SvgRadioChecked, SvgUserScan } from 'icons/IconsDs';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { fetchProduct } from 'utils/fetch';

export default function ClinicsCheckout() {
  const router = useRouter();
  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { setSelectedTreatments } = useSessionStore(state => state);

  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [PVProduct, setPVProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId);
      setPVProduct(productDetails);
    }

    initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID!);
    setSelectedTreatments([]);
  }, []);

  function getProductsByCategory(category: string) {
    const filteredProducts = stateProducts.filter(
      product =>
        product.category.some(categoryItem => categoryItem.name === category) &&
        !product.isPack
    );

    return filteredProducts;
  }

  useEffect(() => {
    const allCategoryNames: string[] = stateProducts.reduce(
      (categoryNames: string[], product) => {
        const productCategories = product.category.map(
          category => category.name
        );
        return [...categoryNames, ...productCategories];
      },
      []
    );

    const uniqueCategoryNames: string[] = [...new Set(allCategoryNames)];

    setProductCategories(uniqueCategoryNames);
  }, [stateProducts]);

  return (
    <MainLayout isCheckout>
      <Container className="mt-6 md:mt-16">
        <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
          <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
            <Title className="font-semibold">¿Qué tratamiento necesitas?</Title>

            <Flex layout="col-left" className="gap-3 w-full">
              <div
                className="bg-hg-primary300 p-4 w-full rounded-lg cursor-pointer"
                onClick={() => {
                  setSelectedTreatments([PVProduct] as Product[]);
                  router.push(ROUTES.checkout.schedule);
                }}
              >
                <Flex className="">
                  <SvgUserScan className="shrink-0 mr-4" />
                  <div>
                    <Text className="font-semibold">Primera cita gratis</Text>
                    <Text className="text-xs">Escáner 3D</Text>
                  </div>
                  <SvgAngle className="transition-all text-hg-black500 ml-auto" />
                </Flex>
              </div>

              {!isEmpty(productCategories) && (
                <Accordion>
                  {productCategories.map(category => {
                    return (
                      <AccordionItem
                        value={category}
                        key={category}
                        className={`transition-all w-full rounded-lg overflow-hidden mb-4 ${
                          selectedCategory === category
                            ? 'bg-hg-secondary100'
                            : 'bg-hg-black50'
                        }`}
                      >
                        <AccordionTrigger>
                          <Flex
                            className="p-4"
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory !== category ? category : null
                              )
                            }
                          >
                            <CategoryIcon
                              category={category}
                              className="mr-4"
                            />
                            <Text className="font-semibold">{category}</Text>

                            <SvgAngle
                              className={`transition-all text-hg-black500 ml-auto ${
                                selectedCategory === category ? 'rotate-90' : ''
                              }`}
                            />
                          </Flex>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="border-t border-hg-secondary300">
                            <ul className="flex flex-col w-full">
                              {getProductsByCategory(category).map(product => (
                                <li
                                  className="transition-all flex items-center bg-hg-secondary100 hover:bg-hg-secondary300 p-4 cursor-pointer"
                                  key={product.title}
                                  onClick={() => {
                                    setSelectedProduct(product);
                                    setSelectedTreatments([product]);
                                    router.push(ROUTES.checkout.schedule);
                                  }}
                                >
                                  <div className="mr-4">
                                    <Text className="font-semibold">
                                      {product.title}
                                    </Text>
                                    <Text className="text-xs">
                                      {product.description}
                                    </Text>
                                  </div>

                                  {selectedProduct?.title === product.title ? (
                                    <SvgRadioChecked
                                      height={24}
                                      width={24}
                                      className="shrink-0 ml-auto"
                                    />
                                  ) : (
                                    <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 ml-auto"></div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </MainLayout>
  );
}
