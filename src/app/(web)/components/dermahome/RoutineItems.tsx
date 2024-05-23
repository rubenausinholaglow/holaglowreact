'use client';

import { useState } from 'react';
import { Accordion } from '@radix-ui/react-accordion';
import CheckHydration from '@utils/CheckHydration';
import { DERMA_INGREDIENTS } from 'app/(web)/(derma)/multistep/multistepConfig';
import { DERMA_GENERIC_PRODUCTS } from 'app/(web)/(derma)/planes/mockedData';
import {
  SvgAdd,
  SvgCheckCircle,
  SvgMinus,
  SvgMoon,
  SvgSun,
} from 'app/icons/IconsDs';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'designSystem/Accordion/Accordion';
import { Button } from 'designSystem/Buttons/Buttons';
import Carousel from 'designSystem/Carousel/Carousel';
import CarouselImage from 'designSystem/CarouselImage/CarouselImage';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'designSystem/Dialog/Dialog';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function RoutineItems({
  hideDefaultItems = false,
  hideCremaFormulada = false,
  pain,
}: {
  hideDefaultItems?: boolean;
  hideCremaFormulada?: boolean;
  pain?: number;
}) {
  const [modalProduct, setModalProduct] = useState(99);

  console.log(pain);

  return (
    <CheckHydration>
      <Dialog>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          <div
            className={`flex flex-col gap-4 md:gap-8 w-full ${
              hideCremaFormulada ? 'md:flex-row' : 'md:w-1/2'
            }
            ${hideDefaultItems ? 'hidden' : ''}
            `}
          >
            {DERMA_GENERIC_PRODUCTS.map((item, index) => {
              if (index < 3 && !hideDefaultItems) {
                return (
                  <Flex
                    key={item.title}
                    layout="row-left"
                    className="bg-white border border-derma-secondary500 p-4 rounded-2xl gap-4 items-start w-full"
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
                        {item.title}{' '}
                        {pain !== undefined && index === 1 && 'específica'}
                      </Text>
                      <Text className="text-sm md:text-md mb-2">
                        {item.toggle}
                      </Text>
                      <DialogTrigger>
                        <Button
                          type="whiteDerma"
                          size="sm"
                          customStyles="border-derma-primary text-derma-primary"
                          onClick={() => {
                            setModalProduct(index);
                          }}
                        >
                          Saber más
                        </Button>
                      </DialogTrigger>
                    </Flex>
                  </Flex>
                );
              }
            })}
          </div>

          {DERMA_GENERIC_PRODUCTS.map((item, index) => {
            if (index === 3 && !hideCremaFormulada) {
              return (
                <Flex
                  key={item.title}
                  layout="row-left"
                  className={`bg-white border-derma-secondary500 p-4 rounded-2xl gap-4 items-start ${
                    hideDefaultItems ? 'w-full' : 'md:w-1/2'
                  }`}
                >
                  <Flex layout="col-center" className="w-full h-full gap-2 ">
                    <Flex
                      layout="row-between"
                      className="w-full text-xs md:mb-12"
                    >
                      <Text className="text-hg-black500 ">
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

                    <DialogTrigger>
                      <Button
                        type="whiteDerma"
                        size="sm"
                        customStyles="border-derma-primary text-derma-primary"
                        onClick={() => {
                          setModalProduct(3);
                        }}
                      >
                        Saber más
                      </Button>
                    </DialogTrigger>
                  </Flex>
                </Flex>
              );
            }
          })}
        </div>
        <DialogContent className="w-full max-w-[500px] bg-derma-secondary300">
          {modalProduct < 5 && (
            <div className="pt-12">
              <CarouselImage
                images={DERMA_GENERIC_PRODUCTS[modalProduct].carouselImg}
                format="aspect-[3/2]"
              />
              <Container className="py-4 md:p-6">
                <Flex className="gap-1 py-1 px-2 rounded-full bg-derma-primary300/20 text-derma-primary inline-flex text-sm mb-4">
                  <SvgSun className="w-4 h-4" />
                  <span>Día</span>
                  {DERMA_GENERIC_PRODUCTS[modalProduct].isNightRoutine && (
                    <>
                      <span>/</span>
                      <SvgMoon className="w-4 h-4" />
                      <span>Noche</span>
                    </>
                  )}
                </Flex>
                <Text className="font-gtUltra mb-2 text-xl">
                  {DERMA_GENERIC_PRODUCTS[modalProduct].title}{' '}
                  {modalProduct === 1 && pain !== undefined && ' específica'}
                </Text>
                <Text className="text-sm mb-4">
                  {DERMA_GENERIC_PRODUCTS[modalProduct].subTitle}
                </Text>
                <Text className="text-hg-black500 mb-6 pb-6 border-b border-hg-black500">
                  {pain !== undefined &&
                  (modalProduct === 1 || modalProduct === 3)
                    ? DERMA_GENERIC_PRODUCTS[modalProduct].customizedProps[pain]
                        .text
                    : DERMA_GENERIC_PRODUCTS[modalProduct].text}
                </Text>
                <Text className="text-lg font-semibold mb-4">Beneficios</Text>
                <ul className="flex flex-col gap-4 w-full mb-8">
                  {pain !== undefined &&
                  (modalProduct === 1 || modalProduct === 3)
                    ? DERMA_GENERIC_PRODUCTS[modalProduct].customizedProps[
                        pain
                      ].benefits.map((benefit, index) => {
                        return (
                          <li
                            className="flex gap-3 items-start justify-start w-full"
                            key={index}
                          >
                            <SvgCheckCircle className="shrink-0 w-6 h-6 text-derma-primary500 mt-1" />
                            <Text className="text-hg-black500">{benefit}</Text>
                          </li>
                        );
                      })
                    : DERMA_GENERIC_PRODUCTS[modalProduct].benefits.map(
                        (benefit, index) => {
                          return (
                            <li
                              className="flex gap-3 items-start justify-start w-full"
                              key={index}
                            >
                              <SvgCheckCircle className="shrink-0 w-6 h-6 text-derma-primary500 mt-1" />
                              <Text className="text-hg-black500">
                                {benefit}
                              </Text>
                            </li>
                          );
                        }
                      )}
                </ul>
                {modalProduct === 3 && (
                  <Text className="text-lg font-semibold">
                    Los ingredientes activos necesarios
                  </Text>
                )}
              </Container>

              {modalProduct === 3 && (
                <Carousel
                  isIntrinsicHeight
                  visibleSlides={1.75}
                  infinite={false}
                  isDerma
                  className="mb-12"
                >
                  {pain === undefined &&
                    DERMA_INGREDIENTS.map(ingredient => (
                      <Flex
                        layout="col-left"
                        className="w-full pr-6 gap-2 px-4"
                        key={ingredient.name}
                      >
                        <Flex className="relative aspect-[3/2] w-full rounded-2xl bg-derma-secondary500 border border-derma-secondary100 mb-2 py-4 overflow-hidden">
                          <Image
                            alt={ingredient.name}
                            src={ingredient.imgSrc}
                            fill
                            className="scale-110 object-contain"
                          />
                        </Flex>
                        <Text className="font-semibold">{ingredient.name}</Text>
                        <ul className="flex gap-2 flex-wrap">
                          {ingredient.concerns.map(tag => (
                            <li
                              key={tag}
                              className="p-2 px-3 rounded-full bg-white text-derma-primary text-xs"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </Flex>
                    ))}

                  {pain !== undefined &&
                    DERMA_INGREDIENTS.filter(
                      ingredient =>
                        DERMA_GENERIC_PRODUCTS[modalProduct]?.customizedProps[
                          pain
                        ]?.ingredients.includes(ingredient.name)
                    ).map(ingredient => (
                      <Flex
                        layout="col-left"
                        className="w-full pr-6 gap-2 px-4"
                        key={ingredient.name}
                      >
                        <Flex className="relative aspect-[3/2] w-full rounded-2xl bg-derma-secondary500 border border-derma-secondary100 mb-2 py-4 overflow-hidden">
                          <Image
                            alt={ingredient.name}
                            src={ingredient.imgSrc}
                            fill
                            className="scale-110 object-contain"
                          />
                        </Flex>
                        <Text className="font-semibold">{ingredient.name}</Text>
                        <ul className="flex gap-2 flex-wrap">
                          {ingredient.concerns.map(tag => (
                            <li
                              key={tag}
                              className="p-2 px-3 rounded-full bg-white text-derma-primary text-xs"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </Flex>
                    ))}
                </Carousel>
              )}

              <Container className="py-4 md:p-6">
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
                    <AccordionContent className=" bg-derma-secondary400 text-sm text-hg-black500">
                      <ul className="flex flex-col gap-6 w-full p-4">
                        {pain !== undefined &&
                        (modalProduct === 1 || modalProduct === 3)
                          ? DERMA_GENERIC_PRODUCTS[
                              modalProduct
                            ].customizedProps[pain].useMethod.map(
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
                            )
                          : DERMA_GENERIC_PRODUCTS[modalProduct].useMethod.map(
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

                  {DERMA_GENERIC_PRODUCTS[modalProduct].info ||
                  DERMA_GENERIC_PRODUCTS[modalProduct]?.customizedProps[pain]
                    ?.info ? (
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
                      <AccordionContent className=" bg-derma-secondary400 text-sm text-hg-black500">
                        <Text className="p-4">
                          {pain !== undefined &&
                          (modalProduct === 1 || modalProduct === 3)
                            ? DERMA_GENERIC_PRODUCTS[modalProduct]
                                .customizedProps[pain].info
                            : DERMA_GENERIC_PRODUCTS[modalProduct].info}
                        </Text>
                      </AccordionContent>
                    </AccordionItem>
                  ) : null}
                </Accordion>
              </Container>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </CheckHydration>
  );
}
