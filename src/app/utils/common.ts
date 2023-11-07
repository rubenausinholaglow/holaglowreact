import { useEffect, useRef, useState } from 'react';
import { Product } from '@interface/product';
import { isEmpty } from 'lodash';

const DEFAULT_IMG_SRC = '/images/product/fakeProduct.png';

export const useImageProps = (product: Product) => {
  const [imgAligment] = useState<string>(product.productCardImagePosition);
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${product.flowwwId}/productCard-${product.productCardImagePosition}.png`
  );

  const setNextImgSrc = () => {
    setImgSrc(DEFAULT_IMG_SRC);
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

type IntersectionOptions = IntersectionObserverInit;

export function useElementOnScreen(options: IntersectionOptions) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting] as const;
}

export function getDiscountedPrice(product: Product) {
  const totalDiscountSum = product.discounts.reduce(
    (total, discount) => total + discount.totalDiscount,
    0
  );

  return product.price - totalDiscountSum;
}
