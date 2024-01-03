'use client';

import { useEffect, useState } from 'react';
import { fetchClinics, fetchProducts } from '@utils/fetch';
import CheckoutClinicSelector from 'app/(web)/checkout/components/CheckoutClinicSelector';
import TreatmentAccordionSelector from 'app/(web)/components/common/TreatmentAccordionSelector';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';

export default function Page() {
  const {
    stateProducts,
    clinics,
    storedClinicId,
    setClinics,
    setStateProducts,
  } = useGlobalPersistedStore(state => state);
  const { selectedClinic, setSelectedClinic } = useSessionStore(state => state);
  const [productCategories, setProductCategories] = useState<string[]>([]);

  useEffect(() => {
    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
    const clinic = clinics.filter(clinic => clinic.id === storedClinicId);

    setSelectedClinic(clinic[0]);
  }, [clinics]);

  useEffect(() => {
    async function initProducts() {
      const products = await fetchProducts();
      setStateProducts(products);
    }

    if (isEmpty(stateProducts)) {
      initProducts();
    }
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
    <MainLayout isDashboard>
      <Container className="mt-4">
        {!selectedClinic && (
          <>
            <Title className="font-semibold mb-8">Selecciona clínica</Title>

            <CheckoutClinicSelector isDashboard className="mb-8" />
          </>
        )}

        {selectedClinic && (
          <>
            <Title className="font-semibold mb-8">Selecciona tratamiento</Title>
            <Flex layout="col-left" className="gap-3 w-full">
              {!isEmpty(productCategories) && (
                <TreatmentAccordionSelector isDashboard />
              )}
            </Flex>
          </>
        )}
      </Container>
    </MainLayout>
  );
}
