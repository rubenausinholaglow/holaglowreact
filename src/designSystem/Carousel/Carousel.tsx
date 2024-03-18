'use client';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './customCss.css';

import { Children, ReactNode, useEffect, useState } from 'react';
import { SvgAngle, SvgArrow, SvgHolaGlowStar2 } from 'app/icons/IconsDs';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Dot,
  Slide,
  Slider,
} from 'pure-react-carousel';

export default function Carousel({
  children,
  hasDots = false,
  hasCounter = false,
  hasControls = false,
  hasTopControls = false,
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
  hasCounter?: boolean;
  hasControls?: boolean;
  hasTopControls?: boolean;
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

  const buttonBack = ({ isTopControl = false }: { isTopControl?: boolean }) => (
    <ButtonBack
      className={`transition-opacity ${
        !isDerma
          ? 'bg-hg-secondary text-hg-primary'
          : `bg-derma-primary text-derma-primary100 ${
              isTopControl ? 'bg-white' : ''
            }`
      }  rounded-full p-2 disabled:opacity-10 disabled:cursor-default`}
      onClick={() => {
        handleBackButton();
      }}
    >
      {isTopControl ? (
        <SvgAngle
          height={16}
          width={16}
          className="rotate-180 text-derma-tertiary"
        />
      ) : (
        <SvgArrow height={16} width={16} className="rotate-180" />
      )}
    </ButtonBack>
  );

  const buttonNext = ({ isTopControl = false }: { isTopControl?: boolean }) => (
    <ButtonNext
      className={`transition-opacity ${
        !isDerma
          ? 'bg-hg-secondary text-hg-primary'
          : `bg-derma-primary text-derma-primary100 ${
              isTopControl ? 'bg-white' : ''
            }`
      }  rounded-full p-2 disabled:opacity-10 disabled:cursor-default`}
      onClick={() => {
        handleNextButton();
      }}
    >
      {isTopControl ? (
        <SvgAngle height={16} width={16} className="text-derma-tertiary" />
      ) : (
        <SvgArrow height={16} width={16} />
      )}
    </ButtonNext>
  );

  return (
    <CarouselProvider
      className={`relative w-full  ${className}`}
      isIntrinsicHeight={isIntrinsicHeight}
      totalSlides={childrens.length}
      currentSlide={isFullWidth || hasDots ? currentSlideIndex : currentSlide}
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
          <div className="absolute inset-0 flex items-center justify-between ">
            {buttonBack({ isTopControl: hasTopControls })}
            {buttonNext({ isTopControl: hasTopControls })}
          </div>
        )}
      </div>

      {hasCounter && !isDashboard && (
        <Flex layout="row-center" className="mt-8 relative">
          <ul className="p-2 spacing flex gap-2 text-xs absolute">
            <li>{currentSlideIndex + 1}</li>
            <li>/</li>
            <li>{childrens.length}</li>
          </ul>
        </Flex>
      )}

      {hasDots && !isDashboard && (
        <Flex layout="row-center" className="relative mt-4">
          <ul className="p-2 spacing flex gap-2 text-xs absolute items-center">
            {childrens.map((dot, index) => {
              const isActive = currentSlideIndex === index;

              return (
                <li key={index}>
                  <SvgHolaGlowStar2
                    onClick={() =>
                      index > currentSlideIndex
                        ? handleNextButton()
                        : handleBackButton()
                    }
                    className={
                      isActive
                        ? `h-6 w-6 ${
                            isDerma
                              ? 'text-derma-primary500'
                              : 'text-hg-secondary'
                          }`
                        : `h-4 w-4 ${
                            isDerma
                              ? 'text-derma-primary300'
                              : 'text-hg-secondary300'
                          }`
                    }
                  />
                </li>
              );
            })}
          </ul>
        </Flex>
      )}

      {hasControls && !isDashboard && (
        <Container
          className={`${isFullWidth ? '' : 'px-0'} ${
            hasTopControls
              ? 'absolute top-[50%] -translate-y-[50%] px-4'
              : 'mt-8'
          } ${rest.controlStyles ? rest.controlStyles : ''}`}
        >
          <Flex
            layout={hasTopControls ? 'row-between' : 'row-right'}
            className="gap-6"
          >
            {buttonBack({ isTopControl: hasTopControls })}
            {buttonNext({ isTopControl: hasTopControls })}
          </Flex>
        </Container>
      )}
    </CarouselProvider>
  );
}
