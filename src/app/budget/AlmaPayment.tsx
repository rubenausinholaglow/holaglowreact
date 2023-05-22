export default function AlmaPayment({ totalPrice }: { totalPrice: number }) {
  console.log(totalPrice);

  const prices = {
    twoStepsPrice: (totalPrice / 2).toFixed(2),
    threeStepsPrice: (totalPrice / 3).toFixed(2),
    fourStepsPrice: (totalPrice / 4).toFixed(2),
  };

  return (
    <section className='bg-white p-8 text-black'>
      <div className='bg-[url("/images/almaBg.png")] h-[327px] bg-cover pl-[42%]'>
        <h3 className='pt-8 text-xl font-semibold'>
          Tu tratamiento desde <span className='text-3xl'>{prices.fourStepsPrice} €</span>
          <br />
          sin intereses
        </h3>
        <p className='text-xs pr-8 mb-8 mt-2'>
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
            <p className='rounded-md bg-white py-1 px-2'>{prices.fourStepsPrice}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>en 30 días</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.twoStepsPrice}</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.threeStepsPrice}</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.fourStepsPrice}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>en 60 días</p>
            <p className='py-1 px-2'>&nbsp;</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.threeStepsPrice}</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.fourStepsPrice}</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='rounded-md bg-white/50 py-1 px-2 text-[#717D96]'>en 90 días</p>
            <p className='py-1 px-2'>&nbsp;</p>
            <p className='py-1 px-2'>&nbsp;</p>
            <p className='rounded-md bg-white py-1 px-2'>{prices.fourStepsPrice}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
