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
import UserService from '@services/UserService';
import { fetchClinics } from '@utils/fetch';
import useRoutes from '@utils/useRoutes';
import { getClinicToSet, validTypesFilterCart } from '@utils/utils';
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
import { isEmpty } from 'lodash';
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
    setCurrentUser,
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
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const flowwwToken = params.get('flowwwToken');
    if (flowwwToken) {
      UserService.getUserById(flowwwToken, false).then(x => {
        setCurrentUser(x);
      });
    }
  }, []);

  useEffect(() => {
    async function initClinics() {
      const clinics = await fetchClinics();

      setClinics(clinics);
    }

    if (isEmpty(clinics)) {
      initClinics();
    }
    if (isEmpty(selectedClinic)) {
      setSelectedClinic(getClinicToSet(clinics, storedClinicId));
    }
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
            if (product.isPack || product.sessions > 1) {
              setPackInProductCart(true);
              const packs = addProductUnitiesPack(product);
              packsToAdd.push(...packs);
            }
          }
        });
      });
      if (
        packsToAdd.length == 0 ||
        cart.find(x => x.sessions > 1 && !x.isPack)
      ) {
        cart.map(cartItem => {
          if (cartItem.sessions > 1 && !cartItem.isPack) {
            const packs = addProductUnitiesPack(cartItem);
            packsToAdd.push(...packs);
          }
        });
      }
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
    if (product.sessions > 1 && !product.isPack) {
      for (let i = 0; i < product.sessions; i++) {
        packsToAdd.push({
          uniqueId: createUniqueId(),
          id: createUniqueId(),
          type: product.unityType,
          isScheduled: false,
          productId: product.id,
        });
      }
    }
    product.packUnities?.forEach(x => {
      const pack: PackUnitiesScheduled = {
        uniqueId: createUniqueId(),
        id: x.id,
        type: x.type,
        isScheduled: false,
        productId: product.id,
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
                (item.isScheduled == findScheduledProducts && !item.isPack) ||
                (item.isPack &&
                  item.packUnities?.some(unit =>
                    treatmentPacks.some(
                      pack =>
                        pack.id.toLocaleUpperCase() ===
                          unit.id.toLocaleUpperCase() &&
                        pack.productId == item.id &&
                        pack.isScheduled == findScheduledProducts
                    )
                  )) ||
                (item.sessions > 1 &&
                  treatmentPacks.some(
                    pack =>
                      pack.productId == item.id &&
                      pack.isScheduled == findScheduledProducts
                  ))
            ),
            findScheduledProducts
          )}
        </AccordionItem>
      </Accordion>
    );
  };

  const renderPack = (item: CartItem, findScheduledProducts = false) => {
    return (
      <>
        {treatmentPacks
          .filter(
            pack =>
              pack.isScheduled == findScheduledProducts &&
              pack.productId == item.id
          )
          .sort((a, b) => (a.type > b.type ? 1 : -1))
          .map(pack => (
            <>
              {pack.isScheduled ? (
                <div className="flex gap-4 ">
                  <Text className="flex-grow text-center" key={pack.id}>
                    {pack.treatmentName}
                  </Text>

                  <Text className="">{pack.scheduledDate?.split(' ')[0]}</Text>
                  <Text className="">{pack.scheduledDate?.split(' ')[1]}</Text>
                </div>
              ) : (
                <div className="gap-4 w-full">
                  <Text className="text-center mr-44" key={pack.id}>
                    {UnityType[pack.type]}
                  </Text>
                </div>
              )}
            </>
          ))}
      </>
    );
  };

  const renderSesssions = (item: CartItem, findScheduledProducts = false) => {
    return (
      <>
        {treatmentPacks
          .filter(
            pack =>
              pack.isScheduled == findScheduledProducts &&
              pack.productId == item.id
          )
          .sort((a, b) => (a.type > b.type ? 1 : -1))
          .map(pack => (
            <>
              {pack.isScheduled ? (
                <div className="flex gap-4 ">
                  <Text className="flex-grow text-center" key={pack.id}>
                    {pack.treatmentName}
                  </Text>

                  <Text className="">{pack.scheduledDate?.split(' ')[0]}</Text>
                  <Text className="">{pack.scheduledDate?.split(' ')[1]}</Text>
                </div>
              ) : (
                <div className="gap-4 w-full">
                  <Text className="text-center mr-44" key={pack.id}>
                    {item.title}
                  </Text>
                </div>
              )}
            </>
          ))}
      </>
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
            {cartItem
              .filter(item => validTypesFilterCart.includes(item.type))
              .map(item => {
                return (
                  <li
                    className={` ${
                      findScheduledProducts
                        ? ' bg-hg-green '
                        : ' bg-hg-primary300 '
                    } transition-all flex items-center p-4 cursor-pointer`}
                    key={item.title}
                  >
                    <Text className="font-semibold w-1/4 shrink-0 ">
                      {item.title}
                    </Text>

                    <div className="w-full mr-2">
                      {item.isPack && (
                        <>{renderPack(item, findScheduledProducts)}</>
                      )}
                      {!item.isPack && item.sessions > 1 && (
                        <>{renderSesssions(item, findScheduledProducts)}</>
                      )}

                      {!item.isPack && item.sessions <= 1 && (
                        <div className="text-right mr-2 items-end w-full">
                          {item.scheduledDate}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </AccordionContent>
    );
  };

  return (
    <MainLayout isDashboard>
      <Container className="mt-4">
        {!isLoading && (
          <>
            {!selectedClinic && (
              <>
                <Title className="font-semibold mb-8">Selecciona clínica</Title>

                <CheckoutClinicSelector isDashboard className="mb-8" />
              </>
            )}

            {selectedClinic && (
              <>
                <Title className="font-semibold mb-8">
                  {cart.length == 0 ? 'Selecciona tratamiento' : 'Tratamientos'}
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
  );
}
