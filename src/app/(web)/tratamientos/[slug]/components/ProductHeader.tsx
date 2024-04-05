'use client';

import { isMobile } from 'react-device-detect';
import AnimateOnViewport from 'app/(web)/components/common/AnimateOnViewport';
import CategoryIcon from 'app/(web)/components/common/CategoryIcon';
import { SvgGlow } from 'app/icons/IconsDs';
import { Product } from 'app/types/product';
import {
  getImageProductsCarousel,
  getProductCardColor,
  useImageProps,
} from 'app/utils/common';
import { Button } from 'designSystem/Buttons/Buttons';
import Carousel from 'designSystem/Carousel/Carousel';
import { Container, Flex } from 'designSystem/Layouts/Layouts';
import { Text, Title } from 'designSystem/Texts/Texts';
import { isEmpty } from 'lodash';
import Image from 'next/image';

export default function ProductHeader({
  product,
  isDashboard = false,
}: {
  product: Product;
  isDashboard?: boolean;
}) {
  const { imgSrc, alignmentStyles, setNextImgSrc } = useImageProps(product);
  const imageUrls: any[] = [];
  for (let i = 1; i <= product.numProductCardPhotos; i++) {
    const imageComponent = getImageProductsCarousel(product, i);
    imageUrls.push(imageComponent);
  }
  const validTypes = [3, 6, 7, 8];

  const renderCarouselItems = () => {
    return imageUrls.map((url, index) => (
      <Flex key={index} layout="col-center" className="items-stretch">
        <div className="relative">
          <Image
            src={url.imgSrc}
            height={140}
            width={140}
            alt={`Placeholder ${index + 1}`}
            onError={url.defaultImage}
            className={`relative ${url.alignmentStyles} ${
              !isDashboard && isMobile ? 'rounded-t-3xl' : 'rounded-3xl'
            } w-[66%]`}
          />
        </div>
      </Flex>
    ));
  };

  return (
    <>
      <Container
        className={`p-0 md:px-4 gap-4 md:gap-16 justify-between md:mb-16 flex ${
          !isDashboard && isMobile ? ' flex-col' : 'flex-row'
        }`}
      >
        <Container className="md:w-1/2 md:px-0 md:flex md:flex-col md:justify-center md:items-start">
          <Title
            isAnimated
            size="2xl"
            className="text-left font-bold mb-4 md:mt-8"
          >
            {product.title}
          </Title>

          {validTypes.includes(product.type) ? (
            <Text isAnimated className="text-hg-black500 mb-4">
              <p
                dangerouslySetInnerHTML={{
                  __html: product?.extraInformation?.resultDescription,
                }}
              />
            </Text>
          ) : (
            <Text isAnimated className="text-hg-black500 mb-4">
              {product.extraInformation?.resultDescription}
            </Text>
          )}

          <AnimateOnViewport>
            <Flex className="gap-2">
              {product.category.map(category => {
                return (
                  <Button
                    key={category.name}
                    type="white"
                    customStyles="border-none pl-1 mb-8"
                  >
                    <CategoryIcon category={category.name} className="mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </Flex>
          </AnimateOnViewport>
        </Container>
        <div className={`md:w-1/2 ${isDashboard ? 'pr-4' : ''}`}>
          <div className="relative aspect-[3/2] w-full">
            <div
              className={`absolute inset-0 top-[10%] ${alignmentStyles} ${
                !isDashboard && isMobile ? 'rounded-t-3xl' : 'rounded-3xl'
              }`}
              style={{
                background: getProductCardColor(product.cardBackgroundColor),
              }}
            />
            {product.numProductCardPhotos > 0 ? (
              <Carousel
                hasControls
                className="relative mt-8"
                isIntrinsicHeight
                visibleSlides={1}
                infinite={false}
                isDashboard={isDashboard}
              >
                {renderCarouselItems()}
              </Carousel>
            ) : (
              <Image
                alt={product.title}
                width={600}
                height={400}
                src={imgSrc}
                onError={() => setNextImgSrc()}
                className={`relative ${alignmentStyles} ${
                  !isDashboard && isMobile
                    ? product.productCardImagePosition !== 'middle'
                      ? 'rounded-t-3xl'
                      : ''
                    : product.productCardImagePosition !== 'middle'
                    ? 'rounded-3xl'
                    : ''
                } ${
                  product.productCardImagePosition !== 'full' ? 'w-[66%]' : ''
                } `}
              />
            )}

            {!isEmpty(product.tags) && product.tags[0].tag === 'B.Friday' && (
              <Flex
                layout="row-center"
                className="bg-hg-black rounded-full p-1 px-2 absolute top-[36px] md:top-[46px] left-[4px] m-2"
              >
                <SvgGlow
                  height={12}
                  width={12}
                  className="text-hg-primary mr-1"
                />
                <Text className="text-hg-secondary" size="xs">
                  B.<span className="text-hg-primary">Friday</span>
                </Text>
              </Flex>
            )}
          </div>
        </div>
      </Container>
      {product.type == 3 && (
        <Container>
          <Text isAnimated className="text-hg-black500 mb-4 mt-8">
            <p
              className="mb-16"
              dangerouslySetInnerHTML={{
                __html: product?.detail,
              }}
            />
          </Text>
        </Container>
      )}
    </>
  );
}
