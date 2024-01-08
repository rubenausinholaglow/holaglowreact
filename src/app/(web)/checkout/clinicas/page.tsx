'use client';

import { useEffect, useState } from 'react';
import DynamicIcon from 'app/(web)/components/common/DynamicIcon';
import MainLayout from 'app/(web)/components/layout/MainLayout';
import { SvgCar, SvgRadioChecked } from 'app/icons/IconsDs';
import {
  useGlobalPersistedStore,
  useSessionStore,
} from 'app/stores/globalStore';
import { Clinic } from 'app/types/clinic';
import { getDiscountedPrice } from 'app/utils/common';
import useRoutes from 'app/utils/useRoutes';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';

export default function ClinicsCheckout() {
  const router = useRouter();
  const ROUTES = useRoutes();

  const { clinics } = useGlobalPersistedStore(state => state);
  const {
    selectedClinic,
    setSelectedClinic,
    selectedPacksTreatments,
    selectedTreatments,
  } = useSessionStore(state => state);

  const [discountedPrice, setDiscountedPrice] = useState<null | []>(null);

  useEffect(() => {
    if (selectedClinic) {
      setSelectedClinic(undefined);
    }
  }, []);

  const selectClinic = (clinic: Clinic) => {
    setSelectedClinic(clinic);
    let redirect = ROUTES.checkout.type;
    if (
      selectedTreatments &&
      !isEmpty(selectedTreatments) &&
      selectedTreatments[0].id ===
        process.env.NEXT_PUBLIC_PROBADOR_VIRTUAL_ID?.toLowerCase()
    ) {
      redirect = ROUTES.checkout.schedule;
    }
    router.push(redirect);
  };

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

  return (
    <MainLayout isCheckout>
      <Container className="mt-6 md:mt-16">
        <Flex layout="col-left" className="gap-8 md:gap-16 md:flex-row">
          {!isEmpty(selectedTreatments) && (
            <Flex
              layout="col-left"
              className="gap-4 w-full md:w-1/2 md:order-2"
            >
              <Title className="font-semibold hidden md:block">
                Detalle de tu pedido
              </Title>

              {Array.isArray(selectedTreatments) &&
                selectedTreatments.map(
                  (product, index) =>
                    product && (
                      <Flex
                        layout="col-left"
                        className="w-full bg-hg-secondary100 p-3 gap-3 rounded-xl mb-12"
                        key={product.id}
                      >
                        <Flex
                          layout="row-between"
                          className="items-start w-full"
                        >
                          <div>
                            <Text className="font-semibold text-left mb-2">
                              {product.title}
                            </Text>

                            {product.isPack ? (
                              <ul className="p-1">
                                {selectedPacksTreatments &&
                                  selectedPacksTreatments.map(item => {
                                    return (
                                      <li key={item.title}>- {item.title}</li>
                                    );
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
                    )
                )}
            </Flex>
          )}

          <Flex layout="col-left" className="gap-4 w-full md:w-1/2">
            <Title className="font-semibold">Selecciona tu clínica</Title>

            {clinics.map((clinic, index) => (
              <Flex
                layout="row-center"
                className={`transition-all w-full justify-between p-3 cursor-pointer rounded-xl ${
                  selectedClinic && selectedClinic.city === clinic.city
                    ? 'bg-hg-secondary100'
                    : 'bg-hg-black50'
                } `}
                key={clinic.city}
                onClick={() => selectClinic(clinics[index])}
              >
                <Flex layout="col-left">
                  <Text size="lg" className="font-semibold mb-2">
                    {clinic.city}
                  </Text>
                  <address className="not-italic mb-2 text-xs">
                    {clinic.address}
                  </address>
                </Flex>
                {selectedClinic && selectedClinic.city === clinic.city ? (
                  <SvgRadioChecked
                    height={24}
                    width={24}
                    className="shrink-0 ml-4"
                  />
                ) : (
                  <div className="border border-hg-black h-[24px] w-[24px] rounded-full shrink-0 ml-4"></div>
                )}
              </Flex>
            ))}
            <Flex
              layout="row-left"
              className="bg-hg-primary100 p-6 gap-3 rounded-t-2xl md:rounded-2xl w-full items-start relative bottom-0 left-0 right-0 md:relative"
            >
              <div className="bg-hg-primary p-3 rounded-full">
                <SvgCar height={16} width={16} />
              </div>
              <div>
                <Text size="sm" className="font-semibold mb-2">
                  Parking Gratis
                </Text>
                <Text className="text-left" size="xs">
                  Te pagamos el parking para que tú disfrutes al máximo de la
                  experiencia
                </Text>
              </div>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </MainLayout>
  );
}
