'use client';

import { useEffect, useState } from 'react';
import ProductService from '@services/ProductService';
import { fetchClinics, fetchProducts } from '@utils/fetch';
import useRoutes from '@utils/useRoutes';
import CheckoutClinicSelector from 'app/(web)/checkout/components/CheckoutClinicSelector';
import TreatmentAccordionSelector from 'app/(web)/components/common/TreatmentAccordionSelector';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgSpinner } from 'app/icons/Icons';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

import { useCartStore } from '../budgets/stores/userCartStore';

export default function Page() {
  const {
    stateProducts,
    dashboardProducts,
    clinics,
    storedClinicId,
    setClinics,
    setStateProducts,
  } = useGlobalPersistedStore(state => state);
  const {
    selectedClinic,
    setSelectedClinic,
    selectedTreatments,
    setSelectedTreatments,
  } = useSessionStore(state => state);
  const cart = useCartStore(state => state.cart);
  const [productCategories, setProductCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const ROUTES = useRoutes();

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
      const products = await fetchProducts({ isDerma: false });
      setStateProducts(products);
      setIsLoading(false);
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
    async function initTreatments() {
      await setTreatments();
    }
    initTreatments();
  }, [stateProducts]);

  async function setTreatments() {
    setSelectedTreatments([]);
    const validTypes = [1, 2, 7];
    /*const productTitles: string[] = cart.map(cartItem => cartItem.title);
    const foundProducts: Product[] = [];

    productTitles.forEach(title => {
      dashboardProducts.forEach(product => {
        if (
          title.includes(product.title) &&
          validTypes.includes(product.type)
        ) {
          foundProducts.push(product);
        }
      });
    });*/
    const productIds = cart.map(cartItem => cartItem.id);

    const foundProducts = await Promise.all(
      productIds.map(async id => {
        const product = dashboardProducts.find(
          product => product.id === id && validTypes.includes(product.type)
        );
        if (product) {
          return product;
        } else {
          const fetchedProduct = await ProductService.getProduct(
            id,
            false,
            false
          );
          if (fetchedProduct && validTypes.includes(fetchedProduct.type)) {
            return fetchedProduct;
          }
        }
      })
    );
    const validProducts = foundProducts.filter(
      product => product !== undefined
    );

    setSelectedTreatments(validProducts);
    setIsLoading(false);
  }

  return (
    <App>
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
              <Title className="font-semibold mb-8">
                Selecciona tratamiento
              </Title>
              <Flex layout="col-left" className="gap-3 w-full">
                {!isEmpty(productCategories) && !isLoading ? (
                  <TreatmentAccordionSelector isDashboard />
                ) : (
                  <SvgSpinner className="w-full mb-4" />
                )}
              </Flex>

              <Button
                onClick={() => {
                  if (selectedTreatments.length > 0) {
                    router.push(
                      `${ROUTES.dashboard.checkIn.agenda}?isCheckin=false`
                    );
                  }
                }}
                disabled={selectedTreatments.length == 0}
              >
                Continuar
              </Button>
            </>
          )}
        </Container>
      </MainLayout>
    </App>
  );
}
