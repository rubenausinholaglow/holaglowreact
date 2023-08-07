'use client';

import { Product } from '@interface/product';
import { Carousel } from 'components/Carousel/Carousel';

import TreatmentCard from './TreatmentCard';

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
          className="flex flex-row gap-10"
          isIntrinsicHeight
          visibleSlides={4.25}
        >
          {treatments.map(treatment => (
            <TreatmentCard
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
