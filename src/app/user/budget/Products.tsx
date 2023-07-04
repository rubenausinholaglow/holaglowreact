'use client';
import { type Product as ProductType } from '../types';
import { priceFormat } from 'utils/priceFormat';
import Image from 'next/image';
import { useState } from 'react';

export default function Products({
  products,
  totalPrice,
  totalPriceWithIVA,
  referenceId,
  creationDate,
}: {
  products: Array<ProductType>;
  totalPrice: number;
  totalPriceWithIVA: number;
  referenceId: string;
  creationDate: string;
}) {
  const DEFAULT_IMG_SRC = '/images/product/holaglowProduct.png';

  const date = new Date(creationDate).getDate().toString().padStart(2, '0');
  const month = (new Date(creationDate).getMonth() + 1).toString().padStart(2, '0');
  const year = new Date(creationDate).getFullYear();

  const parsedDate = `${date}/${month}/${year}`;

  return (
    <section className='bg-hg-100 relative'>
      <ul className='flex flex-col gap-8 -mt-6'>
        {products.map(product => {
          const [imgSrc, setImgSrc] = useState(`/images/product/${product.flowwwId}/${product.flowwwId}.png`);

          return (
            <li key={product.flowwwId} className='flex flex-row justify-center'>
              <div className='relative bg-cover bg-center rounded-tl-[70px] rounded-br-[40px] border-8 border-hg-300 border-opacity-10 w-[200px] h-[200px] aspect-square overflow-hidden'>
                <Image
                  className='object-cover'
                  fill
                  src={imgSrc}
                  alt={product.title}
                  onError={() => setImgSrc(DEFAULT_IMG_SRC)}
                />
              </div>
              <div className='flex flex-col mt-8 ml-12 w-1/2'>
                <h3 className='font-semibold mb-4'>
                  {product.title} {product.quantity > 1 && `(x${product.quantity})`}
                </h3>
                <div className='flex flex-row'>
                  <p className='basis-1/2 pr-6 py-4 mr-6 border-r border-hg-500'>
                    <span className='block font-light text-hg-200 text-xs mb-1'>Tratamiento</span>
                    <span>{product.description}</span>
                  </p>
                  <p className='basis-1/2 py-4'>
                    <span className='block font-light text-hg-200 text-xs mb-1'>Precio</span>
                    <span className='text-3xl font-bold'>{`${priceFormat(Number(product.price))}`} €</span>
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <aside>
        <ul className='bg-hg-200/[.15] rounded-lg w-[55%] flex flex-col text-sm p-4 ml-auto mr-16 mt-8 mb-8'>
          <li className='flex justify-between pb-4'>
            <span className='text-hg-200'>Subtotal</span>
            <b>{`${priceFormat(totalPrice)}`} €</b>
          </li>
          <li className='flex justify-between pb-4 mb-4 border-b border-hg-500'>
            <span className='text-hg-200'>IVA 21%</span>
            <b>{`${priceFormat(totalPriceWithIVA - totalPrice)}`} €</b>
          </li>
          <li className='flex justify-between'>
            <span className='text-hg-200'>Total</span>
            <b>{`${priceFormat(totalPriceWithIVA)}`} €</b>
          </li>
        </ul>
      </aside>
      <p
        style={{ writingMode: 'vertical-rl' }}
        className='inline-block rotate-180 absolute bottom-0 right-0 text-xs text-hg-200 pt-8 pl-2'
      >
        Presupuesto nº {referenceId} - {parsedDate}
      </p>
    </section>
  );
}
