'use client';

import { priceFormat } from 'utils/priceFormat';

import { type Product as ProductType } from '../types';
import ProductItem from './ProductItem';

export default function Products({
  products,
  referenceId,
  creationDate,
  priceDiscount,
  percentageDiscount,
  manualPrice,
  productsWithDiscountPrice,
  totalProductsPrice,
  budgetTotalPriceWithDiscount,
}: {
  products: Array<ProductType>;
  referenceId: string;
  creationDate: string;
  priceDiscount: number;
  percentageDiscount: number;
  manualPrice: number;
  productsWithDiscountPrice: Array<ProductType>;
  totalProductsPrice: number;
  budgetTotalPriceWithDiscount: number;
}) {
  const date = new Date(creationDate).getDate().toString().padStart(2, '0');
  const month = (new Date(creationDate).getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const year = new Date(creationDate).getFullYear();

  const parsedDate = `${date}/${month}/${year}`;

  const hasBudgetDiscount =
    priceDiscount > 0 || percentageDiscount > 0 || manualPrice > 0;

  return (
    <section className="relative">
      <ul className="flex flex-col gap-8 mt-8">
        {productsWithDiscountPrice.map(product => {
          return (
            <ProductItem key={product.product.flowwwId} product={product} />
          );
        })}
      </ul>
      <aside>
        <ul className="bg-hg-tertiary500/20 rounded-lg w-[55%] flex flex-col text-xs p-4 ml-auto mr-16 mt-8 mb-8">
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
                    totalProductsPrice - budgetTotalPriceWithDiscount
                  )} €`}
                </span>
              </li>
              <li className="flex justify-between">
                <span>Total</span>
                <span className="font-semibold">
                  {`${priceFormat(budgetTotalPriceWithDiscount)} €`}
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
        className="inline-block rotate-180 absolute bottom-0 right-0 text-xs text-hg-tertiary pt-8 pl-2"
      >
        Presupuesto nº {referenceId} - {parsedDate}
      </p>
    </section>
  );
}
