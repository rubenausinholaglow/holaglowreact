'use client';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './customCss.css';

import { Children, ReactNode, useEffect, useState } from 'react';
import { SvgArrow } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
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
  isPlaying = false,
  isDashboard = false,
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
  isPlaying?: boolean;
  isDashboard?: boolean;
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
    if (isFullWidth) {
      setCurrentSlideIndex(0);
    }
  }, [children]);

  const renderControls = () => (
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
  );

  return (
    <CarouselProvider
      className={`relative w-full  ${className}`}
      isIntrinsicHeight={isIntrinsicHeight}
      totalSlides={childrens.length}
      currentSlide={isFullWidth ? currentSlideIndex : currentSlide}
      lockOnWindowScroll={true}
      dragEnabled={dragEnabled}
      touchEnabled={touchEnabled}
      naturalSlideHeight={naturalSlideHeight}
      naturalSlideWidth={naturalSlideWidth}
      visibleSlides={visibleSlides}
      orientation="horizontal"
      isPlaying={isPlaying}
      interval={2000}
      {...rest}
    >
      <div style={sliderWidth} className="relative">
        <Slider
          classNameTray={sliderStyles}
          preventVerticalScrollOnTouch={true}
          verticalPixelThreshold={1000}
        >
          {childrens.map((children, i) => (
            <Slide index={i} key={i}>
              {children}
            </Slide>
          ))}
        </Slider>
        {hasControls && isDashboard && (
          <div className="absolute inset-0 flex items-center justify-between">
            <ButtonBack
              className="transition-opacity bg-hg-secondary text-hg-primary rounded-full p-2 disabled:opacity-10 disabled:cursor-default ml-2"
              onClick={() => {
                handleBackButton();
              }}
            >
              <SvgArrow height={16} width={16} className="rotate-180" />
            </ButtonBack>
            <ButtonNext
              className="transition-opacity bg-hg-secondary text-hg-primary rounded-full p-2 disabled:opacity-10 disabled:cursor-default mr-2"
              onClick={() => {
                handleNextButton();
              }}
            >
              <SvgArrow height={16} width={16} />
            </ButtonNext>
          </div>
        )}
      </div>

      {hasControls && !isDashboard && (
        <>
          <Flex layout="row-center" className="mt-8 relative">
            {hasDots && (
              <ul className="p-2 spacing flex gap-2 text-xs absolute">
                <li>{currentSlideIndex + 1}</li>
                <li>/</li>
                <li>{childrens.length}</li>
              </ul>
            )}
          </Flex>
          {renderControls()}
        </>
      )}
    </CarouselProvider>
  );
};
