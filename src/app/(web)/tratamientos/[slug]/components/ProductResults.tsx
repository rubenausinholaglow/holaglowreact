import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { Product } from 'app/types/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';
import Image from 'next/image';

export default function ProductResults({ product }: { product: Product }) {
  return (
    <Container className="p-0 pt-8 md:px-4 md:flex gap-16 justify-between mb-12 md:mb-16">
      <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-start md:items-start">
        <div className="md:flex-row">
          <Title isAnimated size="2xl" className="font-bold mb-6 mt-8">
            Consigue el{' '}
            <Underlined color={HOLAGLOW_COLORS['primary']}>
              resultado
            </Underlined>{' '}
            que deseas
          </Title>
          <Text isAnimated className="text-hg-black500 mb-4 md:text-lg">
            Podrás presumir del cambio el mismo día y observarás el resultado
            óptimo a las dos semanas.
          </Text>
        </div>
      </Container>
      <div className="md:w-1/2">
        <Carousel
          hasControls={product.beforeAndAfterImages?.length > 1}
          dragEnabled={false}
          touchEnabled={false}
          hasDots
          className="px-4 md:px-0 rounded-xl aspect-square"
        >
          {product.beforeAndAfterImages?.map(item => (
            <div key={item.id} className="overflow-hidden relative">
              <ImgComparisonSlider className="outline-none w-full">
                <figure slot="first" className="before">
                  <div className="relative aspect-square">
                    <Image
                      src={item.urlBefore || ''}
                      alt={product.title}
                      fill
                      className="object-cover rounded-3xl"
                    />
                  </div>
                  <span className="bg-hg-primary/50 py-1 px-2 rounded-xl absolute left-4 bottom-4 text-sm">
                    Antes
                  </span>
                </figure>
                <figure slot="second" className="after">
                  <div className="relative aspect-square">
                    <Image
                      src={item.urlAfter || ''}
                      alt={product.title}
                      fill
                      className="object-cover rounded-3xl"
                    />
                  </div>
                  <span className="bg-hg-primary/50 py-1 px-2 rounded-xl absolute right-4 bottom-4 text-sm">
                    Después
                  </span>
                </figure>
              </ImgComparisonSlider>
            </div>
          ))}
        </Carousel>
      </div>
    </Container>
  );
}
