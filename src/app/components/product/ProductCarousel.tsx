'use client';

import { Professional } from '@interface/clinic';
import { Product } from '@interface/product';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { isEmpty } from 'lodash';

import ProfessionalCard from '../common/ProfessionalCard';
import ProductCard from './ProductCard';

export default function ProductCarousel({
  type = 'products',
  className,
  items,
}: {
  type: 'products' | 'professionals';
  className?: string;
  items: Product[] | Professional[] | null;
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

  if (isEmpty(items)) {
    return <></>;
  }

  return (
    <Carousel
      hasControls
      className={`relative ${className}`}
      isIntrinsicHeight
      visibleSlides={visibleSlides}
      infinite={false}
      sliderWidth={{
        width: `${CarouselWidth}px`,
        paddingRight: `${isCarouselExpanded ? '40px' : '0'}`,
      }}
    >
      {type === 'products' &&
        items &&
        items.map((product: Product | any) => {
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

      {type === 'professionals' &&
        items &&
        items.map((professional: Professional | any) => {
          return (
            <ProfessionalCard
              key={professional.name}
              professional={professional}
              className="h-full flex flex-col mr-10"
            />
          );
        })}
    </Carousel>
  );
}
