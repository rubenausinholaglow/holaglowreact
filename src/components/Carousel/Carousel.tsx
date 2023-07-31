import 'pure-react-carousel/dist/react-carousel.es.css';
import './customCss.css';

import { Children, ReactNode, useState } from 'react';
import { SvgArrowSmallLeft } from 'icons/Icons';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from 'pure-react-carousel';

import { CarouselNavigation } from './CarouselNavigation';

export const Carousel = ({
  children,
  hasDots = false,
  hasControls = false,
  isIntrinsicHeight = true,
  naturalSlideHeight = 100,
  naturalSlideWidth = 100,
  visibleSlides = 1,
  totalSlides = 1,
  step = 1,
  currentSlide = 0,
  dragEnabled = false,
  touchEnabled = false,
  ...props
}: {
  children: ReactNode;
  hasDots?: boolean;
  hasControls?: boolean;
  isIntrinsicHeight?: boolean;
  naturalSlideHeight?: number;
  naturalSlideWidth?: number;
  visibleSlides?: number;
  totalSlides?: number;
  step?: number;
  currentSlide?: number;
  dragEnabled?: boolean;
  touchEnabled?: boolean;
  class?: string;
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
    <CarouselProvider
      className="relative w-full"
      isIntrinsicHeight={isIntrinsicHeight}
      naturalSlideHeight={naturalSlideHeight}
      naturalSlideWidth={naturalSlideWidth}
      totalSlides={childrens.length}
      currentSlide={currentSlide}
      infinite
      lockOnWindowScroll
      dragEnabled={dragEnabled}
      touchEnabled={touchEnabled}
      {...props}
    >
      <Slider>
        {childrens.map((children, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Slide index={i} key={i}>
            {children}
          </Slide>
        ))}
      </Slider>

      {hasControls ? (
        <CarouselNavigation type="back">
          <ButtonBack
            onClick={() => {
              handleBackButton();
            }}
          >
            <SvgArrowSmallLeft height={30} width={30} />
          </ButtonBack>
        </CarouselNavigation>
      ) : null}

      {hasControls ? (
        <CarouselNavigation type="next">
          <ButtonNext
            onClick={() => {
              handleNextButton();
            }}
          >
            <SvgArrowSmallLeft height={30} width={30} className="rotate-180" />
          </ButtonNext>
        </CarouselNavigation>
      ) : null}

      {/*       {hasDots ? (
        <Box paddingTop='m'>
          <DotGroup />
        </Box>
      ) : null} */}
    </CarouselProvider>
  );
};
