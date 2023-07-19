import Image from 'next/image';

export default function PromoCode({
  discountCode,
  discountAmount,
}: {
  discountCode: number;
  discountAmount: number;
}) {
  return (
    <section className="bg-white p-8 mb-4">
      <div className='bg-[url("/images/budget/promoCodeBg.jpg")] bg-hg-lightMalva/20 h-[435px] bg-cover rounded-[25px] flex flex-col ml-8'>
        <Image
          className="-ml-8 mt-16"
          width="190"
          height="64"
          src="/images/budget/shareYourGlow.svg"
          alt="¡Comparte tu glow!"
        />
        <p className="-ml-8 w-1/3 font-semibold mt-4">
          Trae a tus amig@s y gana por cada uno de ellos
        </p>

        <div className="flex justify-center bg-gradient-radial from-hg-lime to-hg-white to-70% items-center text-white text-[55px] font-bold -mt-16 ml-16 h-[200px] w-[200px]">
          <span>{discountAmount}€</span>
        </div>

        <div className="flex justify-center w-[65%] -ml-8 -mt-8">
          <p className="bg-hg-darkMalva text-white text-xs/relaxed p-4 rounded-l-xl w-3/5">
            Una vez realizado tu primer tratamiento, se activará tu código de
            cliente Holaglow y por cada tratamiento que se hagan tus amigos con
            él obtendréis {discountAmount}€ cada uno . Y lo mejor de todo... ¡es
            acumulable!
          </p>
          <div className="bg-white text-hg-black text-xs py-2 px-4 rounded-r-xl w-2/5">
            <p className="text-lg mb-2 leading-6">
              ¡Tenemos ganas
              <br /> de veros!
            </p>
            <p className="text-hg-darkMalva">Código de descuento</p>
            <p className="text-hg-darkMalva text-[26px] font-bold leading-7">
              {discountCode}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
