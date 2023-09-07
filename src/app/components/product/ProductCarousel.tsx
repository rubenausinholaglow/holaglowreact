'use client';

import { Product } from '@interface/product';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Carousel } from 'designSystem/Carousel/Carousel';

import ProductCard from './ProductCard';

export default function TreatmentCarousel({
  className,
  treatments,
}: {
  className: string;
  treatments: Product[];
}) {
  const CONTAINER_WIDTH = 1280;
  const CONTAINER_PADDING = 16;

  const VISIBLE_SLIDES = {
    isMobile: 1.25,
    isTablet: 2.75,
    isDesktop: 4.25,
    isWideScreen: 5.75,
  };

  type SharedKeys = keyof typeof VISIBLE_SLIDES;

  const deviceSize = useGlobalPersistedStore(state => state.deviceSize);

  const activeDeviceSize = Object.keys(deviceSize).find(
    key => deviceSize[key as SharedKeys]
  );

  let CarouselWidth;
  //let translateCarousel = 16;

  if (document.body.clientWidth > CONTAINER_WIDTH) {
    CarouselWidth =
      document.body.clientWidth -
      (document.body.clientWidth - (CONTAINER_WIDTH - CONTAINER_PADDING * 2)) /
        2 +
      'px';

    //translateCarousel = (document.body.clientWidth - CONTAINER_WIDTH) / 2 + 16;
  } else {
    CarouselWidth = document.body.clientWidth - 16 + 'px';
  }

  console.log(CarouselWidth);

  return (
    <Carousel
      hasControls
      className={`relative mb-12 ${className}`}
      isIntrinsicHeight
      visibleSlides={VISIBLE_SLIDES[activeDeviceSize as SharedKeys]}
      infinite={false}
      sliderStyles={{
        width: CarouselWidth,
      }}
    >
      {treatments.map(treatment => (
        <ProductCard
          key={treatment.id}
          treatment={treatment}
          className="mr-10 h-full flex flex-col"
        />
      ))}
    </Carousel>
  );
}
