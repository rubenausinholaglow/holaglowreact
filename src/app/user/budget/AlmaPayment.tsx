import Image from 'next/image';
import { priceFormat } from 'utils/priceFormat';

export default function AlmaPayment({ totalPrice }: { totalPrice: number }) {
  const prices = {
    twoStepsPrice: (totalPrice / 2).toFixed(2),
    threeStepsPrice: (totalPrice / 3).toFixed(2),
    fourStepsPrice: (totalPrice / 4).toFixed(2),
  };

  // last term payment must be modified to avoid adding some cents
  const lastTermPrice = (number: string, totalTerms: number) => {
    const normalizedNumber = Number(number);

    if (normalizedNumber * totalTerms !== totalPrice) {
      return priceFormat(normalizedNumber - Number((normalizedNumber * totalTerms - totalPrice).toFixed(2)));
    }
    return priceFormat(normalizedNumber);
  };

  return (
    <section className='bg-white p-8 text-black'>
      <div className='bg-[url("/images/budget/almaBg.png")] h-[327px] bg-cover pl-[41%]'>
        <h3 className='pt-8 text-xl/tight font-semibold'>
          Tu tratamiento desde{' '}
          <span className='text-[24px] border-b-2 border-[#F0AD4E]'>
            {`${priceFormat(Number(prices.fourStepsPrice))}`} €
          </span>
          <br />
          sin intereses
        </h3>
        <p className='text-sm pr-8 mb-4 mt-2'>
          Te ofrecemos una experiencia de compra más flexible con el pago en 2, 3 o 4 plazos.
        </p>
        <div className='flex gap-1 text-[11px] text-center'>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-[#FFC738]/10 py-1 px-2'>Pago aplazado</p>
            <p className='rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold text-left'>En 2 plazos</p>
            <p className='rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold text-left'>En 3 plazos</p>
            <p className='rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold text-left'>En 4 plazos</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>Hoy</p>
            <p className='rounded-md bg-white py-1 px-2'>{`${priceFormat(Number(prices.twoStepsPrice))}`} €</p>
            <p className='rounded-md bg-white py-1 px-2'>{`${priceFormat(Number(prices.threeStepsPrice))}`} €</p>
            <p className='rounded-md bg-white py-1 px-2 border border-[#F0AD4E] shadow-[0px_5px_12px_-3px_rgba(240,173,78,1)]'>
              {`${priceFormat(Number(prices.fourStepsPrice))}`} €
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>en 30 días</p>
            <p className='rounded-md bg-white py-1 px-2'>{`${lastTermPrice(prices.twoStepsPrice, 2)}`} €</p>
            <p className='rounded-md bg-white py-1 px-2'>{`${priceFormat(Number(prices.threeStepsPrice))}`} €</p>
            <p className='rounded-md bg-white py-1 px-2'>{`${priceFormat(Number(prices.fourStepsPrice))}`} €</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>en 60 días</p>
            <p className='py-1 px-2'>&nbsp;</p>
            <p className='rounded-md bg-white py-1 px-2'>{`${lastTermPrice(prices.threeStepsPrice, 3)}`} €</p>
            <p className='rounded-md bg-white py-1 px-2'>{`${priceFormat(Number(prices.fourStepsPrice))}`} €</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>en 90 días</p>
            <p className='py-1 px-2'>&nbsp;</p>
            <p className='py-1 px-2'>&nbsp;</p>
            <p className='rounded-md bg-white py-1 px-2'>{`${lastTermPrice(prices.fourStepsPrice, 4)}`} €</p>
          </div>
        </div>
        <Image className='ml-auto mr-10 mt-4' src='/images/budget/almaLogo.svg' height='20' width='74' alt='Alma' />
      </div>
    </section>
  );
}
