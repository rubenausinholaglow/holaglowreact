import { Text } from 'designSystem/Texts/Texts';
import { priceFormat } from 'utils/priceFormat';

export default function PaymentOptions({ totalPrice }: { totalPrice: number }) {
  return (
    <section className="bg-white p-8 text-black">
      <div className='bg-[url("/images/budget/paymentOptions.png")] bg-cover pl-[55%] rounded-[35px] p-8'>
        <h3 className="text-xl/tight font-semibold">
          Tu tratamiento
          <br />
          desde{' '}
          <span className="text-[24px] border-b-2 border-[#F0AD4E]">
            {`${priceFormat((totalPrice * 1.117) / 18)}`}€
          </span>{' '}
          al mes*
        </h3>
        <p className="text-sm pr-8 mb-4 mt-2">
          Te ofrecemos una experiencia de compra más flexible con financiación
          hasta en 18 meses
        </p>
        <div className="flex gap-2 text-[11px] text-center">
          <div className="flex flex-col gap-1 w-1/2">
            <p className="rounded-md bg-[#FFC738]/20 py-1 px-2">
              Pago financiado
            </p>
            <p className="rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
              En 3 meses
            </p>
            <p className="rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
              En 4 meses
            </p>
            <p className="rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
              En 6 meses
            </p>
            <p className="rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
              En 9 meses
            </p>
            <p className="rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
              En 12 meses
            </p>
            <p className="rounded-md bg-[#FFC738]/20 py-1 px-2 font-semibold">
              En 18 meses
            </p>
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <p className="rounded-md bg-white/50 py-1 px-2 text-[#717D96]">
              Importe mensual
            </p>
            <p className="rounded-md bg-white py-1 px-2">
              {`${priceFormat(totalPrice / 3)}`} €
            </p>
            <p className="rounded-md bg-white py-1 px-2">
              {`${priceFormat(totalPrice / 4)}`} €
            </p>
            <p className="rounded-md bg-white py-1 px-2">
              {`${priceFormat(totalPrice / 6)}`} €
            </p>
            <p className="rounded-md bg-white py-1 px-2">
              {`${priceFormat((totalPrice * 1.055) / 9)}`} €
            </p>
            <p className="rounded-md bg-white py-1 px-2">
              {`${priceFormat((totalPrice * 1.075) / 12)}`} €
            </p>
            <p className="rounded-md bg-white py-1 px-2">
              {`${priceFormat((totalPrice * 1.117) / 18)}`} €
            </p>
          </div>
        </div>
        <Text size="xs" className="mt-2">
          * Cálculos aproximados
        </Text>
      </div>
    </section>
  );
}
