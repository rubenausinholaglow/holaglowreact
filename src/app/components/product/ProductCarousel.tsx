'use client';

import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { Product } from '@interface/product';
import { Carousel } from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { SvgSpinner } from 'icons/Icons';
import { SvgArrow } from 'icons/IconsDs';

import ProductCard from './ProductCard';

export default function ProductCarousel({
  className,
  products,
}: {
  className: string;
  products: Product[];
}) {
  const [isSliderLoading, setIsSliderLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(
    products.filter(product => product.visibility).length
  );

  const CONTAINER_WIDTH = 1152;
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

  const firstLeftPadding =
    (document.body.clientWidth - (CONTAINER_WIDTH - CONTAINER_PADDING * 2)) / 2;

  const visibleSlides = document.body.clientWidth / 304;

  const customStyles = `.slick-list {padding-left: ${firstLeftPadding}px; padding-right: 80px}`;

  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    setIsSliderLoading(true);

    setVisibleProducts(products.filter(product => product.visibility).length);

    setTimeout(() => {
      setIsSliderLoading(false);
    }, 350);
  }, [products]);

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
      {products.filter(product => product.visibility).length >
        visibleSlides && (
        <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      )}

      {isSliderLoading ? (
        <Container className="py-28">
          <SvgSpinner />
        </Container>
      ) : (
        <>
          {visibleProducts > visibleSlides ? (
            <>
              <Slider
                ref={sliderRef}
                slidesToShow={visibleSlides}
                infinite={false}
                arrows={false}
                swipeToSlide
                afterChange={index => setCurrentSlide(index)}
                lazyLoad="progressive"
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
                <Flex layout="row-right" className="gap-6 my-12">
                  <button
                    className={`transition-opacity bg-hg-secondary text-hg-primary rounded-full p-2 ${
                      currentSlide === 0 ? 'opacity-10' : 'cursor-pointer'
                    }`}
                    onClick={() => {
                      sliderRef.current?.slickPrev();
                    }}
                  >
                    <SvgArrow height={16} width={16} className="rotate-180" />
                  </button>
                  <button
                    className={`transition-opacity bg-hg-secondary text-hg-primary rounded-full p-2 ${
                      currentSlide ===
                      products.filter(product => product.visibility).length
                        ? 'opacity-10'
                        : 'cursor-pointer'
                    }`}
                    onClick={() => {
                      sliderRef.current?.slickNext();
                    }}
                  >
                    <SvgArrow height={16} width={16} />
                  </button>
                </Flex>
              </Container>
            </>
          ) : (
            <Container className="mb-12">
              <Flex layout="row-left" className="gap-10">
                {products.map((product, index) => {
                  if (product.visibility) {
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        className="h-full flex flex-col w-[264px]"
                      />
                    );
                  }

                  return null;
                })}
              </Flex>
            </Container>
          )}
        </>
      )}
    </>
  );
}
