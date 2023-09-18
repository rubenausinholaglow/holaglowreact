'use client';

import { Product } from '@interface/product';
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

  let CarouselWidth;
  let isCarouselExpanded = false;

  if (document.body.clientWidth > CONTAINER_WIDTH) {
    CarouselWidth =
      document.body.clientWidth -
      (document.body.clientWidth - (CONTAINER_WIDTH - CONTAINER_PADDING * 2)) /
        2;
    isCarouselExpanded = true;
  } else {
    CarouselWidth = document.body.clientWidth - 16;
  }

  const visibleSlides = (CarouselWidth - (isCarouselExpanded ? 40 : 0)) / 304;

  return (
    <Carousel
      hasControls
      className={`relative mb-12 ${className}`}
      isIntrinsicHeight
      visibleSlides={visibleSlides}
      infinite={false}
      sliderWidth={{
        width: `${CarouselWidth}px`,
        paddingRight: `${isCarouselExpanded ? '40px' : '0'}`,
      }}
    >
      {products.map(product => {
        if (product.visibility) {
          return (
            <ProductCard
              key={product.id}
              product={product}
              className="h-full flex flex-col mr-10"
            />
          );
        }

        return null;
      })}
    </Carousel>
  );
}
