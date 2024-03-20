'use client';

import { isMobile } from 'app/(web)/components/layout/Breakpoint';
import { Product } from 'app/types/product';
import { Container } from 'designSystem/Layouts/Layouts';
import { Title } from 'designSystem/Texts/Texts';
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
    <Container className="py-12 md:pt-16 md:pb-20">
      <Title size="2xl" className="font-bold mb-6">
        Loren Ipsum
      </Title>
      <Carousel
        hasDots
        dragEnabled={true}
        touchEnabled={true}
        visibleSlides={isMobile() ? 1 : 3}
        isIntrinsicHeight
        infinite={false}
        sliderStyles="md:gap-8"
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
