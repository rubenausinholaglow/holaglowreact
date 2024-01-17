'use client';

import { ReactNode, useLayoutEffect, useState } from 'react';
import { Professional } from 'app/types/clinic';
import { Product } from 'app/types/product';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { isEmpty } from 'lodash';

import ProfessionalCard from '../common/ProfessionalCard';
import ProductCard from './ProductCard';

export default function FullWidthCarousel({
  type = 'products',
  visibleSlides,
  className,
  items,
  hasControls = true,
  isPlaying = false,
  disableLeftMargin = false,
  children,
}: {
  type?: 'products' | 'professionals';
  visibleSlides?: number | null;
  className?: string;
  items?: Product[] | Professional[] | null;
  hasControls?: boolean;
  isPlaying?: boolean;
  disableLeftMargin?: boolean;
  children?: ReactNode;
}) {
  const randomId = Math.random().toString().slice(2, 5);
  const [slidesToShow, setSlidesToShow] = useState(
    visibleSlides ? visibleSlides : 1.5
  );

  /* const CONTAINER_WIDTH = 1152;
  const CONTAINER_PADDING = 16;
  let firstItemLeftMargin = 16;
  let slidesToShow = visibleSlides ? visibleSlides : 1.5;

  if (typeof window !== 'undefined') {
    if (document && document.body.clientWidth > CONTAINER_WIDTH) {
      firstItemLeftMargin =
        (document.body.clientWidth - CONTAINER_WIDTH) / 2 + CONTAINER_PADDING;
    }

    if (!visibleSlides) {
      slidesToShow = (document.body.clientWidth - firstItemLeftMargin) / 304;
    }
  } */

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const CONTAINER_WIDTH = 1152;
      const CONTAINER_PADDING = 16;
      let firstItemLeftMargin = 16;

      if (document && document.body.clientWidth > CONTAINER_WIDTH) {
        firstItemLeftMargin =
          (document.body.clientWidth - CONTAINER_WIDTH) / 2 + CONTAINER_PADDING;
      }

      if (!visibleSlides) {
        setSlidesToShow(
          (document.body.clientWidth - firstItemLeftMargin) / 304
        );
      }

      const styleTag = document.createElement('style');
      styleTag.innerHTML = `
        #productCarousel${randomId} [aria-label="slider"] {
          padding-left: ${
            disableLeftMargin ? '0' : firstItemLeftMargin
          }px !important;
        }
      `;

      document.head.appendChild(styleTag);
    }
  }, [randomId, disableLeftMargin, visibleSlides]);

  console.log('test2');

  if (isEmpty(items) && !children) {
    return <></>;
  }

  return (
    <>
      <Carousel
        id={`productCarousel${randomId}`}
        hasControls={hasControls && !isPlaying}
        className={`relative ${className}`}
        isIntrinsicHeight
        visibleSlides={slidesToShow}
        isPlaying={isPlaying}
        isFullWidth
      >
        {type &&
          type === 'products' &&
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

        {type &&
          type === 'professionals' &&
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

        {children}
      </Carousel>
    </>
  );
}
