// @ts-nocheck

import Image from 'next/image';
import { priceFormat } from 'utils/priceFormat';

export default function AlmaPayment({ totalPrice }: { totalPrice: number }) {
  const prices = {
    twoStepsPrice: priceFormat(totalPrice / 2),
    threeStepsPrice: priceFormat(totalPrice / 3),
    fourStepsPrice: priceFormat(totalPrice / 4),
  };

  // last term payment must be modified to avoid adding some cents
  const fixLastTermPrice = (number, totalTerms) => {
    // OJO! esto solo devuelve el total, debería devolver el number - la diferencia entre el total y el totalPrice
    // ya lo haré yo cuando se solucione la mierda del NaN
    const test = Number(number);
    console.log(typeof test, typeof totalTerms);

    console.log(test * totalTerms);
    return test * totalTerms;
  };

  return (
    <section className='bg-white p-8 text-black'>
      <div className='bg-[url("/images/budget/almaBg.png")] h-[327px] bg-cover pl-[42%]'>
        <h3 className='pt-8 text-xl/tight font-semibold'>
          Tu tratamiento desde <span className='text-3xl border-b-2 border-[#F0AD4E]'>{prices.fourStepsPrice} €</span>
          <br />
          sin intereses
        </h3>
        <p className='text-sm pr-8 mb-4 mt-2'>
          Te ofrecemos una experiencia de compra más flexible con el pago en 2, 3 o 4 plazos.
        </p>
        <div className='flex gap-1 text-[11px]'>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-[#FFC738]/10 py-1 px-2'>Pago aplazado</p>
            <p className='rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold'>En 2 plazos</p>
            <p className='rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold'>En 3 plazos</p>
            <p className='rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold'>En 4 plazos</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>Hoy</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.twoStepsPrice}</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.threeStepsPrice}</p>
            <p className='rounded-md bg-white py-1 px-2 border border-[#F0AD4E]'>{prices.fourStepsPrice}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>en 30 días</p>
            <p className='rounded-md bg-white py-1 px-2'>{fixLastTermPrice(prices.twoStepsPrice, 2)}</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.threeStepsPrice}</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.fourStepsPrice}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>en 60 días</p>
            <p className='py-1 px-2'>&nbsp;</p>
            <p className='rounded-md bg-white py-1 px-2'>{fixLastTermPrice(prices.threeStepsPrice, 3)}</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.fourStepsPrice}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>en 90 días</p>
            <p className='py-1 px-2'>&nbsp;</p>
            <p className='py-1 px-2'>&nbsp;</p>
            <p className='rounded-md bg-white py-1 px-2'>{fixLastTermPrice(prices.fourStepsPrice, 4)}</p>
          </div>
        </div>
        <Image className='ml-auto mr-12 mt-5' src='/images/budget/almaLogo.svg' height='20' width='74' alt='Alma' />
      </div>
    </section>
  );
}
