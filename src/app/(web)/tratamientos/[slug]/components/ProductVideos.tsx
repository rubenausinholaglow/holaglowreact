'use client';

import { Product } from 'app/types/product';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import dynamic from 'next/dynamic';

import ProductVideo from './ProductVideo';

const Carousel = dynamic(() => import('designSystem/Carousel/Carousel'), {
  ssr: false,
});

export default function ProductVideos({ product }: { product: Product }) {
  const productVideoSrc = product.videoUrl
    ? product.videoUrl
    : '/videos/pdp.mp4';

  return (
    <Container className="p-0 md:px-4 md:flex gap-16 justify-between mb-12 md:mb-16">
      <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-start md:items-start">
        <div className="md:flex-row">
          <Title size="2xl" className="font-bold mb-6 mt-8">
            Loren Ipsum
          </Title>
        </div>
      </Container>
      <Carousel
        hasDots
        dragEnabled={true}
        touchEnabled={true}
        visibleSlides={1}
        isIntrinsicHeight
        infinite={false}
        className="px-4"
      >
        <div className="rounded-2xl overflow-hidden">
          <ProductVideo src={productVideoSrc} />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <ProductVideo src={productVideoSrc} />
        </div>
        <div className="rounded-2xl overflow-hidden">
          <ProductVideo src={productVideoSrc} />
        </div>
      </Carousel>
    </Container>
  );
}
