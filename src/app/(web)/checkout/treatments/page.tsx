'use client';

import { useEffect, useState } from 'react';
import { fetchProducts } from '@utils/fetch';
import TreatmentAccordionSelector from 'app/(web)/components/common/TreatmentAccordionSelector';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function Page() {
  const { stateProducts, setStateProducts } = useGlobalPersistedStore(
    state => state
  );
  const [productCategories, setProductCategories] = useState<string[]>([]);

  useEffect(() => {
    initializeCategories();
  }, []);

  useEffect(() => {
    initializeCategories();
  }, [stateProducts]);

  return (
    <App>
      <MainLayout isCheckout>
        <Container className="mt-6 md:mt-16">
          <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
            <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
              <Title className="font-semibold">
                ¿Qué tratamiento necesitas?
              </Title>

              <Flex layout="col-left" className="gap-3 w-full">
                {!isEmpty(productCategories) && (
                  <TreatmentAccordionSelector isDashboard={false} />
                )}
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </MainLayout>
    </App>
  );

  function initializeCategories() {
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
    async function initProducts() {
      const products = await fetchProducts({ isDerma: false });
      setStateProducts(products);
    }

    if (isEmpty(stateProducts)) {
      initProducts();
    }
  }
}
