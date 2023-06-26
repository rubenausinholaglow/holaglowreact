import { Children, useState } from 'react';
import { CarouselProvider, Slider, ButtonBack, ButtonNext, Slide } from 'pure-react-carousel';
import { SvgArrowSmallLeft } from 'icons/Icons';

const Carousel = ({
  children,
  hasDots = false,
  hasControlls = false,
  controllsPosition = 'top',
  isLight = true,
  isActiveWhen = c => c.length > 1,
  ...props
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const childrens = Children.toArray(children);

  if (!isActiveWhen(childrens)) {
    return children;
  }

  const handleBackButton = () => {
    currentSlideIndex === 0 ? setCurrentSlideIndex(childrens.length - 1) : setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const handleNextButton = () => {
    currentSlideIndex === childrens.length - 1 ? setCurrentSlideIndex(0) : setCurrentSlideIndex(currentSlideIndex + 1);
  };

  return (
    <CarouselProvider
      className='relative w-full'
      isIntrinsicHeight
      visibleSlides={1}
      totalSlides={childrens.length}
      step={1}
      infinite
      lockOnWindowScroll
      {...props}
    >
      {hasControlls ? (
        <ButtonBack
          onClick={() => {
            handleBackButton();
          }}
        >
          <SvgArrowSmallLeft height={20} width={20} className='rotate-180' />
        </ButtonBack>
      ) : null}

      {hasControlls ? (
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

      {hasDots ? (
        <Box paddingTop='m'>
          <DotGroup />
        </Box>
      ) : null}
    </CarouselProvider>
  );
};

export default Carousel;
