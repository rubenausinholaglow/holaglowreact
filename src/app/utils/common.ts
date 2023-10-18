import { useState } from 'react';
import { Product } from '@interface/product';
import { isEmpty } from 'lodash';

const DEFAULT_IMG_SRC = '/images/product/fakeProduct.png';

export const useImageProps = (product: Product) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgAligment, setImgAlignment] = useState<'left' | 'middle' | 'right'>(
    'left'
  );
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${product.flowwwId}/productCard-left.png`
  );

  const arrayImages: any = ['middle', 'right'];

  const setNextImgSrc = () => {
    if (imgIndex < arrayImages.length) {
      setImgSrc(
        `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${product.flowwwId}/productCard-${arrayImages[imgIndex]}.png`
      );
      setImgAlignment(arrayImages[imgIndex]);
    } else {
      setImgSrc(DEFAULT_IMG_SRC);
    }
    setImgIndex(imgIndex + 1);
  };

  let alignmentStyles = '';

  switch (imgAligment) {
    case 'left':
      alignmentStyles = 'mr-auto';
      break;
    case 'middle':
      alignmentStyles = 'mx-auto';
      break;
    case 'right':
      alignmentStyles = 'ml-auto';
      break;
    default:
      break;
  }

  return { imgSrc, alignmentStyles, setNextImgSrc };
};

export function getProductCardColor(color: string) {
  if (isEmpty(color)) {
    return '#ffc7c7';
  }

  if (color.includes('/')) {
    const colorArray = color.split('/');

    return `linear-gradient(45deg, ${colorArray[0]} 0%, ${colorArray[1]} 100%)`;
  }

  return color;
}
