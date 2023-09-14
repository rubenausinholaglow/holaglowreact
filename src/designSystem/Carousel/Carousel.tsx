'use client';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './customCss.css';

import { Children, ReactNode, useState } from 'react';
import { Flex } from 'designSystem/Layouts/Layouts';
import { SvgArrow } from 'icons/IconsDs';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from 'pure-react-carousel';

export const Carousel = ({
  children,
  hasDots = false,
  hasControls = false,
  isIntrinsicHeight = true,
  naturalSlideHeight = 100,
  naturalSlideWidth = 100,
  visibleSlides = 1,
  step = 1,
  currentSlide = 0,
  dragEnabled = false,
  touchEnabled = false,
  className = '',
  sliderStyles = {},
  ...rest
}: {
  children: ReactNode;
  hasDots?: boolean;
  hasControls?: boolean;
  isIntrinsicHeight?: boolean;
  naturalSlideHeight?: number;
  naturalSlideWidth?: number;
  visibleSlides?: number;
  step?: number;
  currentSlide?: number;
  dragEnabled?: boolean;
  touchEnabled?: boolean;
  className?: string;
  sliderStyles?: object;
  [key: string]: any;
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const childrens = Children.toArray(children);

  const handleBackButton = () => {
    currentSlideIndex === 0
      ? setCurrentSlideIndex(childrens.length - 1)
      : setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const handleNextButton = () => {
    currentSlideIndex === childrens.length - 1
      ? setCurrentSlideIndex(0)
      : setCurrentSlideIndex(currentSlideIndex + 1);
  };

  return (
    <>
      <CarouselProvider
        className={`relative w-full ${className}`}
        isIntrinsicHeight={isIntrinsicHeight}
        totalSlides={childrens.length}
        currentSlide={currentSlide}
        infinite
        lockOnWindowScroll
        dragEnabled={dragEnabled}
        touchEnabled={touchEnabled}
        naturalSlideHeight={naturalSlideHeight}
        naturalSlideWidth={naturalSlideWidth}
        visibleSlides={visibleSlides}
        {...rest}
      >
        <div style={sliderStyles}>
          <Slider>
            {childrens.map((children, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Slide index={i} key={i}>
                {children}
              </Slide>
            ))}
          </Slider>
        </div>

        <Flex layout="row-center" className="mt-8 relative items-center">
          {hasDots && (
            <ul className="p-2 spacing flex gap-2 text-xs">
              <li>{currentSlideIndex + 1}</li>
              <li>/</li>
              <li>{childrens.length}</li>
            </ul>
          )}

          {hasControls && (
            <Flex layout="row-center" className="gap-6 absolute right-0 top-0">
              <ButtonBack
                className="transition-opacity bg-hg-secondary text-hg-primary rounded-full p-2 disabled:opacity-10 disabled:cursor-default"
                onClick={() => {
                  handleBackButton();
                }}
              >
                <SvgArrow height={16} width={16} className="rotate-180" />
              </ButtonBack>
              <ButtonNext
                className="transition-opacity bg-hg-secondary text-hg-primary rounded-full p-2 disabled:opacity-10 disabled:cursor-default"
                onClick={() => {
                  handleNextButton();
                }}
              >
                <SvgArrow height={16} width={16} />
              </ButtonNext>
            </Flex>
          )}
        </Flex>
      </CarouselProvider>
    </>
  );
};
