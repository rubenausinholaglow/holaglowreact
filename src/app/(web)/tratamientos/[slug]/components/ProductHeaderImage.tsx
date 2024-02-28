'use client';

import { getProductCardColor, useImageProps } from '@utils/common';
import { Product } from 'app/types/product';
import Carousel from 'designSystem/Carousel/Carousel';
import { Flex } from 'designSystem/Layouts/Layouts';
import Image from 'next/image';

export default function ProductHeaderImage({ product }: { product: Product }) {
  const { imgSrc, alignmentStyles, setNextImgSrc } = useImageProps(product);

  const imageUrls: any[] = [];

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
            className={`relative ${url.alignmentStyles} rounded-t-3xl md:rounded-3xl w-[66%]`}
          />
        </div>
      </Flex>
    ));
  };

  return (
    <div className="relative aspect-[3/2] w-full">
      <div
        className={`absolute inset-0 top-[10%] ${alignmentStyles} rounded-t-3xl md:rounded-3xl`}
        style={{
          background: getProductCardColor(product?.cardBackgroundColor),
        }}
      />
      {product.numProductCardPhotos > 0 ? (
        <Carousel
          hasControls
          className="relative mt-8"
          isIntrinsicHeight
          visibleSlides={1}
          infinite={false}
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
          className={`relative ${alignmentStyles} rounded-t-3xl md:rounded-3xl w-[66%]`}
        />
      )}
    </div>
  );
}
