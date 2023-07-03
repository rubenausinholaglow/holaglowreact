import { Children, useState, ReactNode } from 'react';
import { CarouselProvider, Slider, ButtonBack, ButtonNext, Slide } from 'pure-react-carousel';
import { SvgArrowSmallLeft } from 'icons/Icons';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './customCss.css';

const Carousel = ({
  children,
  hasDots = false,
  hasControls = false,
  isIntrinsicHeight = true,
  naturalSlideHeight = 100,
  naturalSlideWidth = 100,
  visibleSlides = 1,
  totalSlides = 1,
  step = 1,
  currentSlide = 1,
  dragEnabled = false,
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
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const childrens = Children.toArray(children);

  const handleBackButton = () => {
    currentSlideIndex === 0 ? setCurrentSlideIndex(childrens.length - 1) : setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const handleNextButton = () => {
    currentSlideIndex === childrens.length - 1 ? setCurrentSlideIndex(0) : setCurrentSlideIndex(currentSlideIndex + 1);
  };

  return (
    <CarouselProvider
      className='relative w-full'
      isIntrinsicHeight={isIntrinsicHeight}
      naturalSlideHeight={naturalSlideHeight}
      naturalSlideWidth={naturalSlideWidth}
      totalSlides={childrens.length}
      currentSlide={currentSlide}
      infinite
      lockOnWindowScroll
      dragEnabled={dragEnabled}
      {...props}
    >
      {hasControls ? (
        <ButtonBack
          onClick={() => {
            handleBackButton();
          }}
        >
          <SvgArrowSmallLeft height={20} width={20} className='rotate-180' />
        </ButtonBack>
      ) : null}

      {hasControls ? (
        <ButtonNext
          onClick={() => {
            handleNextButton();
          }}
        >
          <SvgArrowSmallLeft height={20} width={20} />
        </ButtonNext>
      ) : null}

      <Slider>
        {childrens.map((children, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Slide index={i} key={i}>
            {children}
          </Slide>
        ))}
      </Slider>

      {/*       {hasDots ? (
        <Box paddingTop='m'>
          <DotGroup />
        </Box>
      ) : null} */}
    </CarouselProvider>
  );
};

export default Carousel;
