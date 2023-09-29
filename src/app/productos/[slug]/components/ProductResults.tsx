import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import { ImgComparisonSlider } from '@img-comparison-slider/react';

export default function ProductResults({ product }: { product: Product }) {
  return (
    <Container className="p-0 pt-8 md:px-4 md:flex gap-16 justify-between mb-12 md:mb-16">
      <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-start md:items-start">
        <div className="md:flex-row">
          <Title size="2xl" className="font-bold mb-6 mt-8">
            Consigue el{' '}
            <Underlined color={HOLAGLOW_COLORS['primary']}>
              resultado
            </Underlined>{' '}
            que deseas
          </Title>
          <Text className="text-hg-black500 mb-4 md:text-lg">
            Podrás presumir del cambio el mismo día y observarás el resultado
            óptimo a las dos semanas.
          </Text>
        </div>
      </Container>
      <div className="md:w-1/2">
        <Carousel
          hasControls
          dragEnabled={false}
          touchEnabled={false}
          hasDots
          className="px-4 md:px-0 rounded-xl"
        >
          <div className="overflow-hidden rounded-xl relative">
            <ImgComparisonSlider className="outline-none w-full">
              <figure slot="first" className="before">
                <img width="100%" src="/images/product/fakeProduct.png"></img>
                <span className="bg-hg-primary/50 py-1 px-2 rounded-xl absolute left-4 bottom-4 text-sm">
                  Antes
                </span>
              </figure>
              <figure slot="second" className="after">
                <img
                  width="100%"
                  src="/images/product/fakeProductExample1.png"
                ></img>
                <span className="bg-hg-primary/50 py-1 px-2 rounded-xl absolute right-4 bottom-4 text-sm">
                  Despues
                </span>
              </figure>
            </ImgComparisonSlider>
          </div>
        </Carousel>
      </div>
    </Container>
  );
}
