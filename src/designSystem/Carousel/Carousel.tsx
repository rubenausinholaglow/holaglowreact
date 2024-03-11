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

export default function Carousel({
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
  isDerma = false,
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
  isDerma?: boolean;
  [key: string]: any;
}) {
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

  const buttonBack = () => (
    <ButtonBack
      className={`transition-opacity ${
        !isDerma
          ? 'bg-hg-secondary100 border border-hg-secondary text-hg-secondary'
          : 'bg-derma-primary text-derma-primary100'
      }  rounded-full p-3 disabled:opacity-10 disabled:cursor-default`}
      onClick={() => {
        handleBackButton();
      }}
    >
      <SvgArrow height={16} width={16} className="rotate-180" />
    </ButtonBack>
  );

  const buttonNext = () => (
    <ButtonNext
      className={`transition-opacity ${
        !isDerma
          ? 'bg-hg-secondary100 border border-hg-secondary text-hg-secondary'
          : 'bg-derma-primary text-derma-primary100'
      }  rounded-full p-3 disabled:opacity-10 disabled:cursor-default`}
      onClick={() => {
        handleNextButton();
      }}
    >
      <SvgArrow height={16} width={16} />
    </ButtonNext>
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
          verticalPixelThreshold={1000}
          preventVerticalScrollOnTouch={true}
        >
          {childrens.map((children, i) => (
            <Slide index={i} key={i}>
              {children}
            </Slide>
          ))}
        </Slider>
        {hasControls && isDashboard && (
          <div className="absolute inset-0 flex items-center justify-between">
            {buttonBack()}
            {buttonNext()}
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
          <Container className={`${isFullWidth ? '' : 'px-0'}`}>
            <Flex layout="row-right" className="gap-6">
              {buttonBack()}
              {buttonNext()}
            </Flex>
          </Container>
        </>
      )}
    </CarouselProvider>
  );
}
