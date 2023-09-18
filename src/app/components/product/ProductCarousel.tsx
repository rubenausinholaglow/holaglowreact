'use client';

import { useRef } from 'react';
import Slider from 'react-slick';
import { Product } from '@interface/product';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrow } from 'icons/IconsDs';

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

  const firstLeftPadding = (document.body.clientWidth - CONTAINER_WIDTH) / 2;

  console.log(firstLeftPadding);

  const customStyles = '.slick-list {padding-left: 170px}';

  const sliderRef = useRef(null);

  return (
    /*     <Carousel
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
    </Carousel> */
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      <Slider
        ref={sliderRef}
        slidesToShow={visibleSlides}
        infinite={false}
        arrows={false}
        swipeToSlide
      >
        {products.map((product, index) => {
          if (product.visibility) {
            return (
              <ProductCard
                key={product.id}
                product={product}
                className="h-full flex flex-col pr-10"
              />
            );
          }

          return null;
        })}
      </Slider>
      <Container>
        <Flex layout="row-right">
          <div
            className="transition-opacity bg-hg-secondary text-hg-primary rounded-full p-2 disabled:opacity-10 disabled:cursor-default"
            onClick={() => {
              sliderRef.current.slickPrev();
            }}
          >
            <SvgArrow height={16} width={16} className="rotate-180" />
          </div>
          <div
            className="transition-opacity bg-hg-secondary text-hg-primary rounded-full p-2 disabled:opacity-10 disabled:cursor-default"
            onClick={() => {
              sliderRef.current.slickNext();
            }}
          >
            <SvgArrow height={16} width={16} />
          </div>
        </Flex>
      </Container>
    </>
  );
}
