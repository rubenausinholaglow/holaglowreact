'use client';

import { Product } from '@interface/product';
import { Carousel } from 'designSystem/Carousel/Carousel';

import ProductCard from './ProductCard';

export default function TreatmentCarousel({
  treatments,
}: {
  treatments: Product[];
}) {
  const CONTAINER_WIDTH = 1280;
  const CONTAINER_PADDING = 16;

  let CarouselWidth;

  if (document.body.clientWidth > CONTAINER_WIDTH) {
    CarouselWidth =
      document.body.clientWidth -
      (document.body.clientWidth - (CONTAINER_WIDTH - CONTAINER_PADDING * 2)) /
        2 +
      'px';
  } else {
    CarouselWidth = document.body.clientWidth - 16 + 'px';
  }

  return (
    <>
      <div style={{ width: CarouselWidth }}>
        <Carousel
          hasControls
          className="relative mb-12"
          isIntrinsicHeight
          visibleSlides={4.25}
          infinite={false}
        >
          {treatments.map(treatment => (
            <ProductCard
              key={treatment.id}
              treatment={treatment}
              className="mr-10 h-full flex flex-col"
            />
          ))}
        </Carousel>
      </div>
    </>
  );
}
