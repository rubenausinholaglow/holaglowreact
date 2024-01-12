import { useEffect, useRef, useState } from 'react';
import { Product } from 'app/types/product';
import { isEmpty } from 'lodash';

const DEFAULT_IMG_SRC = '/images/product/fakeProduct.png';

export function getImageProperties(
  product: Product,
  photoNumber: number,
  isCarousel: boolean
) {
  let alignmentStyles = '';

  switch (product.productCardImagePosition) {
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

  const imgSrc = isCarousel
    ? `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${
        product.flowwwId
      }/productCard${photoNumber === 1 ? '' : photoNumber}-${
        product.productCardImagePosition
      }.png`
    : `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${product.flowwwId}/productCard-${product.productCardImagePosition}.png`;

  return { imgSrc, alignmentStyles, defaultImage: DEFAULT_IMG_SRC };
}

export const useImageProps = (product: Product, photoNumber = 1) => {
  const { imgSrc, alignmentStyles, defaultImage } = getImageProperties(
    product,
    photoNumber,
    false
  );

  const [imgSrcDefault, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_PRODUCT_IMG_PATH}${product.flowwwId}/productCard-${product.productCardImagePosition}.png`
  );

  const setNextImgSrc = () => {
    setImgSrc(DEFAULT_IMG_SRC);
  };

  return { imgSrc, alignmentStyles, setNextImgSrc, defaultImage };
};
export function getImageProductsCarousel(product: Product, photoNumber = 0) {
  return getImageProperties(product, photoNumber, true);
}

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
  let totalDiscountSum = 0;
  if (product && product.discounts.length > 0) {
    totalDiscountSum = product.discounts.reduce(
      (total, discount) => total + discount.totalDiscount,
      0
    );
  }
  return totalDiscountSum === 0 ? null : product?.price - totalDiscountSum;
}

export const setSeoMetaData = (title: string, description: string) => {
  document.title = title;
  const metaDescriptionTag = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  const imageUrl = "https://holaglowreact-git-dev-966-hola-glow.vercel.app/images/home/OGimagen_Holaglow.jpg"

  if (metaDescriptionTag) {
    metaDescriptionTag.setAttribute('content', description);
  } else {
    const newMetaTag = document.createElement('meta');
    newMetaTag.name = 'description';
    newMetaTag.content = description;
    document.head.appendChild(newMetaTag);
  }

  const ogUrlTag = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
  const ogTypeTag = document.querySelector('meta[property="og:type"]') as HTMLMetaElement;
  const ogTitleTag = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
  const ogDescriptionTag = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
  const ogImageTag = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;

  if (ogTitleTag) {
    ogTitleTag.setAttribute('content', title);
  } else {
    const newOgTitleTag = document.createElement('meta');
    newOgTitleTag.setAttribute('property', 'og:title');
    newOgTitleTag.content = title;
    document.head.appendChild(newOgTitleTag);
  }

  if (ogDescriptionTag) {
    ogDescriptionTag.setAttribute('content', description);
  } else {
    const newOgDescriptionTag = document.createElement('meta');
    newOgDescriptionTag.setAttribute('property', 'og:description');
    newOgDescriptionTag.content = description;
    document.head.appendChild(newOgDescriptionTag);
  }
  
  if (ogImageTag) {
      ogImageTag.setAttribute('content', imageUrl);
  } else {
      const newOgImageTag = document.createElement('meta');
      newOgImageTag.setAttribute('property', 'og:image');
      newOgImageTag.content = imageUrl;
      document.head.appendChild(newOgImageTag);
  }
  if (ogUrlTag) {
    ogUrlTag.setAttribute('content', "https://holaglowreact-git-dev-966-hola-glow.vercel.app/" || '');
  } else {
    const newOgUrlTag = document.createElement('meta');
    newOgUrlTag.setAttribute('property', 'og:url');
    newOgUrlTag.content = "https://holaglowreact-git-dev-966-hola-glow.vercel.app/" || '';
    document.head.appendChild(newOgUrlTag);
  }

  if (ogTypeTag) {
    ogTypeTag.setAttribute('content', 'website');
  } else {
    const newOgTypeTag = document.createElement('meta');
    newOgTypeTag.setAttribute('property', 'og:type');
    newOgTypeTag.content = 'website';
    document.head.appendChild(newOgTypeTag);
  }
};
