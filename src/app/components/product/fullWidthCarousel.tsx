'use client';

import { useEffect } from 'react';
import { Professional } from '@interface/clinic';
import { Product } from '@interface/product';
import { Testimonial } from '@interface/testimonial';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { isEmpty } from 'lodash';

import ProfessionalCard from '../common/ProfessionalCard';
import TestimonialCard from '../common/TestimonialCard';
import ProductCard from './ProductCard';

export default function FullWidthCarousel({
  type = 'products',
  className,
  items,
}: {
  type: 'products' | 'professionals' | 'testimonials';
  className?: string;
  items: Product[] | Professional[] | Testimonial[] | null;
}) {
  const CONTAINER_WIDTH = 1152;
  const CONTAINER_PADDING = 16;
  let firstItemLeftMargin = 0;

  useEffect(() => {
    if (document) {
      if (document.body.clientWidth > CONTAINER_WIDTH) {
        firstItemLeftMargin =
          (document.body.clientWidth - CONTAINER_WIDTH) / 2 + CONTAINER_PADDING;
      } else {
        firstItemLeftMargin = 16;
      }
    }
  }, []);

  const visibleSlides = (document.body.clientWidth - firstItemLeftMargin) / 304;

  if (isEmpty(items)) {
    return <></>;
  }

  return (
    <>
      <style>
        {`
          #productCarousel [aria-label="slider"] {
            padding-left: ${firstItemLeftMargin}px;
          }
        `}
      </style>
      <Carousel
        id="productCarousel"
        hasControls
        className={`relative ${className}`}
        isIntrinsicHeight
        visibleSlides={visibleSlides}
        infinite={false}
        isFullWidth
      >
        {type === 'products' &&
          items &&
          items.map((product: Product | any, index) => {
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
          items.map((professional: Professional | any, index) => {
            return (
              <ProfessionalCard
                key={professional.name}
                professional={professional}
                className="h-full flex flex-col mr-10"
              />
            );
          })}

        {type === 'testimonials' &&
          items &&
          items.map((testimonial: Testimonial | any) => {
            return (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                className="h-full flex flex-col mr-4"
              />
            );
          })}
      </Carousel>
    </>
  );
}
