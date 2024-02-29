'use client';

import { useEffect, useState } from 'react';
import { INITIAL_STATE } from '@utils/constants';
import { fetchProduct } from '@utils/fetch';
import useRoutes from '@utils/useRoutes';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgArrow, SvgRadioChecked } from 'app/icons/IconsDs';
import { TypeOfPayment, useSessionStore } from 'app/stores/globalStore';
import { CartItem, Product } from 'app/types/product';
import { getDiscountedPrice } from 'app/utils/common';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function PVCitaMedica() {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { addItemToCart } = useCartStore(state => state);
  const {
    selectedPacksTreatments,
    selectedTreatments,
    setSelectedTreatments,
    setTypeOfPayment,
  } = useSessionStore(state => state);

  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [PVProduct, setPVProduct] = useState<Product | null>(null);
  const [discountedPrice, setDiscountedPrice] = useState<null | []>(null);

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
    setIsHydrated(true);
  }, [selectedTreatments]);

  useEffect(() => {
    async function initProduct(productId: string) {
      const productDetails = await fetchProduct(productId, false, false);

      if (productId === process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID) {
        setPVProduct(productDetails);
        setIsHydrated(true);
      }
    }

    if (process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID) {
      initProduct(process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID);
    }
  }, []);

  useEffect(() => {
    if (
      !isEmpty(selectedTreatments) &&
      process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID &&
      selectedTreatments[0].id ===
        process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID.toLowerCase()
    ) {
      setSelectedTreatments([]);
      setIsHydrated(true);
    }
  }, []);

  async function initProductAdvance(productId: string) {
    const productDetails = await fetchProduct(productId, false, false);
    addItemToCart(productDetails as CartItem);
  }

  function handleClick(product: Product) {
    setIsLoading(true);
    setSelectedTreatments([product]);
    setTypeOfPayment(TypeOfPayment.Free);
    router.push(ROUTES.checkout.clinics);
  }

  async function AdvanceProduct() {
    useCartStore.setState(INITIAL_STATE);
    setIsLoading(true);
    setSelectedTreatments(selectedTreatments);
    await initProductAdvance(process.env.NEXT_PUBLIC_CITA_PREVIA_ID!);

    setTypeOfPayment(TypeOfPayment.Reservation);
    isEmpty(selectedTreatments)
      ? router.push(ROUTES.checkout.treatments)
      : router.push(ROUTES.checkout.clinics);
  }

  if (!isHydrated) {
    return <></>;
  }

  return (
    <App>
      <MainLayout isCheckout>
        {isLoading ? (
          <FullScreenLoading />
        ) : (
          <Container className="mt-6 md:mt-16">
            <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
              <Flex layout="col-left" className="gap-6 w-full md:w-1/2">
                <Title className="font-semibold md:block">
                  ¿Qué tipo de cita quieres reservar?
                </Title>

                <Flex
                  className="border border-hg-black300 p-4 rounded-2xl gap-4 w-full hover:bg-hg-secondary100 cursor-pointer"
                  onClick={() => handleClick(PVProduct as Product)}
                >
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
                  onClick={async () => await AdvanceProduct()}
                >
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
            </Flex>
          </Container>
        )}
      </MainLayout>
    </App>
  );
}
