'use client';

import { useEffect, useState } from 'react';
import { fetchProduct } from '@utils/fetch';
import useRoutes from '@utils/useRoutes';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgHolaglowHand } from 'app/icons/Icons';
import { SvgArrow, SvgRadioChecked, SvgUserScan } from 'app/icons/IconsDs';
import { useSessionStore } from 'app/stores/globalStore';
import { Product } from 'app/types/product';
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

  function handleClick(product: Product) {
    setIsLoading(true);
    setSelectedTreatments([product]);

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
                onClick={() => router.push(ROUTES.checkout.schedule)}
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
          </Flex>
        </Container>
      )}
    </MainLayout>
  );
}
