'use client';

import { useEffect, useState } from 'react';
import { INITIAL_STATE } from '@utils/constants';
import { fetchProduct } from '@utils/fetch';
import useRoutes from '@utils/useRoutes';
import { useCartStore } from 'app/(dashboard)/dashboard/(pages)/budgets/stores/userCartStore';
import FullScreenLoading from 'app/(web)/components/common/FullScreenLayout';
import App from 'app/(web)/components/layout/App';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgArrow } from 'app/icons/IconsDs';
import { TypeOfPayment, useSessionStore } from 'app/stores/globalStore';
import { CartItem, Product } from 'app/types/product';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function PVCitaMedica() {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { addItemToCart } = useCartStore(state => state);
  const {
    selectedTreatments,
    setSelectedTreatments,
    setTypeOfPayment,
    setSelectedPack,
    previousSelectedTreatments,
    setPreviousSelectedTreatments,
  } = useSessionStore(state => state);

  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [PVProduct, setPVProduct] = useState<Product | null>(null);

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
    if (product) {
      if (!isEmpty(selectedTreatments))
        setPreviousSelectedTreatments(selectedTreatments);
      setIsLoading(true);
      setSelectedTreatments([product]);
      if (product.isPack) setSelectedPack(product);
      else setSelectedPack(undefined);
      setTypeOfPayment(TypeOfPayment.Free);
      router.push(ROUTES.checkout.clinics);
    }
  }

  async function AdvanceProduct() {
    useCartStore.setState(INITIAL_STATE);
    setIsLoading(true);
    setSelectedTreatments(selectedTreatments);
    await initProductAdvance(process.env.NEXT_PUBLIC_CITA_PREVIA_ID!);

    setTypeOfPayment(TypeOfPayment.Reservation);
    if (!isEmpty(previousSelectedTreatments)) {
      setSelectedTreatments(previousSelectedTreatments);
      router.push(ROUTES.checkout.clinics);
    } else {
      isEmpty(selectedTreatments)
        ? router.push(ROUTES.checkout.treatments)
        : router.push(ROUTES.checkout.clinics);
    }
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
                <Title size="xldr" className="font-light">
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
