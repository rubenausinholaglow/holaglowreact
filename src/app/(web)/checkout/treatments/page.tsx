'use client';

import { useEffect, useState } from 'react';
import TreatmentAccordionSelector from 'app/(web)/components/common/TreatmentAccordionSelector';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Product } from 'app/types/product';
import useRoutes from 'app/utils/useRoutes';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

interface ClinicsCheckoutProps {
  isDashboard?: boolean;
}

const ClinicsCheckout: React.FC<ClinicsCheckoutProps> = ({ isDashboard }) => {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { stateProducts } = useGlobalPersistedStore(state => state);
  const { setSelectedTreatments } = useSessionStore(state => state);

  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    <MainLayout isCheckout hideHeader={isDashboard}>
      <Container className="mt-6 md:mt-16">
        <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
          <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
            <Title className="font-semibold">¿Qué tratamiento necesitas?</Title>

            <Flex layout="col-left" className="gap-3 w-full">
              {!isEmpty(productCategories) && <TreatmentAccordionSelector />}
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </MainLayout>
  );
};

export default ClinicsCheckout;
