'use client';
import { type Product as ProductType } from 'types/product';
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
  const parsedDate = new Date(Date.parse(creationDate)).toLocaleString('es-ES', { dateStyle: 'short' });

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
              <div className='flex flex-col mt-8 ml-16 w-1/2'>
                <h3 className='font-semibold mb-4'>{product.title}</h3>
                <div className='flex flex-row'>
                  <p className='basis-2/3 pr-8 py-4 mr-8 border-r border-hg-500'>
                    <span className='block font-light text-hg-200 text-xs mb-1'>Tratamiento</span>
                    <span>{product.description}</span>
                  </p>
                  <p className='basis-1/3 py-4'>
                    <span className='block font-light text-hg-200 text-xs mb-1'>Precio olakease</span>
                    <span className='text-2xl font-bold'>{`${priceFormat(Number(product.price))}`} €</span>
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
