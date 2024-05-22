import CheckHydration from '@utils/CheckHydration';
import { isMobileSSR, isTabletSSR } from '@utils/isMobileSSR';
import ROUTES from '@utils/routes';
import FullWidthCarousel from 'app/(web)/components/product/fullWidthCarousel';
import { Button } from 'designSystem/Buttons/Buttons';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

import {
  DERMA_COMPLEMENTS,
  DERMA_INGREDIENTS,
} from '../../multistep/multistepConfig';

export default function IngredientsPrices() {
  const visibleComplements = isMobileSSR() ? 1 : isTabletSSR() ? 2 : 3;

  return (
    <div className="bg-derma-secondary300 py-4 pb-16">
      <Container className="mb-8">
        <Title size="2xl" className="text-derma-primary mb-4">
          Bases de un tratamiento efectivo
        </Title>
        <Text className="font-gtUltra font-light text-xldr mb-2">
          Crema facial personalizada
        </Text>
        <Text className="text-hg-black500">
          Tu crema personalizada llevará una combinación única de principios
          activos para tu piel seleccionados por tu médico.
        </Text>
      </Container>
      <FullWidthCarousel className="pb-8" isDerma>
        {DERMA_INGREDIENTS.map(ingredient => (
          <Flex
            layout="col-left"
            className="w-full pr-6 gap-2"
            key={ingredient.name}
          >
            <Flex className="relative aspect-[3/2] w-full rounded-2xl bg-derma-secondary500 mb-2 py-4 overflow-hidden">
              <Image
                alt={ingredient.name}
                src={ingredient.imgSrc}
                fill
                className="scale-110 object-contain"
              />
            </Flex>

            <Text className="text-lg font-semibold">{ingredient.name}</Text>
            <Text className="">
              Concentración{' '}
              <span className="font-semibold">{ingredient.concentration}</span>
            </Text>

            <ul className="flex gap-2">
              {ingredient.tags.map(tag => (
                <li
                  key={tag}
                  className="px-2 py-1 rounded-full bg-derma-primary100 text-derma-primary text-xs"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <Text className="text-sm text-hg-black500">
              {ingredient.description}
            </Text>
          </Flex>
        ))}
      </FullWidthCarousel>

      <Container>
        <Text className="font-gtUltra font-light text-xldr mb-2">
          Cremas complementarias
        </Text>
        <Text className="text-hg-black500 mb-8">
          Trabajan de manera conjunta con la crema personalizada para sacar el
          máximo partido de tu tratamiento.
        </Text>
      </Container>
      <Container className="px-0 md:px-4">
        <CheckHydration>
          <Carousel
            hasDots={isMobileSSR()}
            hasControls={
              !isMobileSSR() && DERMA_COMPLEMENTS.length > visibleComplements
            }
            controlstyles="px-4"
            className="relative pb-12"
            isIntrinsicHeight
            visibleSlides={visibleComplements}
            infinite={false}
            sliderStyles="md:gap-10"
            isDerma
          >
            {DERMA_COMPLEMENTS.map(complement => {
              return (
                <Flex
                  key={complement.name}
                  layout="col-left"
                  className="bg-white p-4 rounded-2xl h-full mr-4 ml-4 md:mr-0 md:ml-0 gap-4"
                >
                  <Image
                    src={complement.imgSrc}
                    height={392}
                    width={328}
                    alt={complement.name}
                    className="max-h-[196px] w-auto mx-auto mb-4"
                  />
                  <Text className="text-xl font-semibold">
                    {complement.name}
                  </Text>
                  <Text className="">{complement.volume}</Text>
                  <Text className="text-sm text-hg-black500">
                    {complement.description}
                  </Text>
                  {!isEmpty(complement.activePrinciples) && (
                    <Text className="p-4 bg-derma-primary/20 text-hg-black500 rounded-xl text-sm w-full">
                      <span className="font-semibold">
                        Activos principales:
                      </span>{' '}
                      {complement.activePrinciples}
                    </Text>
                  )}
                </Flex>
              );
            })}
          </Carousel>
        </CheckHydration>

        <Flex className="justify-center">
          <Button
            type="derma"
            size="xl"
            customStyles="px-16"
            href={ROUTES.derma.multistep.start}
            id="tmevent_derma_prices_cosmetics_button"
          >
            Empezar análisis de piel
          </Button>
        </Flex>
      </Container>
    </div>
  );
}
