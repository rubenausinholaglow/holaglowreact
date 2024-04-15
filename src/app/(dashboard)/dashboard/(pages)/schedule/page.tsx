'use client';

import { useEffect, useState } from 'react';
import Bugsnag from '@bugsnag/js';
import {
  CartItem,
  PackUnitiesScheduled,
  Product,
  UnityType,
} from '@interface/product';
import { Accordion } from '@radix-ui/react-accordion';
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
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty, set, xor, zip } from 'lodash';
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

  useEffect(() => {
    const fetchProducts = async () => {
      setStateProducts([]);
      setDashboardProducts([]);
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

    if (isEmpty(cart)) fetchProducts();
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
    if (
      treatmentPacks.length == 0 ||
      !treatmentPacks.find(x => x.isScheduled == true)
    ) {
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

  const renderProductsDashboard = (
    cart: CartItem[],
    findScheduledProducts = false
  ) => {
    return (
      <Accordion type="single" collapsible className="w-full" defaultValue="1">
        <AccordionItem
          className={`transition-all w-full rounded-lg overflow-hidden mb-4 
                  bg-hg-secondary100 min-w-[80%]`}
          value="1"
        >
          <AccordionTrigger>
            <Flex className="p-4">
              <Text className="font-semibold">
                {findScheduledProducts
                  ? 'Productos Agendados'
                  : 'Productos Seleccionados'}
              </Text>
            </Flex>
          </AccordionTrigger>
          {renderAcordionContent(
            cart.filter(
              item =>
                item.isScheduled == findScheduledProducts ||
                (item.isPack &&
                  item.packUnities?.some(unit =>
                    treatmentPacks.some(
                      pack =>
                        pack.id === unit.id &&
                        pack.isScheduled == findScheduledProducts
                    )
                  ))
            ),
            findScheduledProducts
          )}
        </AccordionItem>
      </Accordion>
    );
  };

  const renderAcordionContent = (
    cartItem: CartItem[],
    findScheduledProducts = false
  ) => {
    return (
      <AccordionContent>
        <div className="border-t border-hg-secondary300">
          <ul className="flex flex-col w-full">
            {cartItem.map(item => {
              return (
                <li
                  className={` ${
                    findScheduledProducts
                      ? ' bg-hg-green '
                      : ' bg-hg-primary300 '
                  } transition-all flex items-center hover:bg-hg-secondary300 p-4 cursor-pointer`}
                  key={item.title}
                >
                  <Text className="font-semibold w-1/4 shrink-0 ">
                    {item.title}
                  </Text>

                  {item.isScheduled || item.isPack ? (
                    <div className="w-full mr-2">
                      {item.isPack ? (
                        <>
                          {treatmentPacks
                            .filter(
                              pack =>
                                item.packUnities?.some(
                                  unit =>
                                    unit.id === pack.id &&
                                    pack.isScheduled == findScheduledProducts
                                )
                            )
                            .sort((a, b) => (a.type > b.type ? 1 : -1))
                            .map(pack => (
                              <>
                                {pack.isScheduled ? (
                                  <div className="flex gap-4 ">
                                    <Text className="flex-grow " key={pack.id}>
                                      {pack.treatmentName}
                                    </Text>
                                    <Text className="mr-auto">
                                      {pack.scheduledDate}
                                    </Text>
                                  </div>
                                ) : (
                                  <div className="flex gap-4 w-full">
                                    <Text
                                      className="flex-grow w-1/4"
                                      key={pack.id}
                                    >
                                      {UnityType[pack.type]}
                                    </Text>
                                    <Text className="mr-auto items-end">
                                      Pendiente
                                    </Text>
                                  </div>
                                )}
                              </>
                            ))}
                        </>
                      ) : (
                        <>{item.scheduledDate}</>
                      )}
                    </div>
                  ) : (
                    <Text className="w-1/4 mr-auto shrink-0">Pendiente</Text>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </AccordionContent>
    );
  };

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
                  <Flex layout="col-left" className="w-full">
                    {!isEmpty(dashboardProducts) && !isLoading ? (
                      <>
                        {cart.length > 0 && (
                          <>
                            {renderProductsDashboard(cart, true)}
                            {renderProductsDashboard(cart)}
                          </>
                        )}
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
