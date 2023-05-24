import { type Product as ProductType } from 'types/product';
import { priceFormat } from 'utils/priceFormat';

export default function Products({
  products,
  totalPrice,
  totalPriceWithIVA,
}: {
  products: Array<ProductType>;
  totalPrice: number;
  totalPriceWithIVA: number;
}) {
  return (
    <section className='bg-hg-100'>
      <ul className='flex flex-col gap-8 -mt-6'>
        {products.map(product => (
          <li key={product.flowwwId} className='flex flex-row justify-center'>
            <div className='bg-cover bg-center rounded-tl-[70px] rounded-br-[40px] border-8 border-hg-300 border-opacity-10 w-[200px] aspect-square overflow-hidden'>
              <div
                style={{
                  backgroundImage: `url("${`/images/product/${product.flowwwId}/${product.flowwwId}.webp`}")`,
                }}
                className='bg-cover bg-center w-full h-full'
              ></div>
            </div>
            <div className='flex flex-col mt-8 ml-16 w-1/2'>
              <h3 className='font-semibold mb-4'>{product.title}</h3>
              <div className='flex flex-row'>
                <p className='basis-2/3 pr-8 py-4 mr-8 border-r border-hg-500'>
                  <span className='block font-light text-hg-200 text-xs mb-1'>Tratamiento</span>
                  <span>{product.description}</span>
                </p>
                <p className='basis-1/3 py-4'>
                  <span className='block font-light text-hg-200 text-xs mb-1'>Precio</span>
                  <span className='text-2xl font-bold'>{`${priceFormat(Number(product.price))}`} €</span>
                </p>
              </div>
            </div>
          </li>
        ))}
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
    </section>
  );
}
