'use client';

import { getProductCardColor, useImageProps } from 'app/utils/common';
import Image from 'next/image';
import { priceFormat } from 'utils/priceFormat';

import { type Product as ProductType } from '../types';

export default function ProductItem({ product }: { product: ProductType }) {
  const { imgSrc, alignmentStyles, setNextImgSrc } = useImageProps(
    product.product as any
  );

  return (
    <li className="flex flex-row justify-center">
      <div className="relative bg-cover bg-center w-[200px] h-[200px] aspect-square rounded-b-3xl overflow-hidden">
        <div
          className="absolute inset-0 top-[10%] rounded-t-3xl"
          style={{
            background: getProductCardColor(
              product.product.cardBackgroundColor
            ),
          }}
        />
        <Image
          alt={product.product.title}
          width={400}
          height={300}
          src={imgSrc}
          onError={() => setNextImgSrc()}
          className={`relative ${alignmentStyles} h-[200px] w-auto`}
        />
      </div>
      <div className="flex flex-col mt-8 ml-12 w-[55%]">
        <h3 className="font-semibold mb-4">{product.product.title}</h3>
        <div className="flex flex-row">
          <p className="basis-1/2 pr-6 py-4 mr-6 border-r border-hg-black/10">
            <span className="block font-light text-hg-black/40 text-xs mb-1">
              Tratamiento
            </span>
            <span className="text-xs">{product.product.description}</span>
          </p>
          <p className="basis-1/2 py-4">
            <span className="block font-light text-hg-black/40 text-xs mb-1">
              Precio
            </span>
            {product.priceWithDiscount !== product.price ? (
              <span className="w-full block">
                <span className="text-2xl font-semibold block">
                  {`${priceFormat(Number(product.priceWithDiscount))}`} €
                </span>
                <span className="line-through text-hg-black400 block">
                  {`${priceFormat(Number(product.price))}`} €
                </span>
              </span>
            ) : (
              <span className="text-2xl font-semibold block">
                {`${priceFormat(Number(product.price))}`} €
              </span>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}
