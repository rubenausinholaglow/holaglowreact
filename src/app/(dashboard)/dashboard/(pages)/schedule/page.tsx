'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { ProductClinics } from '@interface/clinic';
import { PackUnities, Product } from '@interface/product';
import ProductService from '@services/ProductService';
import { fetchClinics } from '@utils/fetch';
import useRoutes from '@utils/useRoutes';
import { validTypesFilterCart } from '@utils/utils';
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
    clinics,
    storedClinicId,
    setClinics,
    setStateProducts,
    setDashboardProducts,
    dashboardProducts,
  } = useGlobalPersistedStore(state => state);
  const {
    selectedClinic,
    setSelectedClinic,
    selectedTreatments,
    setSelectedTreatments,
    setTreatmentPacks,
    treatmentPacks,
  } = useSessionStore(state => state);
  const cart = useCartStore(state => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [packInProductCart, setPackInProductCart] = useState(false);

  const router = useRouter();
  const ROUTES = useRoutes();

  useEffect(() => {
    setStateProducts([]);
    setDashboardProducts([]);
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getDashboardProducts(true);
        const products = data
          .map((product: Product) => ({
            ...product,
            visibility: true,
          }))
          .filter((product: Product) =>
            product.clinicDetail.some(
              (clinicDetail: ProductClinics) =>
                clinicDetail.clinic.id === storedClinicId
            )
          );
        products.sort((a: any, b: any) => (a.price > b.price ? 1 : -1));
        setDashboardProducts(products);
      } catch (error: any) {
        Bugsnag.notify(error);
      }
    };

    fetchProducts();
  }, []);

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
    setTreatments();
  }, [dashboardProducts, treatmentPacks]);

  async function setTreatments() {
    try {
      setSelectedTreatments([]);
      const productTitles: string[] = cart
        .filter(
          cartItem =>
            (cartItem.isScheduled === false ||
              cartItem.isScheduled === undefined) &&
            validTypesFilterCart.includes(cartItem.type)
        )
        .map(cartItem => cartItem.title);

      const foundProducts: Product[] = [];

      productTitles.forEach(title => {
        dashboardProducts.forEach(product => {
          if (
            title.toUpperCase() === product.title.toUpperCase() &&
            validTypesFilterCart.includes(product.type)
          ) {
            if (product.isPack) {
              setPackInProductCart(true);
              addProductUnitiesPack(product);
            } else foundProducts.push(product);
          }
        });
      });
      setSelectedTreatments(foundProducts);
    } catch (error: any) {
      Bugsnag.notify(error);
    } finally {
      setIsLoading(false);
    }
  }

  function addProductUnitiesPack(product: Product) {
    product.packUnities?.forEach(x => {
      if (!treatmentPacks.some(packType => packType.id == x.id)) {
        const packsToAdd: PackUnities = {
          id: x.id,
          type: x.type,
          isScheduled: false,
        };
        setTreatmentPacks([...treatmentPacks, packsToAdd]);
      }
    });
  }

  return (
    <App>
      <MainLayout isDashboard>
        <Container className="mt-4">
          {!isLoading && (
            <>
              {!selectedClinic && (
                <>
                  <Title className="font-semibold mb-8">
                    Selecciona clínica
                  </Title>

                  <CheckoutClinicSelector isDashboard className="mb-8" />
                </>
              )}

              {selectedClinic && (
                <>
                  <Title className="font-semibold mb-8">
                    {cart.length == 0
                      ? 'Selecciona tratamiento'
                      : 'Tratamientos'}
                  </Title>
                  <Flex layout="col-left" className="gap-3 w-full">
                    {!isEmpty(dashboardProducts) && !isLoading ? (
                      <TreatmentAccordionSelector
                        isDashboard
                        packInProductCart={packInProductCart}
                      />
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
            </>
          )}
        </Container>
      </MainLayout>
    </App>
  );
}
