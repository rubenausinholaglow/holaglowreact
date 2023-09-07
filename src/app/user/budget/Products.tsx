'use client';
import { useState } from 'react';
import Image from 'next/image';
import { priceFormat } from 'utils/priceFormat';

import { type Product as ProductType } from '../types';

export default function Products({
  products,
  totalPrice,
  totalPriceWithIVA,
  referenceId,
  creationDate,
  priceDiscount,
  percentageDiscount,
  manualPrice,
}: {
  products: Array<ProductType>;
  totalPrice: number;
  totalPriceWithIVA: number;
  referenceId: string;
  creationDate: string;
  priceDiscount: number;
  percentageDiscount: number;
  manualPrice: number;
}) {
  const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png';

  const date = new Date(creationDate).getDate().toString().padStart(2, '0');
  const month = (new Date(creationDate).getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const year = new Date(creationDate).getFullYear();

  const parsedDate = `${date}/${month}/${year}`;

  const hasBudgetDiscount =
    priceDiscount > 0 || percentageDiscount > 0 || manualPrice > 0;

  const productsUpdated = products.map(product => {
    let priceWithDiscount = product.price;

    if (product.priceDiscount > 0) {
      priceWithDiscount = product.priceDiscount;
    }

    if (product.percentageDiscount > 0) {
      priceWithDiscount =
        priceWithDiscount - priceWithDiscount * product.percentageDiscount;
    }

    return {
      ...product,
      priceWithDiscount: priceWithDiscount,
    };
  });

  const totalProductsPrice = productsUpdated.reduce((total, product) => {
    return total + product.priceWithDiscount;
  }, 0);

  const totalPriceWithDiscount = () => {
    let total = totalProductsPrice;

    if (manualPrice > 0) {
      total = manualPrice;
    }

    if (priceDiscount > 0) {
      total = total - priceDiscount;
    }

    if (percentageDiscount > 0) {
      total = total - total * percentageDiscount;
    }

    return total;
  };

  return (
    <section className="relative">
      <ul className="flex flex-col gap-8 mt-8">
        {productsUpdated.map(product => {
          const productDetails = product.product;

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [imgSrc, setImgSrc] = useState(
            `https://budgetimages.blob.core.windows.net/images/products/${productDetails.flowwwId}/${productDetails.flowwwId}.jpg`
          );

          return (
            <li
              key={productDetails.flowwwId}
              className="flex flex-row justify-center"
            >
              <div className="relative bg-cover bg-center rounded-xl w-[200px] h-[200px] border border-hg-black/20 aspect-square overflow-hidden">
                <Image
                  className="object-cover"
                  fill
                  src={imgSrc}
                  alt={productDetails.title}
                  onError={() => setImgSrc(DEFAULT_IMG_SRC)}
                />
              </div>
              <div className="flex flex-col mt-8 ml-12 w-[55%]">
                <h3 className="font-semibold mb-4">
                  {productDetails.title}{' '}
                  {product.quantity > 1 && `(x${product.quantity})`}
                </h3>
                <div className="flex flex-row">
                  <p className="basis-1/2 pr-6 py-4 mr-6 border-r border-hg-black/10">
                    <span className="block font-light text-hg-black/40 text-xs mb-1">
                      Tratamiento
                    </span>
                    <span className="text-xs">
                      {productDetails.description}
                    </span>
                  </p>
                  <p className="basis-1/2 py-4">
                    <span className="block font-light text-hg-black/40 text-xs mb-1">
                      Precio
                    </span>
                    {product.priceWithDiscount !== product.price ? (
                      <div className="w-full">
                        <span className="text-2xl font-semibold block">
                          {`${priceFormat(Number(product.priceWithDiscount))}`}{' '}
                          €
                        </span>
                        <span className="line-through text-hg-black400 block">
                          {`${priceFormat(Number(product.price))}`} €
                        </span>
                      </div>
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
        })}
      </ul>
      <aside>
        <ul className="bg-hg-lightMalva/20 rounded-lg w-[55%] flex flex-col text-xs p-4 ml-auto mr-16 mt-8 mb-8">
          <li className="flex justify-between pb-4">
            <span>Subtotal</span>
            <span className="font-semibold">
              {`${priceFormat(totalProductsPrice / 1.21)} €`}
            </span>
          </li>
          <li className="flex justify-between pb-4">
            <span>IVA 21%</span>
            <span className="font-semibold">
              {`${priceFormat(
                totalProductsPrice - totalProductsPrice / 1.21
              )} €`}
            </span>
          </li>
          {hasBudgetDiscount && (
            <>
              <li className="flex justify-between pb-4 mb-4 border-b border-hg-black">
                <span></span>
                <span className="font-semibold">
                  {`${priceFormat(totalProductsPrice)} €`}
                </span>
              </li>
              <li className="flex justify-between pb-4">
                <span>Descuento</span>
                <span className="font-semibold">
                  {`- ${priceFormat(
                    totalProductsPrice - totalPriceWithDiscount()
                  )} €`}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold">
                  {`${priceFormat(totalPriceWithDiscount())} €`}
                </span>
              </li>
            </>
          )}
          {!hasBudgetDiscount && (
            <li className="flex justify-between pt-4 border-t border-hg-black">
              <span>Total</span>
              <span className="font-semibold">
                {`${priceFormat(totalProductsPrice)} €`}
              </span>
            </li>
          )}
        </ul>
      </aside>
      <p
        style={{ writingMode: 'vertical-rl' }}
        className="inline-block rotate-180 absolute bottom-0 right-0 text-xs text-hg-darkMalva pt-8 pl-2"
      >
        Presupuesto nº {referenceId} - {parsedDate}
      </p>
    </section>
  );
}
