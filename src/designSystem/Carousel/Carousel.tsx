'use client';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './customCss.css';

import { Children, ReactNode, useEffect, useState } from 'react';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
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
  dragEnabled = true,
  touchEnabled = true,
  className = '',
  sliderWidth = {},
  sliderStyles = '',
  isFullWidth = false,
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
  sliderWidth?: object;
  sliderStyles?: string;
  isFullWidth?: boolean;
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

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [children]);

  console.log(isFullWidth);

  return (
    <>
      <CarouselProvider
        className={`relative w-full  ${className}`}
        isIntrinsicHeight={isIntrinsicHeight}
        totalSlides={childrens.length}
        currentSlide={currentSlideIndex}
        infinite
        lockOnWindowScroll={true}
        dragEnabled={dragEnabled}
        touchEnabled={touchEnabled}
        naturalSlideHeight={naturalSlideHeight}
        naturalSlideWidth={naturalSlideWidth}
        visibleSlides={visibleSlides}
        orientation="horizontal"
        preventVerticalScrollOnTouch={true}
        verticalPixelThreshold={1000}
        {...rest}
      >
        <div style={sliderWidth}>
          <Slider classNameTray={sliderStyles}>
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
            <ul className="p-2 spacing flex gap-2 text-xs absolute">
              <li>{currentSlideIndex + 1}</li>
              <li>/</li>
              <li>{childrens.length}</li>
            </ul>
          )}

          {hasControls && (
            <Container className={`${isFullWidth ? '' : 'px-0'}`}>
              <Flex layout="row-right" className="gap-6">
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
            </Container>
          )}
        </Flex>
      </CarouselProvider>
    </>
  );
};
