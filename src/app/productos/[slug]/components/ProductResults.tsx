import ReactCompareImage from 'react-compare-image';
import { Product } from '@interface/product';
import { HOLAGLOW_COLORS } from 'app/utils/colors';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title, Underlined } from 'designSystem/Texts/Texts';

export default function ProductResults({ product }: { product: Product }) {
  return (
    <Container className="p-0 pt-8 md:px-4 md:flex gap-16 justify-between mb-12 md:mb-16">
      <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-start md:items-start">
        <div className="md:flex-row">
          <Title size="2xl" className="font-bold mb-6">
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
          hasDots
          className="px-4 md:px-0 rounded-xl"
        >
          <div className="overflow-hidden rounded-xl">
            <ReactCompareImage
              leftImage="/images/product/fakeProduct.png"
              rightImage="/images/product/fakeProductExample1.png"
            />
          </div>
          <div className="overflow-hidden rounded-xl">
            <ReactCompareImage
              leftImage="/images/product/fakeProduct.png"
              rightImage="/images/product/fakeProductExample1.png"
            />
          </div>
          <div className="overflow-hidden rounded-xl">
            <ReactCompareImage
              leftImage="/images/product/fakeProduct.png"
              rightImage="/images/product/fakeProductExample1.png"
            />
          </div>
        </Carousel>
      </div>
    </Container>
  );
}
