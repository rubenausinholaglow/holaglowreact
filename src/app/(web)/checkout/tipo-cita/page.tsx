'use client';

import { useEffect, useState } from 'react';
import { INITIAL_STATE } from '@utils/constants';
import { fetchProduct } from '@utils/fetch';
import useRoutes from '@utils/useRoutes';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgArrow, SvgRadioChecked, SvgUserScan } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { CartItem, Product } from 'app/types/product';
import { getDiscountedPrice } from 'app/utils/common';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function PVCitaMedica() {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { selectedPacksTreatments, selectedTreatments, setSelectedTreatments } =
    useSessionStore(state => state);
  const { cart, addItemToCart } = useCartStore(state => state);

  const [isLoading, setIsLoading] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState<null | []>(null);
  const [PVProduct, setPVProduct] = useState<Product | null>(null);

  useEffect(() => {
    const discountedPrices: any = [];
    if (selectedTreatments && !isEmpty(selectedTreatments)) {
      selectedTreatments.map(product => {
        const discountedPrice = getDiscountedPrice(product);

        if (discountedPrice && discountedPrice !== product.price) {
          discountedPrices.push(discountedPrice);
        }
      });
    }

    setDiscountedPrice(discountedPrices);
  }, [selectedTreatments]);

  useEffect(() => {
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId);

      if (productId === process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID) {
        setPVProduct(productDetails);
      }
    }

    if (process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID) {
      initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID);
    }
  }, []);

  async function initProductAdvance(productId: string) {
    const productDetails = await fetchProduct(productId);
    addItemToCart(productDetails as CartItem);
  }
  function handleClick(product: Product) {
    setIsLoading(true);
    setSelectedTreatments([product]);
    router.push(ROUTES.checkout.schedule);
  }

  function AdvanceProduct() {
    useCartStore.setState(INITIAL_STATE);
    setIsLoading(true);
    setSelectedTreatments(selectedTreatments);
    initProductAdvance(process.env.NEXT_PUBLIC_CITA_PREVIA_ID!);

    router.push(ROUTES.checkout.schedule);
  }

  return (
    <MainLayout isCheckout>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <Container className="mt-6 md:mt-16">
          <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
            <Flex layout="col-left" className="gap-6 w-full md:w-1/2">
              <Title className="font-semibold hidden md:block">
                ¿Qué tipo de cita quieres reservar?
              </Title>

              <Flex
                className="border border-hg-black300 p-4 rounded-2xl gap-4 w-full hover:bg-hg-secondary100 cursor-pointer"
                onClick={() => handleClick(PVProduct as Product)}
              >
                <SvgUserScan className="shrink-0" />
                <div>
                  <Text className="font-semibold">Asesoramiento</Text>
                  <Text className="text-xs">
                    Te asesoramos con el escáner facial 3D
                  </Text>
                </div>

                <Flex className="gap-2 ml-auto">
                  <Text className="text-hg-secondary text-lg font-semibold">
                    Gratis
                  </Text>
                  <SvgArrow />
                </Flex>
              </Flex>

              <Flex
                className="border border-hg-black300 p-4 rounded-2xl gap-4 w-full hover:bg-hg-secondary100 cursor-pointer"
                onClick={() => AdvanceProduct()}
              >
                <SvgHolaglowHand height={34} width={34} className="shrink-0" />
                <div>
                  <Text className="font-semibold">Tratamiento</Text>
                  <Text className="text-xs">
                    Te aplicamos el tratamiento seleccionado
                  </Text>
                </div>

                <Flex className="gap-2 ml-auto">
                  <Text className="text-hg-secondary text-lg font-semibold shrink-0 text-right">
                    Anticipo <br className="md:hidden" /> 49€
                  </Text>
                  <SvgArrow />
                </Flex>
              </Flex>
            </Flex>
            <Flex layout="col-left" className="gap-6 w-full md:w-1/2">
              <Title className="font-semibold hidden md:block">
                Detalle de tu pedido
              </Title>

              {Array.isArray(selectedTreatments) &&
                selectedTreatments.map((product, index) => (
                  <Flex
                    layout="col-left"
                    className="w-full bg-hg-secondary100 p-3 gap-3 rounded-xl mb-12"
                    key={product.id}
                  >
                    <Flex layout="row-between" className="items-start w-full">
                      <div>
                        <Text className="font-semibold text-left mb-2">
                          {product.title}
                        </Text>

                        {product.isPack ? (
                          <ul className="p-1">
                            {selectedPacksTreatments &&
                              selectedPacksTreatments.map(item => {
                                return <li key={item.title}>- {item.title}</li>;
                              })}
                          </ul>
                        ) : !isEmpty(product.appliedProducts) ? (
                          product.appliedProducts.map(item => {
                            const iconName =
                              item.icon.split('/')[0] || 'SvgCross';
                            const iconFamily:
                              | 'default'
                              | 'category'
                              | 'suggestion'
                              | 'service' =
                              (item.icon.split('/')[1] as 'default') ||
                              'default';

                            return (
                              <Flex
                                key={item.titlte}
                                className="items-start mb-2"
                              >
                                <DynamicIcon
                                  height={16}
                                  width={16}
                                  className="mr-2 mt-0.5 text-hg-secondary shrink-0"
                                  name={iconName}
                                  family={iconFamily}
                                />

                                <Text>{item.titlte}</Text>
                              </Flex>
                            );
                          })
                        ) : (
                          <Flex className="items-start mb-2">
                            <Text>{product.description}</Text>
                          </Flex>
                        )}
                      </div>
                      <SvgRadioChecked
                        className="mt-[2px] shrink-0"
                        height={24}
                        width={24}
                      />
                    </Flex>
                    <div>
                      {discountedPrice && discountedPrice.length > 0 && (
                        <Text className="line-through text-hg-black500">
                          {product.price} €
                        </Text>
                      )}
                      <Text className=" text-hg-secondary font-semibold text-2xl">
                        {discountedPrice && discountedPrice.length > 0
                          ? discountedPrice[index]
                          : product.price}{' '}
                        €
                      </Text>
                    </div>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        </Container>
      )}
    </MainLayout>
  );
}