'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { DERMA_PRODUCTS } from 'app/(web)/(derma)/planes/mockedData';
import { SvgCross, SvgMoon, SvgSun } from 'app/icons/IconsDs';
import { useGlobalStore } from 'app/stores/globalStore';
import { Button } from 'designSystem/Buttons/Buttons';
import CarouselImage from 'designSystem/CarouselImage/CarouselImage';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Modal2 } from 'designSystem/Modals/Modal';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function BenefitsApplicationResultsDerma({
  className = '',
}: {
  className?: string;
}) {
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [modalProduct, setModalProduct] = useState(99);

  const { showModalBackground } = useGlobalStore(state => state);

  useEffect(() => {
    setShowModalProduct(showModalBackground);
  }, [showModalBackground]);

  return (
    <>
      <Modal2
        isVisible={showModalProduct && modalProduct < 5}
        width={isMobile ? 'w-full' : 'max-w-[500px]'}
        className="shadow-none"
        type="right"
        hideModalBackground
      >
        <div className="bg-white relative min-h-screen">
          <SvgCross
            height={20}
            width={20}
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              setShowModalProduct(false);
              setModalProduct(99);
            }}
          />
          {modalProduct < 5 && (
            <div className="pt-12">
              <CarouselImage
                images={DERMA_PRODUCTS[modalProduct].carouselImg}
                format="aspect-[3/2]"
              />
              <Container className="md:p-6">
                <Image
                  src={DERMA_PRODUCTS[modalProduct].img}
                  alt={DERMA_PRODUCTS[modalProduct].title}
                  width={324}
                  height={396}
                  className="w-2/3 md:w-1/2 shrink-0 mx-auto mb-8"
                />

                <Text className="font-semibold mb-2">
                  {DERMA_PRODUCTS[modalProduct].title}
                </Text>
                <Text className="text-sm mb-4">
                  {DERMA_PRODUCTS[modalProduct].subTitle}
                </Text>
                <Text className="text-hg-black500 text-sm mb-4">
                  {DERMA_PRODUCTS[modalProduct].text}
                </Text>
                {DERMA_PRODUCTS[modalProduct].info.length > 0 && (
                  <Text className="p-4 bg-derma-primary300/20 rounded-xl text-sm text-hg-black500 mb-8">
                    <span className="font-semibold">Activos principales: </span>
                    {DERMA_PRODUCTS[modalProduct].info}
                  </Text>
                )}

                <Button
                  size="lg"
                  type="dermaDark"
                  onClick={() => {
                    setShowModalProduct(false);
                    setModalProduct(99);
                  }}
                >
                  Cerrar
                </Button>
              </Container>
            </div>
          )}
        </div>
      </Modal2>

      <div className={`py-12 bg-derma-primary100 ${className}`}>
        <Container>
          <Title
            isAnimated
            size="2xl"
            className="mb-6 md:mb-8 text-derma-primary"
          >
            Una rutina minimalista
          </Title>
          <Text className="text-hg-black500 mb-8 md:text-lg">
            Lo que tu piel necesita. Nada más. Nada menos.
          </Text>

          <ul className="flex flex-col gap-4 md:gap-8 w-full md:grid md:grid-cols-2">
            {DERMA_PRODUCTS.map((item, index) => {
              if (index < 3) {
                return (
                  <Flex
                    key={item.title}
                    layout="row-left"
                    className="bg-white p-4 rounded-2xl gap-4 items-start w-full"
                  >
                    <Image
                      src={item.img}
                      height={248}
                      width={184}
                      alt={item.title}
                      className="w-1/4 md:w-1/5 mx-auto mb-4 shrink-0"
                    />
                    <Flex layout="col-left" className="w-full gap-2">
                      <Flex layout="row-between" className="w-full text-xs">
                        <Text className="text-hg-black500">
                          Paso {index + 1}
                        </Text>
                        <Flex className="gap-1 py-1 px-2 rounded-full bg-derma-primary300/20 text-derma-primary">
                          <SvgSun className="w-4 h-4" />
                          <span>Día</span>
                          {item.isNightRoutine && (
                            <>
                              <span>/</span>
                              <span>Noche</span>
                              <SvgMoon className="w-4 h-4" />
                            </>
                          )}
                        </Flex>
                      </Flex>
                      <Text className="font-semibold text-sm md:text-md">
                        {item.title}
                      </Text>
                      <Text className="text-sm md:text-md mb-2">
                        {item.toggle}
                      </Text>
                      <Button
                        type="whiteDerma"
                        size="sm"
                        customStyles="border-derma-primary text-derma-primary"
                        onClick={() => {
                          setModalProduct(index);
                          setShowModalProduct(true);
                        }}
                      >
                        Saber más
                      </Button>
                    </Flex>
                  </Flex>
                );
              }

              if (index === 3) {
                return (
                  <Flex
                    key={item.title}
                    layout="row-left"
                    className="bg-white p-4 rounded-2xl gap-4 items-start w-full"
                  >
                    <Flex layout="col-center" className="w-full gap-2">
                      <Flex layout="row-between" className="w-full text-xs">
                        <Text className="text-hg-black500">
                          Paso {index + 1}
                        </Text>
                        <Flex className="gap-1 py-1 px-2 rounded-full bg-derma-primary300/20 text-derma-primary">
                          <SvgSun className="w-4 h-4" />
                          <span>Día</span>
                          {item.isNightRoutine && (
                            <>
                              <span>/</span>
                              <span>Noche</span>
                              <SvgMoon className="w-4 h-4" />
                            </>
                          )}
                        </Flex>
                      </Flex>
                      <Image
                        src={item.img}
                        height={248}
                        width={184}
                        alt={item.title}
                        className="w-3/5  mb-4 shrink-0"
                      />
                      <Text className="font-semibold text-sm md:text-md">
                        {item.title}
                      </Text>
                      <Text className="text-sm md:text-md mb-2">
                        {item.toggle}
                      </Text>
                      <Button
                        type="whiteDerma"
                        size="sm"
                        customStyles="border-derma-primary text-derma-primary"
                        onClick={() => {
                          setModalProduct(index);
                          setShowModalProduct(true);
                        }}
                      >
                        Saber más
                      </Button>
                    </Flex>
                  </Flex>
                );
              }
            })}
          </ul>
        </Container>
      </div>
    </>
  );
}
