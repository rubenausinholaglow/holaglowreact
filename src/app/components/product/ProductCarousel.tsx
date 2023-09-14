'use client';

import { Product } from '@interface/product';
import { useGlobalPersistedStore } from 'app/stores/globalStore';
import { Carousel } from 'designSystem/Carousel/Carousel';

import ProductCard from './ProductCard';

export default function ProductCarousel({
  className,
  products,
}: {
  className: string;
  products: Product[];
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

  if (document.body.clientWidth > CONTAINER_WIDTH) {
    CarouselWidth =
      document.body.clientWidth -
      (document.body.clientWidth - (CONTAINER_WIDTH - CONTAINER_PADDING * 2)) /
        2;
  } else {
    CarouselWidth = document.body.clientWidth - 16;
  }

  const visibleSlides = CarouselWidth / 304;

  console.log(CarouselWidth, visibleSlides);

  return (
    <Carousel
      hasControls
      className={`relative mb-12 ${className}`}
      isIntrinsicHeight
      visibleSlides={visibleSlides}
      infinite={false}
      sliderWidth={{
        width: `${CarouselWidth}px`,
      }}
      sliderStyles="gap-10"
    >
      {products.map(product => {
        if (product.visibility) {
          return (
            <ProductCard
              key={product.id}
              product={product}
              className="h-full flex flex-col"
            />
          );
        }

        return null;
      })}
    </Carousel>
  );
}
