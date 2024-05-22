'use client';

import { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Accordion, AccordionItem } from '@radix-ui/react-accordion';
import { DERMA_PRODUCTS } from 'app/(web)/(derma)/planes/mockedData';
import { poppins } from 'app/fonts';
import {
  SvgAdd,
  SvgCheckCircle,
  SvgCross,
  SvgMinus,
  SvgMoon,
  SvgSun,
} from 'app/icons/IconsDs';
import { useGlobalStore } from 'app/stores/globalStore';
import {
  AccordionContent,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import CarouselImage from 'designSystem/CarouselImage/CarouselImage';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'designSystem/Dialog/Dialog';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function BenefitsApplicationResultsDerma({
  className = '',
}: {
  className?: string;
}) {
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [modalProduct, setModalProduct] = useState(99);

  const { setIsModalOpen, showModalBackground } = useGlobalStore(
    state => state
  );

  useEffect(() => {
    setShowModalProduct(showModalBackground);
  }, [showModalBackground]);

  return (
    <>
      {/* <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <div className="bg-derma-secondary300 relative min-h-screen">
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
                <Container className="py-4 md:p-6">
                  <Flex className="gap-1 py-1 px-2 rounded-full bg-derma-primary300/20 text-derma-primary inline-flex text-sm mb-4">
                    <SvgSun className="w-4 h-4" />
                    <span>Día</span>
                    {DERMA_PRODUCTS[modalProduct].isNightRoutine && (
                      <>
                        <span>/</span>
                        <SvgMoon className="w-4 h-4" />
                        <span>Noche</span>
                      </>
                    )}
                  </Flex>

                  <Text className="font-gtUltra mb-2 text-xl">
                    {DERMA_PRODUCTS[modalProduct].title}
                  </Text>
                  <Text className="text-sm mb-4">
                    {DERMA_PRODUCTS[modalProduct].subTitle}
                  </Text>
                  <Text className="text-hg-black500 mb-6 pb-6 border-b border-hg-black500">
                    {DERMA_PRODUCTS[modalProduct].text}
                  </Text>

                  <Text className="text-lg font-semibold mb-4">Beneficios</Text>
                  <ul className="flex flex-col gap-4 w-full mb-8">
                    {DERMA_PRODUCTS[modalProduct].benefits.map(
                      (benefit, index) => {
                        return (
                          <li
                            className="flex gap-3 items-start justify-start w-full"
                            key={index}
                          >
                            <SvgCheckCircle className="shrink-0 w-6 h-6 text-derma-primary500 mt-1" />
                            <Text className="text-hg-black500">{benefit}</Text>
                          </li>
                        );
                      }
                    )}
                  </ul>

                  <Accordion
                    className="mt-8"
                    type="single"
                    defaultValue="1"
                    collapsible
                  >
                    <AccordionItem
                      value="1"
                      className="rounded-2xl overflow-hidden bg-derma-secondary300 mb-4"
                    >
                      <AccordionTrigger className="flex items-center justify-between w-full p-4 bg-derma-secondary500 relative">
                        <Text className="text-lg font-semibold">
                          Modo de empleo
                        </Text>
                        <SvgMinus className="transition-opacity opacity-1 group-data-[state=closed]:opacity-0 group-data-[state=closed]:duration-200 absolute top-4 right-4" />
                        <SvgAdd className="transition-opacity opacity-1 group-data-[state=open]:opacity-0 group-data-[state=open]:duration-200 absolute top-4 right-4" />
                      </AccordionTrigger>
                      <AccordionContent className="p-4 bg-derma-secondary400 text-sm text-hg-black500">
                        <ul className="flex flex-col gap-6 w-full">
                          {DERMA_PRODUCTS[modalProduct].useMethod.map(
                            (benefit, index) => {
                              return (
                                <li
                                  className="flex gap-3 items-start justify-start w-full"
                                  key={index}
                                >
                                  <Flex className="justify-center items-center rounded-full shrink-0 w-7 h-7 bg-white text-derma-primary500 -mt-1 font-bold">
                                    {index + 1}
                                  </Flex>
                                  <Text className="text-hg-black500">
                                    {benefit}
                                  </Text>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem
                      value="2"
                      className="rounded-2xl overflow-hidden bg-derma-secondary300"
                    >
                      <AccordionTrigger className="flex items-center justify-between w-full p-4 bg-derma-secondary500 relative">
                        <Text className="text-lg font-semibold">
                          Ingredientes activos
                        </Text>
                        <SvgMinus className="transition-opacity opacity-1 group-data-[state=closed]:opacity-0 group-data-[state=closed]:duration-200 absolute top-4 right-4" />
                        <SvgAdd className="transition-opacity opacity-1 group-data-[state=open]:opacity-0 group-data-[state=open]:duration-200 absolute top-4 right-4" />
                      </AccordionTrigger>
                      <AccordionContent className="p-4 bg-derma-secondary400 text-sm text-hg-black500">
                        {DERMA_PRODUCTS[modalProduct].info}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Container>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal> */}

      {/*       <Modal2
        isVisible={showModalProduct && modalProduct < 5}
        width={isMobile ? 'w-full' : 'max-w-[500px]'}
        className=""
        type="right"
      >
        <div className="bg-derma-secondary300 relative min-h-screen">
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
              <Container className="py-4 md:p-6">
                <Flex className="gap-1 py-1 px-2 rounded-full bg-derma-primary300/20 text-derma-primary inline-flex text-sm mb-4">
                  <SvgSun className="w-4 h-4" />
                  <span>Día</span>
                  {DERMA_PRODUCTS[modalProduct].isNightRoutine && (
                    <>
                      <span>/</span>
                      <SvgMoon className="w-4 h-4" />
                      <span>Noche</span>
                    </>
                  )}
                </Flex>

                <Text className="font-gtUltra mb-2 text-xl">
                  {DERMA_PRODUCTS[modalProduct].title}
                </Text>
                <Text className="text-sm mb-4">
                  {DERMA_PRODUCTS[modalProduct].subTitle}
                </Text>
                <Text className="text-hg-black500 mb-6 pb-6 border-b border-hg-black500">
                  {DERMA_PRODUCTS[modalProduct].text}
                </Text>

                <Text className="text-lg font-semibold mb-4">Beneficios</Text>
                <ul className="flex flex-col gap-4 w-full mb-8">
                  {DERMA_PRODUCTS[modalProduct].benefits.map(
                    (benefit, index) => {
                      return (
                        <li
                          className="flex gap-3 items-start justify-start w-full"
                          key={index}
                        >
                          <SvgCheckCircle className="shrink-0 w-6 h-6 text-derma-primary500 mt-1" />
                          <Text className="text-hg-black500">{benefit}</Text>
                        </li>
                      );
                    }
                  )}
                </ul>

                <Accordion
                  className="mt-8"
                  type="single"
                  defaultValue="1"
                  collapsible
                >
                  <AccordionItem
                    value="1"
                    className="rounded-2xl overflow-hidden bg-derma-secondary300 mb-4"
                  >
                    <AccordionTrigger className="flex items-center justify-between w-full p-4 bg-derma-secondary500 relative">
                      <Text className="text-lg font-semibold">
                        Modo de empleo
                      </Text>
                      <SvgMinus className="transition-opacity opacity-1 group-data-[state=closed]:opacity-0 group-data-[state=closed]:duration-200 absolute top-4 right-4" />
                      <SvgAdd className="transition-opacity opacity-1 group-data-[state=open]:opacity-0 group-data-[state=open]:duration-200 absolute top-4 right-4" />
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-derma-secondary400 text-sm text-hg-black500">
                      <ul className="flex flex-col gap-6 w-full">
                        {DERMA_PRODUCTS[modalProduct].useMethod.map(
                          (benefit, index) => {
                            return (
                              <li
                                className="flex gap-3 items-start justify-start w-full"
                                key={index}
                              >
                                <Flex className="justify-center items-center rounded-full shrink-0 w-7 h-7 bg-white text-derma-primary500 -mt-1 font-bold">
                                  {index + 1}
                                </Flex>
                                <Text className="text-hg-black500">
                                  {benefit}
                                </Text>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="2"
                    className="rounded-2xl overflow-hidden bg-derma-secondary300"
                  >
                    <AccordionTrigger className="flex items-center justify-between w-full p-4 bg-derma-secondary500 relative">
                      <Text className="text-lg font-semibold">
                        Ingredientes activos
                      </Text>
                      <SvgMinus className="transition-opacity opacity-1 group-data-[state=closed]:opacity-0 group-data-[state=closed]:duration-200 absolute top-4 right-4" />
                      <SvgAdd className="transition-opacity opacity-1 group-data-[state=open]:opacity-0 group-data-[state=open]:duration-200 absolute top-4 right-4" />
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-derma-secondary400 text-sm text-hg-black500">
                      {DERMA_PRODUCTS[modalProduct].info}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Container>
            </div>
          )}
        </div>
      </Modal2> */}

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
