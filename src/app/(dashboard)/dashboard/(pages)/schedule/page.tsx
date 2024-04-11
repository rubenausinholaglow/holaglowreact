'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import { PackUnitiesScheduled, Product, UnityType } from '@interface/product';
import ProductService from '@services/ProductService';
import { getValidTypes } from '@utils/agendaUtils';
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
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty, set } from 'lodash';
import { useRouter } from 'next/navigation';
import { v4 as createUniqueId } from 'uuid';

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
    setTreatmentPacks,
    treatmentPacks,
  } = useSessionStore(state => state);
  const cart = useCartStore(state => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [packInProductCart, setPackInProductCart] = useState(false);

  const router = useRouter();
  const ROUTES = useRoutes();

  const validTypes = getValidTypes();
  useEffect(() => {
    setStateProducts([]);
    setDashboardProducts([]);
    const fetchProducts = async () => {
      try {
        const products = await ProductService.getDashboardProducts(
          storedClinicId,
          true
        );
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
    if (treatmentPacks.length == 0) {
      setTreatments();
    } else {
      setPackInProductCart(true);
      setIsLoading(false);
    }
  }, []);

  async function setTreatments() {
    try {
      const packsToAdd: PackUnitiesScheduled[] = [];
      const productTitles: string[] = cart
        .filter(
          cartItem =>
            (cartItem.isScheduled === false ||
              cartItem.isScheduled === undefined) &&
            validTypesFilterCart.includes(cartItem.type)
        )
        .map(cartItem => cartItem.title);

      productTitles.forEach(title => {
        dashboardProducts.forEach(product => {
          if (
            title.toUpperCase() === product.title.toUpperCase() &&
            validTypesFilterCart.includes(product.type)
          ) {
            if (product.isPack) {
              setPackInProductCart(true);
              const packs = addProductUnitiesPack(product);
              packsToAdd.push(...packs);
            }
          }
        });
      });

      if (packsToAdd.length > 0) {
        setTreatmentPacks(packsToAdd);
      }
    } catch (error: any) {
      Bugsnag.notify(error);
    } finally {
      setIsLoading(false);
    }
  }

  function addProductUnitiesPack(product: Product): PackUnitiesScheduled[] {
    const packsToAdd: PackUnitiesScheduled[] = [];
    product.packUnities?.forEach(x => {
      const pack: PackUnitiesScheduled = {
        uniqueId: createUniqueId(),
        id: x.id,
        type: x.type,
        isScheduled: false,
      };
      packsToAdd.push(pack);
    });
    return packsToAdd;
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
                      <>
                        <div>
                          {cart.length > 0 &&
                            cart
                              .filter(x => validTypes.includes(x.type))
                              .map((product, index) => {
                                if (!product.isPack)
                                  return (
                                    <div key={index} className="flex gap-4">
                                      <Text className="font-semibold">
                                        {product.title}
                                      </Text>
                                      <Text>
                                        {product.isScheduled
                                          ? 'Agendado ' + product.scheduledDate
                                          : 'Pendiente'}
                                      </Text>
                                    </div>
                                  );
                                else
                                  return (
                                    <div>
                                      <Text className="font-semibold">
                                        {product.title}
                                      </Text>
                                      {product.packUnities?.map(
                                        (pack, index) => {
                                          const x = treatmentPacks.find(
                                            x => x.id == pack.id
                                          );
                                          return (
                                            <div
                                              key={index}
                                              className="flex gap-4"
                                            >
                                              <Text className="font-semibold ml-4">
                                                {UnityType[x!.type]}
                                              </Text>
                                              <Text>
                                                {x?.isScheduled
                                                  ? 'Agendado ' +
                                                    x.scheduledDate
                                                  : 'Pendiente'}
                                              </Text>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  );
                              })}
                        </div>
                        <TreatmentAccordionSelector
                          isDashboard
                          packInProductCart={packInProductCart}
                        />
                      </>
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
